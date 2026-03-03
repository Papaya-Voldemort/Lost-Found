import { t } from './i18n.js';

export function showToast(message, type = 'info') {
    // Create container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Toast icons
    let iconSvg = '';
    if (type === 'error') {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path></svg>`;
    } else if (type === 'success') {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-115.66a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,150.69l50.34-50.35A8,8,0,0,1,173.66,100.34Z"></path></svg>`;
    } else {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM116,84a12,12,0,1,1,12,12A12,12,0,0,1,116,84Z"></path></svg>`;
    }

    toast.innerHTML = `
        <div class="toast-icon">${iconSvg}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="${t('common.close')}">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Handle close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });
    
    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeToast(toast);
    }, 5000);
}

function removeToast(toast) {
    if (!toast.classList.contains('show')) return;
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    });
}
