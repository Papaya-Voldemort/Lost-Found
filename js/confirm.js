
/* ============================================
   CONFIRMATION MODAL
   ============================================ */

export function showConfirm(title, message, onConfirm) {
    // Remove existing if any
    const existing = document.getElementById('custom-confirm-modal');
    if (existing) existing.remove();

    const modalHTML = `
        <div id="custom-confirm-modal" class="modal-overlay">
            <div class="modal-content">
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="modal-actions">
                    <button id="confirm-cancel-btn" class="btn-secondary" style="background-color: var(--color-dark-gray);">Cancel</button>
                    <button id="confirm-ok-btn" class="btn-primary" style="background-color: var(--color-error, #dc3545);">Confirm</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('custom-confirm-modal');
    
    // Trigger paint to start animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };

    document.getElementById('confirm-cancel-btn').addEventListener('click', closeModal);
    
    document.getElementById('confirm-ok-btn').addEventListener('click', () => {
        closeModal();
        if (onConfirm) onConfirm();
    });
}

