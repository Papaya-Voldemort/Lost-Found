/**
 * Admin panel module — handles moderation of pending items and management of all items.
 * Admin access is restricted to a hardcoded list of authorized emails.
 */

import { account, databases, storage, Query } from './auth.js';
import { t } from './i18n.js';
import { showToast } from './toast.js';
import { showConfirm } from './confirm.js';

const DB_ID = 'traceback_db';
const COLLECTION_ID = 'items';
const BUCKET_ID = 'item_images';

const ADMIN_EMAILS = [
    'luke.c309@stu.nebo.edu',
    'eli.n992@stu.nebo.edu',
];

export function isAdmin(user) {
    return user && ADMIN_EMAILS.includes(user.email);
}

let pendingOffset = 0;
let allOffset = 0;
const PAGE_LIMIT = 12;

async function initAdmin() {
    try {
        const user = await account.get();
        if (!user.emailVerification) {
            window.location.href = '/login';
            return;
        }
        if (!isAdmin(user)) {
            window.location.href = '/';
            return;
        }

        document.documentElement.classList.add('is-admin');
        await loadStats();
        await loadPendingItems();
        await loadAllItems();
        setupTabSwitching();
    } catch (error) {
        console.error('Admin init failed:', error);
        window.location.href = '/login';
    }
}

// Stats summary
async function loadStats() {
    try {
        const [pendingRes, activeRes] = await Promise.all([
            databases.listDocuments(DB_ID, COLLECTION_ID, [
                Query.equal('status', 'pending'),
                Query.limit(1),
            ]),
            databases.listDocuments(DB_ID, COLLECTION_ID, [
                Query.equal('status', 'active'),
                Query.limit(1),
            ]),
        ]);

        const elPending = document.getElementById('stat-pending');
        const elActive = document.getElementById('stat-active');
        const elTotal = document.getElementById('stat-total');
        if (elPending) elPending.textContent = pendingRes.total;
        if (elActive) elActive.textContent = activeRes.total;
        if (elTotal) elTotal.textContent = pendingRes.total + activeRes.total;
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

// Pending items
async function loadPendingItems(loadMore = false) {
    const container = document.getElementById('pending-items-grid');
    const loadMoreBtn = document.getElementById('pending-load-more');
    if (!container) return;

    if (!loadMore) {
        container.innerHTML = '';
        pendingOffset = 0;
    }

    try {
        const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
            Query.equal('status', 'pending'),
            Query.orderDesc('$createdAt'),
            Query.limit(PAGE_LIMIT),
            Query.offset(pendingOffset),
        ]);

        if (response.documents.length === 0 && pendingOffset === 0) {
            container.innerHTML = `<p class="empty-state">${t('admin.noPending')}</p>`;
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        response.documents.forEach(doc => {
            container.appendChild(createAdminCard(doc, 'pending'));
        });

        pendingOffset += response.documents.length;
        if (loadMoreBtn) {
            loadMoreBtn.style.display = pendingOffset >= response.total ? 'none' : 'block';
        }
    } catch (error) {
        console.error('Failed to load pending items:', error);
        showToast(t('admin.loadFailed'), 'error');
    }
}

// All items
async function loadAllItems(loadMore = false) {
    const container = document.getElementById('all-items-grid');
    const loadMoreBtn = document.getElementById('all-load-more');
    if (!container) return;

    if (!loadMore) {
        container.innerHTML = '';
        allOffset = 0;
    }

    try {
        const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
            Query.orderDesc('$createdAt'),
            Query.limit(PAGE_LIMIT),
            Query.offset(allOffset),
        ]);

        if (response.documents.length === 0 && allOffset === 0) {
            container.innerHTML = `<p class="empty-state">${t('admin.noItems')}</p>`;
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        response.documents.forEach(doc => {
            container.appendChild(createAdminCard(doc, 'all'));
        });

        allOffset += response.documents.length;
        if (loadMoreBtn) {
            loadMoreBtn.style.display = allOffset >= response.total ? 'none' : 'block';
        }
    } catch (error) {
        console.error('Failed to load all items:', error);
        showToast(t('admin.loadFailed'), 'error');
    }
}

function createAdminCard(doc, context) {
    const card = document.createElement('article');
    card.className = 'listing-card admin-card';
    card.id = `admin-card-${doc.$id}`;

    // Image
    let imageUrl = 'images/placeholder-item.svg';
    if (doc.imageId) {
        try {
            imageUrl = storage.getFilePreview(BUCKET_ID, doc.imageId);
        } catch (e) {
            console.error('Error fetching image:', e);
        }
    }

    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = doc.title;
    img.loading = 'lazy';

    // Status badge
    const badge = document.createElement('span');
    badge.className = `status-badge ${doc.status}`;
    badge.textContent = doc.status === 'pending' ? 'Pending Approval' : 'Active';
    cardImage.append(img, badge);

    // Type badge
    const typeBadge = document.createElement('span');
    typeBadge.className = `status-badge type-badge ${doc.type}`;
    typeBadge.textContent = t(`nav.${doc.type}`);
    cardImage.appendChild(typeBadge);

    // Content
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const h3 = document.createElement('h3');
    h3.textContent = doc.title;

    const meta = document.createElement('p');
    meta.className = 'meta';
    const dateSpan = document.createElement('span');
    dateSpan.textContent = `📅 ${new Date(doc.date).toLocaleDateString()}`;
    const locSpan = document.createElement('span');
    locSpan.textContent = `📍 ${doc.location}`;
    const userSpan = document.createElement('span');
    userSpan.textContent = `👤 ${doc.userName || doc.userEmail || 'Unknown'}`;
    meta.append(dateSpan, locSpan, userSpan);

    const desc = document.createElement('p');
    desc.className = 'admin-description';
    desc.textContent = doc.description;

    // Actions
    const actions = document.createElement('div');
    actions.className = 'actions';

    if (context === 'pending' || doc.status === 'pending') {
        const approveBtn = document.createElement('button');
        approveBtn.className = 'btn-resolve';
        approveBtn.textContent = t('admin.approve');
        approveBtn.addEventListener('click', () => handleApprove(doc.$id));
        actions.appendChild(approveBtn);

        const rejectBtn = document.createElement('button');
        rejectBtn.className = 'btn-delete';
        rejectBtn.textContent = t('admin.reject');
        rejectBtn.addEventListener('click', () => handleReject(doc.$id, doc.imageId));
        actions.appendChild(rejectBtn);
    } else {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = t('account.delete');
        deleteBtn.addEventListener('click', () => handleAdminDelete(doc.$id, doc.imageId));
        actions.appendChild(deleteBtn);
    }

    cardContent.append(h3, meta, desc, actions);
    card.append(cardImage, cardContent);
    return card;
}

async function handleApprove(docId) {
    showConfirm(
        t('admin.approveConfirmTitle'),
        t('admin.approveConfirmMsg'),
        async () => {
            try {
                await databases.updateDocument(DB_ID, COLLECTION_ID, docId, {
                    status: 'active',
                });
                showToast(t('admin.approved'), 'success');
                removeCardFromUI(docId);
                await loadStats();
            } catch (error) {
                console.error('Approve failed:', error);
                showToast(t('admin.approveFailed'), 'error');
            }
        }
    );
}

async function handleReject(docId, imageId) {
    showConfirm(
        t('admin.rejectConfirmTitle'),
        t('admin.rejectConfirmMsg'),
        async () => {
            try {
                if (imageId) {
                    try { await storage.deleteFile(BUCKET_ID, imageId); }
                    catch (err) { console.warn('Failed to delete image:', err); }
                }
                await databases.deleteDocument(DB_ID, COLLECTION_ID, docId);
                showToast(t('admin.rejected'), 'success');
                removeCardFromUI(docId);
                await loadStats();
            } catch (error) {
                console.error('Reject failed:', error);
                showToast(t('admin.rejectFailed'), 'error');
            }
        }
    );
}

async function handleAdminDelete(docId, imageId) {
    showConfirm(
        t('admin.deleteConfirmTitle'),
        t('admin.deleteConfirmMsg'),
        async () => {
            try {
                if (imageId) {
                    try { await storage.deleteFile(BUCKET_ID, imageId); }
                    catch (err) { console.warn('Failed to delete image:', err); }
                }
                await databases.deleteDocument(DB_ID, COLLECTION_ID, docId);
                showToast(t('account.deleted'), 'success');
                removeCardFromUI(docId);
                await loadStats();
            } catch (error) {
                console.error('Admin delete failed:', error);
                showToast(t('account.deleteFailed'), 'error');
            }
        }
    );
}

function removeCardFromUI(docId) {
    const card = document.getElementById(`admin-card-${docId}`);
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => card.remove(), 300);
    }
}

function setupTabSwitching() {
    const tabs = document.querySelectorAll('.admin-tab');
    const panels = document.querySelectorAll('.admin-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.panel);
            if (target) target.classList.add('active');
        });
    });

    // Load More buttons
    document.getElementById('pending-load-more')?.addEventListener('click', () => loadPendingItems(true));
    document.getElementById('all-load-more')?.addEventListener('click', () => loadAllItems(true));
}

// Initialize on DOM ready — only runs when on the admin page
if (document.querySelector('.admin-header')) {
    document.addEventListener('DOMContentLoaded', initAdmin);
}
