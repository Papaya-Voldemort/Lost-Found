import { databases, storage, ID, Query, account, Permission, Role } from './auth.js';
import { showToast } from './toast.js';

const DB_ID = 'traceback_db';
const COLLECTION_ID = 'items';
const BUCKET_ID = 'item_images';

let feedOffset = 0;
let currentFeedQueries = [];
let currentFeedType = '';
const FEED_LIMIT = 12;

// Handle Item Submission
export async function handleItemSubmission(formId, itemType) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        try {
            // 1. Get current user
            const user = await account.get();

            // 2. Upload Image
            const imageInput = form.querySelector('#image-upload');
            let imageId = null;
            
            // Use cropped file if available, otherwise use raw file input
            const file = imageInput._croppedFile || (imageInput.files && imageInput.files[0]);
            
            if (file) {
                const uploadResponse = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    file,
                    // Grant permissions to the piece of storage
                    [
                        Permission.read(Role.any()),
                        Permission.update(Role.user(user.$id)),
                        Permission.delete(Role.user(user.$id)),
                    ]
                );
                imageId = uploadResponse.$id;
            } else {
                throw new Error("An image is required.");
            }

            // 3. Gather Form Data
            const title = form.querySelector('#item-name').value;
            const category = form.querySelector('#category').value;
            
            if (category === 'none') {
                throw new Error('Please select a category.');
            }

            const dateInput = form.querySelector('input[type="date"]').value;
            const locationSelect = form.querySelector('#location').value;
            const locationOther = form.querySelector('#location-other').value;
            const description = form.querySelector('#description').value;
            const tagsHidden = form.querySelector('#tags-hidden').value;

            const finalLocation = locationSelect === 'other' ? locationOther : locationSelect;
            const tagsArray = tagsHidden ? tagsHidden.split(',').map(t => t.trim()) : [];
            
            // Add category to tags for better searching
            if (category && category !== 'none') {
                tagsArray.push(category);
            }

            // 4. Create Document with explicit permissions for the owner
            await databases.createDocument(
                DB_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    type: itemType,
                    title: title,
                    description: description,
                    location: finalLocation,
                    date: new Date(dateInput).toISOString(),
                    tags: tagsArray,
                    imageId: imageId,
                    userId: user.$id,
                    userName: user.name || '',
                    userEmail: user.email || '',
                    status: 'active'
                },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            );

            showToast(`${itemType === 'lost' ? 'Lost' : 'Found'} item reported successfully!`, 'success');
            form.reset();
            
            // Reset image preview
            const previewContainer = document.getElementById('image-preview-container');
            const imagePreview = document.getElementById('image-preview');
            if (previewContainer && imagePreview) {
                imagePreview.src = '';
                previewContainer.style.display = 'none';
            }
            // Clear cropped file
            if (imageInput) imageInput._croppedFile = null;
            
            // Reset tags
            const tagPills = document.getElementById('tag-pills');
            if (tagPills) tagPills.innerHTML = '';
            if (form.querySelector('#tags-hidden')) form.querySelector('#tags-hidden').value = '';

            // Refresh feed if on the same page
            fetchItems(itemType);

        } catch (error) {
            console.error('Submission error:', error);
            showToast(error.message || 'Failed to submit item.', 'error');
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Fetch and Render Items
export async function fetchItems(itemType, queries = [], loadMore = false) {
    const feedContainer = document.getElementById('items-feed');
    const loadMoreBtn = document.getElementById('feed-load-more');
    if (!feedContainer) return;

    if (!loadMore) {
        feedOffset = 0;
        currentFeedQueries = queries;
        currentFeedType = itemType;
    }

    try {
        const defaultQueries = [
            Query.equal('type', itemType),
            Query.equal('status', 'active'),
            Query.orderDesc('date'),
            Query.limit(FEED_LIMIT),
            Query.offset(feedOffset)
        ];

        const response = await databases.listDocuments(
            DB_ID,
            COLLECTION_ID,
            [...defaultQueries, ...queries]
        );

        if (response.documents.length === 0 && feedOffset === 0) {
            feedContainer.innerHTML = '<p class="no-items">No items found.</p>';
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        if (!loadMore) {
            feedContainer.innerHTML = '';
        }

        response.documents.forEach(item => {
            const card = createItemCard(item);
            feedContainer.appendChild(card);
        });

        feedOffset += response.documents.length;

        if (loadMoreBtn) {
            loadMoreBtn.style.display = feedOffset >= response.total ? 'none' : 'block';
        }

    } catch (error) {
        console.error('Error fetching items:', error);
        if (feedOffset === 0) {
            feedContainer.innerHTML = '<p class="error-message">Failed to load items. Please try again later.</p>';
        }
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    }
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';

    // Click handler to open detail modal
    card.addEventListener('click', () => openItemDetailModal(item));

    // Get image URL with fallback
    let imageUrl = 'images/placeholder-item.svg';
    if (item.imageId) {
        try {
            imageUrl = storage.getFileView(BUCKET_ID, item.imageId);
        } catch (e) {
            console.error('Error fetching image for item:', item.$id, e);
        }
    }
    
    // Format date
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

    // Build card with safe DOM APIs to prevent XSS
    const imageContainer = document.createElement('div');
    imageContainer.className = 'item-image-container';
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Photo of ${item.title}`;
    img.className = 'item-image';
    img.loading = 'lazy';
    imageContainer.appendChild(img);

    const details = document.createElement('div');
    details.className = 'item-details';

    const title = document.createElement('h3');
    title.className = 'item-title';
    title.textContent = item.title;

    const locationP = document.createElement('p');
    locationP.className = 'item-location';
    locationP.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm36.12,173.84C140.46,216.74,128,228.17,128,228.17s-12.46-11.43-36.12-38.33C67.43,161.63,56,132.11,56,104a72,72,0,0,1,144,0C200,132.11,188.57,161.63,164.12,189.84Z"></path></svg>';
    locationP.appendChild(document.createTextNode(' ' + item.location));

    const dateP = document.createElement('p');
    dateP.className = 'item-date';
    dateP.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48Zm136,160H48V96H208V208Z"></path></svg>';
    dateP.appendChild(document.createTextNode(' ' + formattedDate));

    const descP = document.createElement('p');
    descP.className = 'item-description';
    descP.textContent = item.description;

    details.append(title, locationP, dateP, descP);

    // Build tags safely
    if (item.tags && item.tags.length > 0) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'item-tags';
        item.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            tagsDiv.appendChild(span);
        });
        details.appendChild(tagsDiv);
    }

    card.append(imageContainer, details);
    return card;
}

// Open item detail modal
function openItemDetailModal(item) {
    const modal = document.getElementById('item-detail-modal');
    if (!modal) return;

    // Populate title
    document.getElementById('modal-item-title').textContent = item.title;

    // Populate image
    const modalImage = document.getElementById('modal-item-image');
    if (item.imageId) {
        try {
            modalImage.src = storage.getFileView(BUCKET_ID, item.imageId);
        } catch (e) {
            modalImage.src = 'images/placeholder-item.svg';
        }
    } else {
        modalImage.src = 'images/placeholder-item.svg';
    }
    modalImage.alt = `Photo of ${item.title}`;

    // Format date
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

    // Populate location (safe DOM APIs)
    const locationEl = document.getElementById('modal-item-location');
    locationEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm36.12,173.84C140.46,216.74,128,228.17,128,228.17s-12.46-11.43-36.12-38.33C67.43,161.63,56,132.11,56,104a72,72,0,0,1,144,0C200,132.11,188.57,161.63,164.12,189.84Z"></path></svg>';
    locationEl.appendChild(document.createTextNode(' ' + item.location));

    // Populate date
    const dateEl = document.getElementById('modal-item-date');
    dateEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48Zm136,160H48V96H208V208Z"></path></svg>';
    dateEl.appendChild(document.createTextNode(' ' + formattedDate));

    // Populate description (full, not clamped)
    document.getElementById('modal-item-description').textContent = item.description;

    // Populate tags
    const tagsEl = document.getElementById('modal-item-tags');
    tagsEl.innerHTML = '';
    if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            tagsEl.appendChild(span);
        });
    }

    // Contact button — click 1: reveal email, click 2: open mailto
    const contactBtn = document.getElementById('modal-contact-btn');
    contactBtn.textContent = 'Contact Reporter';
    contactBtn.disabled = false;
    contactBtn.title = '';
    let emailRevealed = false;
    contactBtn.onclick = () => {
        if (!item.userEmail) {
            contactBtn.textContent = 'Contact info not available';
            contactBtn.disabled = true;
            return;
        }
        if (!emailRevealed) {
            emailRevealed = true;
            contactBtn.textContent = item.userEmail;
            contactBtn.title = 'Click again to open email client';
        } else {
            window.location.href = 'mailto:' + item.userEmail;
        }
    };

    // Show modal
    modal.classList.add('active');
}

// Setup Load More button for feed pagination
export function setupLoadMore() {
    const loadMoreBtn = document.getElementById('feed-load-more');
    if (!loadMoreBtn) return;
    loadMoreBtn.addEventListener('click', () => fetchItems(currentFeedType, currentFeedQueries, true));
}

// Debounce utility
function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// Handle Search
export function setupSearch(itemType) {
    const searchForm = document.getElementById('search-form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        executeSearch(itemType);
    });

    // Debounced real-time search on input/change
    const debouncedSearch = debounce(() => executeSearch(itemType), 300);
    const inputs = searchForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', debouncedSearch);
        input.addEventListener('change', debouncedSearch);
    });

    // Reset button
    const resetBtn = searchForm.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            searchForm.reset();
            fetchItems(itemType);
        });
    }
}

function executeSearch(itemType) {
    const searchInput = document.getElementById('search-input')?.value;
    const tagsInput = document.getElementById('search-tags-input')?.value;
    const locationInput = document.getElementById('search-location')?.value;
    const sortSelect = document.getElementById('sort')?.value;

    const queries = [];

    if (searchInput) {
        // Appwrite requires a full-text index for search, assuming 'title' has one or we use equal/startsWith
        // For simplicity, we might use startsWith or equal if full-text isn't set up, but let's assume search is available
        queries.push(Query.search('title', searchInput)); 
    }

    if (tagsInput) {
        const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
        if (tags.length > 0) {
            // Appwrite array contains
            tags.forEach(tag => queries.push(Query.contains('tags', tag)));
        }
    }

    if (locationInput && locationInput !== 'none') {
        queries.push(Query.search('location', locationInput));
    }

    if (sortSelect === 'Oldest First') {
        queries.push(Query.orderAsc('date'));
    } else {
        queries.push(Query.orderDesc('date'));
    }

    fetchItems(itemType, queries);
}
