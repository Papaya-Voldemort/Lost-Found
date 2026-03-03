import { account, ID } from './auth.js';
import { showToast } from './toast.js';
import { handleItemSubmission, fetchItems, setupSearch } from './items.js';

/* ============================================
   DARK / LIGHT MODE TOGGLE
   ============================================ */

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        // Update theme-color meta tag
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', isDark ? '#121212' : '#326273');
    });
}

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */

const words = ["search", "recover", "report"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const typewriter = document.getElementById("typewriter");
    
    // Guard clause: exit if element doesn't exist (e.g., on pages without typewriter)
    if (!typewriter) {
        return;
    }
    
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typewriter.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 1000); // pause at full word
        }
    } else {
        typewriter.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : typingSpeed);
}

/* ============================================
   SCROLL-TRIGGERED ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Start typewriter effect only after DOM is ready
    typeEffect();
    
    // Scroll animation observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
});

/* ============================================
   OTHER DROP DOWN
   ============================================ */

const locationSelect = document.getElementById('location');
if (locationSelect) {
    locationSelect.addEventListener('change', function () {
        const otherLabel = document.getElementById('location-other-label');
        if (otherLabel) {
            otherLabel.style.display = this.value === 'other' ? 'flex' : 'none';
        }
    }); 
}

/* ============================================
   TAGS ON FORM
   ============================================ */

const tagInput = document.getElementById('tag-input');
const tagPills = document.getElementById('tag-pills');
const tagsHidden = document.getElementById('tags-hidden');
let tags = [];

if (tagInput && tagPills && tagsHidden) {
    tagInput.addEventListener('keydown', function (e) {
        // Add tag on Enter or comma
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = this.value.trim().replace(',', '');
            if (val && !tags.includes(val) && val.length > 0) {
                tags.push(val);
                renderTags();
            }
            this.value = '';
        }
    });

    function renderTags() {
        if (!tagPills || !tagsHidden) return;
        
        tagPills.innerHTML = '';
        tags.forEach(tag => {
            const pill = document.createElement('span');
            pill.className = 'tag-pill';
            pill.setAttribute('role', 'listitem');

            const text = document.createTextNode(tag + ' ');
            const btn = document.createElement('button');
            btn.textContent = '×';
            btn.setAttribute('aria-label', `Remove tag ${tag}`);
            
            // Modification: prevent form submission when clicking removing tag logic to be safer
            btn.type = 'button';
            
            btn.addEventListener('click', (e) => {
                // Prevent bubbling if necessary, though type='button' helps
                e.preventDefault();
                tags = tags.filter(t => t !== tag);
                renderTags();
            });

            pill.appendChild(text);
            pill.appendChild(btn);
            tagPills.appendChild(pill);
        });
        tagsHidden.value = tags.join(',');
    }
}

/* ============================================
   Image preview
   ============================================ */

const imageUpload = document.getElementById('image-upload');
const previewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const imageRemove = document.getElementById('image-remove');

if (imageUpload && previewContainer && imagePreview && imageRemove) {
    let currentObjectUrl = null;

    imageUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = URL.createObjectURL(file);
            imagePreview.src = currentObjectUrl;
            previewContainer.style.display = 'block';
        }
    });

    imageRemove.addEventListener('click', function (e) {
        e.preventDefault(); // prevent form submit
        imageUpload.value = '';         // clears the file input
        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }
        imagePreview.src = '';
        previewContainer.style.display = 'none';
    });
}

/* ============================================
   LIVE FIELD VALIDATION
   ============================================ */

// Add .touched class on blur so CSS validation styles activate
document.querySelectorAll('.item-form input, .item-form select, .item-form textarea, .settings-card input').forEach(field => {
    // Skip hidden inputs, search fields, and buttons
    if (field.type === 'hidden' || field.type === 'submit' || field.closest('.search-bar')) return;

    field.addEventListener('blur', () => {
        field.classList.add('touched');

        // Special handling for <select> with "none" as disabled placeholder
        if (field.tagName === 'SELECT') {
            field.classList.toggle('invalid-selection', field.value === 'none');
        }
    });

    // Also validate on change for selects (user picks an option)
    if (field.tagName === 'SELECT') {
        field.addEventListener('change', () => {
            field.classList.add('touched');
            field.classList.toggle('invalid-selection', field.value === 'none');
        });
    }
});

/* ============================================
   PASSWORD VISIBILITY TOGGLE
   ============================================ */

document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const wrapper = btn.closest('.password-wrapper');
        const input = wrapper.querySelector('input');
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        btn.classList.toggle('showing', !isPassword);
    });
});

/* ============================================
   PASSWORD SPACE STRIPPING
   ============================================ */

document.querySelectorAll('input[type="password"]').forEach(field => {
    field.addEventListener('input', () => {
        const pos = field.selectionStart;
        const cleaned = field.value.replace(/\s/g, '');
        if (cleaned !== field.value) {
            const diff = field.value.length - cleaned.length;
            field.value = cleaned;
            field.setSelectionRange(pos - diff, pos - diff);
        }
    });
});

/* ============================================
   PASSWORD STRENGTH METER
   ============================================ */

function initStrengthMeter(inputId, containerId) {
    const input = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    if (!input || !container) return;

    const fill = container.querySelector('.strength-fill');
    const text = container.querySelector('.strength-text');

    input.addEventListener('input', () => {
        const val = input.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (val.length >= 12) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const levels = [
            { label: '', color: 'transparent', width: '0%' },
            { label: 'Weak', color: '#dc3545', width: '20%' },
            { label: 'Fair', color: '#fd7e14', width: '40%' },
            { label: 'Good', color: '#ffc107', width: '60%' },
            { label: 'Strong', color: '#28a745', width: '80%' },
            { label: 'Very Strong', color: '#20c997', width: '100%' },
        ];

        const level = levels[score];
        fill.style.width = level.width;
        fill.style.backgroundColor = level.color;
        text.textContent = val.length > 0 ? level.label : '';
        text.style.color = level.color;
    });
}

initStrengthMeter('signup-password', 'password-strength');
initStrengthMeter('new-password', 'password-strength-account');

/* ============================================
   APPWRITE AUTHENTICATION
   ============================================ */

// Auth check runs inside the existing DOMContentLoaded above — moved there.
// This block is kept as an IIFE to avoid blocking the initial paint.
(async () => {
    // Wait for DOM
    if (document.readyState === 'loading') {
        await new Promise(r => document.addEventListener('DOMContentLoaded', r, { once: true }));
    }

    // Check if user is logged in
    let isLoggedIn = false;
    try {
        const user = await account.get();
        isLoggedIn = true;
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.href = 'account';
            loginLink.innerHTML = `
                <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="32" height="32">
                    <rect width="256" height="256" fill="none"/>
                    <circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                    <path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                </svg>
                Account
            `;
        }
    } catch (error) {
        // User is not logged in - this is expected, don't log error
        isLoggedIn = false;
        if (window.location.pathname.endsWith('account') || window.location.pathname.endsWith('account.html')) {
            window.location.href = 'login';
        }
    }

    // Handle form visibility on lost and found pages
    const signedInLostDiv = document.getElementById('signed-in-lost-item-div');
    const signedOutLostDiv = document.getElementById('signed-out-lost-item-div');
    const signedInFoundDiv = document.getElementById('signed-in-found-item-div');
    const signedOutFoundDiv = document.getElementById('signed-out-found-item-div');

    // Set initial visibility based on auth state
    if (signedInLostDiv && signedOutLostDiv) {
        signedInLostDiv.style.display = isLoggedIn ? 'block' : 'none';
        signedOutLostDiv.style.display = isLoggedIn ? 'none' : 'block';
        
        // Initialize items logic for lost page
        if (isLoggedIn) {
            handleItemSubmission('lost-item-form', 'lost');
        }
        fetchItems('lost');
        setupSearch('lost');
    }
    if (signedInFoundDiv && signedOutFoundDiv) {
        signedInFoundDiv.style.display = isLoggedIn ? 'block' : 'none';
        signedOutFoundDiv.style.display = isLoggedIn ? 'none' : 'block';
        
        // Initialize items logic for found page
        if (isLoggedIn) {
            handleItemSubmission('found-item-form', 'found');
        }
        fetchItems('found');
        setupSearch('found');
    }

    // Handle Signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const username = document.getElementById('signup-name').value;
            const submitBtn = signupForm.querySelector('input[type="submit"]');

            if (password !== confirmPassword) {
                showToast("Passwords do not match!", "error");
                return;
            }

            // Username validation
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            if (!usernameRegex.test(username)) {
                showToast("Username must be 3-20 characters and contain only letters, numbers, and underscores.", "error");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.value = 'Creating account…';

            try {
                try {
                    await account.get();
                    await account.deleteSession('current');
                } catch (e) {
                    // proceed
                }

                // Create user
                await account.create(ID.unique(), email, password, username);
                
                await account.createEmailPasswordSession(email, password);
                
                // Send verification email
                try {
                    await account.createVerification(window.location.origin + '/verify');
                    showToast("Account created! Please check your email to verify your account.", "success");
                    
                    // Redirect after a short delay so they can read the toast
                    setTimeout(() => {
                        window.location.href = 'account';
                    }, 3000);
                } catch (verifyError) {
                    showToast("Account created, but failed to send verification email.", "error");
                    setTimeout(() => {
                        window.location.href = 'account';
                    }, 3000);
                }
                
            } catch (error) {
                showToast("Signup failed: " + error.message, "error");
                submitBtn.disabled = false;
                submitBtn.value = 'Sign Up';
            }
        });
    }

    // Handle Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const submitBtn = loginForm.querySelector('input[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.value = 'Signing in…';

            try {
                // If user is already logged in, delete current session
                try {
                    await account.get();
                    await account.deleteSession('current');
                } catch (e) {
                    // Not logged in, proceed
                }

                await account.createEmailPasswordSession(email, password);
                window.location.href = 'account';
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.value = 'Sign In';
                if (error.code === 401) {
                    showToast("Invalid credentials. If you registered with Google, please use the 'Sign in with Google' button.", "error");
                } else {
                    showToast("Login failed: " + error.message, "error");
                }
            }
        });
    }

    // Handle Google OAuth
    const googleBtns = document.querySelectorAll('.google-btn');
    googleBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                // If user is already logged in, delete current session
                try {
                    await account.get();
                    await account.deleteSession('current');
                } catch (err) {
                    // Not logged in, proceed
                }

                // Use OAuth2 Token Flow instead of Session (works on mobile)
                // Token flow doesn't rely on cross-site cookies
                account.createOAuth2Token(
                    'google',
                    window.location.origin + '/callback',
                    window.location.origin + '/error'
                );
            } catch (error) {
                showToast("Google sign-in failed. Please try again.", "error");
            }
        });
    });

    // Handle Logout (if on account page)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await account.deleteSession('current');
                window.location.href = '/';
            } catch (error) {
                showToast("Logout failed: " + error.message, "error");
            }
        });
    }

    // Set max date on date inputs to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('max', today);
    });

    // Date From / Date To validation
    const dateFrom = document.getElementById('date-from');
    const dateTo = document.getElementById('date-to');
    if (dateFrom && dateTo) {
        dateFrom.addEventListener('change', () => {
            dateTo.min = dateFrom.value;
        });
        dateTo.addEventListener('change', () => {
            dateFrom.max = dateTo.value;
        });
    }
})();
