import { databases, storage, ID, Query, account, Permission, Role } from './auth.js';
import { showToast } from './toast.js';

const DB_ID = 'traceback_db';
const COLLECTION_ID = 'items';
const BUCKET_ID = 'item_images';
const itemCache = new Map();

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
            
            if (imageInput.files && imageInput.files[0]) {
                const file = imageInput.files[0];
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
export async function fetchItems(itemType, queries = []) {
    const feedContainer = document.getElementById('items-feed');
    if (!feedContainer) return;

    feedContainer.innerHTML = '<div class="loading-spinner">Loading items...</div>';

    try {
        const defaultQueries = [
            Query.equal('type', itemType),
            Query.equal('status', 'active'),
            Query.orderDesc('date')
        ];

        const response = await databases.listDocuments(
            DB_ID,
            COLLECTION_ID,
            [...defaultQueries, ...queries]
        );

        itemCache.set(itemType, response.documents);

        if (response.documents.length === 0) {
            feedContainer.innerHTML = '<p class="no-items">No items found.</p>';
            return;
        }

        renderItems(response.documents);

    } catch (error) {
        console.error('Error fetching items:', error);
        feedContainer.innerHTML = '<p class="error-message">Failed to load items. Please try again later.</p>';
    }
}

function renderItems(items) {
    const feedContainer = document.getElementById('items-feed');
    if (!feedContainer) return;

    if (!items.length) {
        feedContainer.innerHTML = '<p class="no-items">No items found.</p>';
        return;
    }

    feedContainer.innerHTML = '';
    items.forEach(item => {
        const card = createItemCard(item);
        feedContainer.appendChild(card);
    });
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';

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

    // Create tags HTML
    const tagsHtml = item.tags && item.tags.length > 0 
        ? `<div class="item-tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
        : '';

    card.innerHTML = `
        <div class="item-image-container">
            <img src="${imageUrl}" alt="Photo of ${item.title}" class="item-image" loading="lazy">
        </div>
        <div class="item-details">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-location">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm36.12,173.84C140.46,216.74,128,228.17,128,228.17s-12.46-11.43-36.12-38.33C67.43,161.63,56,132.11,56,104a72,72,0,0,1,144,0C200,132.11,188.57,161.63,164.12,189.84Z"></path></svg>
                ${item.location}
            </p>
            <p class="item-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48Zm136,160H48V96H208V208Z"></path></svg>
                ${formattedDate}
            </p>
            <p class="item-description">${item.description}</p>
            ${tagsHtml}
        </div>
    `;

    return card;
}

function normalizeSearchValue(value) {
    return (value || '').trim().toLowerCase();
}

function matchesText(haystack, needle) {
    if (!needle) return true;
    return normalizeSearchValue(haystack).includes(needle);
}

function filterItems(items, filters) {
    const { searchInput, tags, locationInput, dateFromInput, dateToInput, sortSelect } = filters;
    const dateFrom = dateFromInput ? new Date(dateFromInput) : null;
    const dateTo = dateToInput ? new Date(dateToInput) : null;

    if (dateTo) {
        dateTo.setHours(23, 59, 59, 999);
    }

    const filteredItems = items.filter((item) => {
        const itemDate = new Date(item.date);
        const itemTags = Array.isArray(item.tags) ? item.tags.map(tag => normalizeSearchValue(tag)) : [];

        if (!matchesText(item.title, searchInput)) {
            return false;
        }

        if (!matchesText(item.location, locationInput)) {
            return false;
        }

        if (tags.length > 0 && !tags.every(tag => itemTags.some(itemTag => itemTag.includes(tag)))) {
            return false;
        }

        if (dateFrom && itemDate < dateFrom) {
            return false;
        }

        if (dateTo && itemDate > dateTo) {
            return false;
        }

        return true;
    });

    filteredItems.sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return sortSelect === 'Oldest First' ? aDate - bDate : bDate - aDate;
    });

    return filteredItems;
}

// Handle Search
export function setupSearch(itemType) {
    const searchForm = document.getElementById('search-form');
    if (!searchForm) return;

    let debounceId = null;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        executeSearch(itemType);
    });

    const inputs = searchForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        const eventName = input.tagName === 'SELECT' ? 'change' : 'input';
        input.addEventListener(eventName, () => {
            window.clearTimeout(debounceId);
            debounceId = window.setTimeout(() => executeSearch(itemType), 180);
        });
    });

    searchForm.addEventListener('reset', () => {
        window.clearTimeout(debounceId);
        window.requestAnimationFrame(() => executeSearch(itemType));
    });
}

async function executeSearch(itemType) {
    const searchInput = normalizeSearchValue(document.getElementById('search-input')?.value);
    const tagsInput = document.getElementById('search-tags-input')?.value;
    const locationInput = normalizeSearchValue(document.getElementById('search-location')?.value);
    const dateFromInput = document.getElementById('date-from')?.value;
    const dateToInput = document.getElementById('date-to')?.value;
    const sortSelect = document.getElementById('sort')?.value;
    const tags = tagsInput
        ? tagsInput.split(',').map(t => normalizeSearchValue(t)).filter(Boolean)
        : [];

    let items = itemCache.get(itemType);
    if (!items) {
        await fetchItems(itemType);
        items = itemCache.get(itemType) || [];
    }

    renderItems(filterItems(items, {
        searchInput,
        tags,
        locationInput,
        dateFromInput,
        dateToInput,
        sortSelect
    }));
}
