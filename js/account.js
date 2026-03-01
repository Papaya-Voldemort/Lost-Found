import { account, databases, Query, ID, storage } from './auth.js';
import { showToast } from './toast.js';

const DB_ID = 'traceback_db';
const COLLECTION_ID = 'items';
const BUCKET_ID = 'item_images';

let currentUser = null;
let offset = 0;
const LIMIT = 10;

// Initialize the account page
async function initAccount() {
    try {
        currentUser = await account.get();
        renderUserProfile(currentUser);
        await fetchUserListings();
    } catch (error) {
        console.error('User not logged in or session expired:', error);
        window.location.href = '/login';
    }
}

// Render User Profile Section
function renderUserProfile(user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    
    // Pre-fill settings form
    const nameInput = document.getElementById('new-name');
    if (nameInput) nameInput.value = user.name;
    
    const verifiedBadge = document.getElementById('user-verified');
    if (user.emailVerification) {
        verifiedBadge.textContent = 'Verified User';
        verifiedBadge.classList.add('verified');
    } else {
        verifiedBadge.textContent = 'Unverified Email';
        verifiedBadge.classList.add('unverified');
        // Show resend verification button
        const resendBtn = document.getElementById('resend-verification');
        if (resendBtn) resendBtn.style.display = 'inline-block';
    }
}

// Update Profile Handler
document.getElementById('update-profile-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newName = document.getElementById('new-name').value;
    
    try {
        await account.updateName(newName);
        showToast('Profile updated successfully', 'success');
        // Update local state and UI
        currentUser.name = newName;
        renderUserProfile(currentUser);
    } catch (error) {
        console.error('Update failed:', error);
        showToast(error.message || 'Failed to update profile', 'error');
    }
});

// Change Password Handler
document.getElementById('change-password-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // Check length just in case HTML validation is bypassed
    if (newPassword.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
    }

    // Block spaces
    if (/\s/.test(newPassword)) {
        showToast('Password cannot contain spaces', 'error');
        return;
    }

    try {
        await account.updatePassword(newPassword, oldPassword);
        showToast('Password updated successfully', 'success');
        e.target.reset();
        // Reset strength meter if present
        const fill = document.querySelector('#password-strength-account .strength-fill');
        const text = document.querySelector('#password-strength-account .strength-text');
        if (fill) { fill.style.width = '0%'; fill.style.backgroundColor = 'transparent'; }
        if (text) { text.textContent = ''; }
    } catch (error) {
        console.error('Password update failed:', error);
        showToast(error.message || 'Failed to update password', 'error');
    }
});

// Logout Handler
document.getElementById('logout-btn')?.addEventListener('click', async () => {
    try {
        await account.deleteSession('current');
        showToast('Logged out successfully', 'success');
        setTimeout(() => window.location.href = '/', 1000);
    } catch (error) {
        console.error('Logout failed:', error);
        showToast('Failed to logout', 'error');
    }
});

// Fetch User Listings
async function fetchUserListings(loadMore = false) {
    const listContainer = document.getElementById('listings-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const noPostsMsg = document.getElementById('no-posts-msg');

    if (!loadMore) {
        listContainer.innerHTML = '';
        offset = 0;
    }

    try {
        const response = await databases.listDocuments(
            DB_ID,
            COLLECTION_ID,
            [
                Query.equal('userId', currentUser.$id),
                Query.orderDesc('$createdAt'),
                Query.limit(LIMIT),
                Query.offset(offset)
            ]
        );

        if (response.documents.length === 0 && offset === 0) {
            noPostsMsg.style.display = 'block';
            loadMoreBtn.style.display = 'none';
            return;
        }

        noPostsMsg.style.display = 'none';

        response.documents.forEach(doc => {
            const card = createListingCard(doc);
            listContainer.appendChild(card);
        });

        offset += response.documents.length;

        // Hide Load More if we've fetched everything
        if (offset >= response.total) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

    } catch (error) {
        console.error('Error fetching listings:', error);
        showToast('Failed to load your listings', 'error');
    }
}

// Create a single listing card
function createListingCard(doc) {
    const card = document.createElement('article');
    card.className = 'listing-card';

    // Handle Image
    let imageUrl = 'images/placeholder-item.svg'; // Default placeholder
    if (doc.imageId) {
        imageUrl = storage.getFilePreview(BUCKET_ID, doc.imageId);
    }

    // Format Date
    const date = new Date(doc.$createdAt).toLocaleDateString();

    // Build card with safe DOM APIs to prevent XSS
    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = doc.title;
    img.loading = 'lazy';
    const badge = document.createElement('span');
    badge.className = `status-badge ${doc.type}`;
    badge.textContent = doc.type;
    cardImage.append(img, badge);

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const h3 = document.createElement('h3');
    h3.textContent = doc.title;

    const meta = document.createElement('p');
    meta.className = 'meta';
    const dateSpan = document.createElement('span');
    dateSpan.textContent = `📅 ${date}`;
    const locSpan = document.createElement('span');
    locSpan.textContent = `📍 ${doc.location}`;
    meta.append(dateSpan, locSpan);

    const actions = document.createElement('div');
    actions.className = 'actions';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.dataset.id = doc.$id;
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => handleDelete(doc.$id));
    actions.appendChild(deleteBtn);

    cardContent.append(h3, meta, actions);
    card.append(cardImage, cardContent);

    return card;
}

// Delete Listing Handler
async function handleDelete(docId) {
    if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;

    try {
        // First retrieve the document to find the imageId
        const doc = await databases.getDocument(DB_ID, COLLECTION_ID, docId);
        
        // 1. Delete associated image file if it exists
        if (doc.imageId) {
            try {
                await storage.deleteFile(BUCKET_ID, doc.imageId);
            } catch (err) {
                console.warn('Failed to delete associated image:', err);
                // Continue with document deletion even if image fails
            }
        }

        // 2. Delete the original document
        await databases.deleteDocument(DB_ID, COLLECTION_ID, docId);

        showToast('Listing deleted', 'success');
        // Refresh the list
        fetchUserListings(false);
    } catch (error) {
        console.error('Delete failed:', error);
        showToast('Failed to delete listing', 'error');
    }
}

// Resend Verification Email
document.getElementById('resend-verification')?.addEventListener('click', async () => {
    const btn = document.getElementById('resend-verification');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
        await account.createVerification(window.location.origin + '/verify');
        showToast('Verification email sent! Check your inbox.', 'success');
        btn.textContent = 'Email Sent';
    } catch (error) {
        showToast(error.message || 'Failed to send verification email', 'error');
        btn.disabled = false;
        btn.textContent = 'Resend Verification Email';
    }
});

// Load More Button Listener
document.getElementById('load-more-btn')?.addEventListener('click', () => {
    fetchUserListings(true);
});

// Start the page logic
document.addEventListener('DOMContentLoaded', initAccount);
