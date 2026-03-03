import { account, ID } from './auth.js';
import { applyTranslations, getArray, t } from './i18n.js';
import { showToast } from './toast.js';
import { handleItemSubmission, fetchItems, setupSearch, setupLoadMore } from './items.js';

let Cropper = null;
let cropperInstance = null;

const THEME_STORAGE_KEY = 'theme';
const LANGUAGE_STORAGE_KEY = 'language';

function prefersDarkMode() {
    return window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : true;
}

function getStoredThemePreference() {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
}

function getEffectiveTheme(themePreference = getStoredThemePreference()) {
    if (themePreference === 'dark' || themePreference === 'light') {
        return themePreference;
    }

    return prefersDarkMode() ? 'dark' : 'light';
}

function applyTheme(themePreference = getStoredThemePreference()) {
    const effectiveTheme = getEffectiveTheme(themePreference);
    const isDark = effectiveTheme === 'dark';

    document.documentElement.classList.toggle('dark-mode', isDark);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', isDark ? '#121212' : '#326273');
    }

    return effectiveTheme;
}

function saveThemePreference(themePreference) {
    localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    return applyTheme(themePreference);
}

function applyStoredLanguage() {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage) {
        document.documentElement.lang = storedLanguage;
        document.documentElement.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
    }
}

function initializePreferenceControls() {
    applyStoredLanguage();
    applyTheme();
    applyTranslations();

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
            saveThemePreference(nextTheme);
        });
    }

    const themePreferenceSelect = document.getElementById('theme-preference');
    if (themePreferenceSelect) {
        themePreferenceSelect.value = getStoredThemePreference();
        themePreferenceSelect.addEventListener('change', () => {
            saveThemePreference(themePreferenceSelect.value);
            showToast(t('forms.accountSaved'), 'success');
        });
    }

    const languagePreferenceSelect = document.getElementById('language-preference');
    if (languagePreferenceSelect) {
        const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || document.documentElement.lang || 'en';
        languagePreferenceSelect.value = storedLanguage;
        document.documentElement.lang = storedLanguage;

        languagePreferenceSelect.addEventListener('change', () => {
            const nextLanguage = languagePreferenceSelect.value;
            localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
            document.documentElement.lang = nextLanguage;
            document.documentElement.dir = nextLanguage === 'ar' ? 'rtl' : 'ltr';
            applyTranslations();
            words = getArray('home.typewriterWords');
            wordIndex = 0;
            charIndex = 0;
            isDeleting = false;
            showToast(t('forms.languageSaved'), 'success');
        });
    }

    if (window.matchMedia) {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addEventListener('change', () => {
            if (getStoredThemePreference() === 'system') {
                applyTheme('system');
            }
        });
    }
}

/* ============================================
   DARK / LIGHT MODE TOGGLE
   ============================================ */

initializePreferenceControls();

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */

let words = getArray('home.typewriterWords');

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

                // Count-up for stat numbers
                if (entry.target.classList.contains('stat-number') && entry.target.dataset.target) {
                    const target = parseInt(entry.target.dataset.target, 10);
                    const suffix = entry.target.dataset.suffix || '';
                    const duration = 1500;
                    const start = performance.now();
                    entry.target.dataset.counted = 'true';

                    function tick(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.round(eased * target);
                        entry.target.textContent = current.toLocaleString() + suffix;
                        if (progress < 1) requestAnimationFrame(tick);
                    }

                    requestAnimationFrame(tick);
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    // Also observe stat numbers for count-up (they may not have .scroll-animate)
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        if (!el.dataset.counted) observer.observe(el);
    });
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

    imageUpload.addEventListener('change', async function () {
        const file = this.files[0];
        if (!file) return;

        // File size validation (5 MB limit)
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image must be under 5 MB.', 'error');
            this.value = '';
            return;
        }

        const cropModal = document.getElementById('crop-modal');
        const cropImage = document.getElementById('crop-image');

        if (cropModal && cropImage) {
            // Load Cropper.js dynamically on first use
            if (!Cropper) {
                try {
                    const mod = await import('https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/+esm');
                    Cropper = mod.default;
                } catch (e) {
                    // Fallback: show preview without cropping
                    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
                    currentObjectUrl = URL.createObjectURL(file);
                    imagePreview.src = currentObjectUrl;
                    previewContainer.style.display = 'block';
                    return;
                }
            }

            if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = URL.createObjectURL(file);
            cropImage.src = currentObjectUrl;
            cropModal.classList.add('active');

            // Wait for image to load before initializing Cropper
            cropImage.onload = () => {
                if (cropperInstance) cropperInstance.destroy();
                cropperInstance = new Cropper(cropImage, {
                    viewMode: 1,
                    autoCropArea: 0.8,
                    responsive: true,
                });
            };
        } else {
            // Fallback for pages without crop modal
            if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = URL.createObjectURL(file);
            imagePreview.src = currentObjectUrl;
            previewContainer.style.display = 'block';
        }
    });

    // Crop confirm
    document.getElementById('crop-confirm')?.addEventListener('click', () => {
        if (!cropperInstance) return;
        const canvas = cropperInstance.getCroppedCanvas({
            maxWidth: 1920,
            maxHeight: 1920,
        });
        canvas.toBlob((blob) => {
            const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
            imageUpload._croppedFile = croppedFile;
            if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = URL.createObjectURL(blob);
            imagePreview.src = currentObjectUrl;
            previewContainer.style.display = 'block';
            document.getElementById('crop-modal').classList.remove('active');
            cropperInstance.destroy();
            cropperInstance = null;
        }, 'image/jpeg', 0.85);
    });

    // Crop cancel
    document.getElementById('crop-cancel')?.addEventListener('click', () => {
        document.getElementById('crop-modal').classList.remove('active');
        if (cropperInstance) { cropperInstance.destroy(); cropperInstance = null; }
        imageUpload.value = '';
        imageUpload._croppedFile = null;
        if (currentObjectUrl) { URL.revokeObjectURL(currentObjectUrl); currentObjectUrl = null; }
    });

    imageRemove.addEventListener('click', function (e) {
        e.preventDefault();
        imageUpload.value = '';
        imageUpload._croppedFile = null;
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
        btn.setAttribute('aria-label', isPassword ? t('forms.hidePassword') : t('forms.showPassword'));
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
            { label: t('common.passwordStrength.1'), color: '#dc3545', width: '20%' },
            { label: t('common.passwordStrength.2'), color: '#fd7e14', width: '40%' },
            { label: t('common.passwordStrength.3'), color: '#ffc107', width: '60%' },
            { label: t('common.passwordStrength.4'), color: '#28a745', width: '80%' },
            { label: t('common.passwordStrength.5'), color: '#20c997', width: '100%' },
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

    // Show the email verification panel on the login page (hides the login form)
    function showVerificationPanel(email) {
        const panel = document.getElementById('verification-panel');
        if (!panel) return;

        const googleBtn = document.querySelector('.google-btn');
        const orDivider = document.querySelector('.or-divider');
        const loginForm = document.getElementById('login-form');
        const authLink = document.querySelector('.auth-link');
        if (googleBtn) googleBtn.style.display = 'none';
        if (orDivider) orDivider.style.display = 'none';
        if (loginForm) loginForm.style.display = 'none';
        if (authLink) authLink.style.display = 'none';

        const emailSpan = document.getElementById('verification-email');
        if (emailSpan) emailSpan.textContent = email;
        panel.style.display = 'block';

        const resendBtn = document.getElementById('resend-verification-login');
        if (resendBtn) {
            resendBtn.addEventListener('click', async () => {
                resendBtn.disabled = true;
                resendBtn.textContent = t('login.sending');
                try {
                    await account.createVerification(window.location.origin + '/verify');
                    showToast(t('login.verificationSentToast'), 'success');
                } catch (err) {
                    showToast(t('login.verificationFailedPrefix') + err.message, 'error');
                } finally {
                    resendBtn.disabled = false;
                    resendBtn.textContent = t('login.resendVerificationEmail');
                }
            });
        }

        const signoutBtn = document.getElementById('signout-unverified');
        if (signoutBtn) {
            signoutBtn.addEventListener('click', async () => {
                try {
                    await account.deleteSession('current');
                } catch (e) { /* session already gone */ }
                location.reload();
            });
        }
    }

    // Check if user is logged in
    let isLoggedIn = false;
    try {
        const user = await account.get();
        isLoggedIn = true;
        const isVerified = user.emailVerification;
        const path = window.location.pathname;

        const isProtectedPage =
            path.endsWith('account') || path.endsWith('account.html') ||
            path.endsWith('lost') || path.endsWith('lost.html') ||
            path.endsWith('found') || path.endsWith('found.html');
        const isLoginPage = path.endsWith('login') || path.endsWith('login.html');
        const isSignupPage = path.endsWith('signup') || path.endsWith('signup.html');

        // Block unverified users from accessing protected pages
        if (isProtectedPage && !isVerified) {
            window.location.href = 'login';
            return;
        }

        // Redirect already-logged-in verified users away from auth pages
        if (isLoginPage && isVerified) {
            window.location.href = 'account';
            return;
        }
        if (isSignupPage) {
            window.location.href = isVerified ? 'account' : 'login';
            return;
        }

        // Logged in but unverified on the login page — show verification panel
        if (isLoginPage && !isVerified) {
            showVerificationPanel(user.email);
        }

        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.parentElement?.classList.remove('nav-login');
            loginLink.parentElement?.classList.add('nav-account');
            loginLink.href = 'account';
            loginLink.innerHTML = `
                <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="5"/>
                    <path d="M20 21a8 8 0 0 0-16 0"/>
                </svg>
                ${t('nav.account')}
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
        setupLoadMore();
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
        setupLoadMore();
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
                showToast(t('signup.passwordsMismatch'), 'error');
                return;
            }

            // Username validation
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            if (!usernameRegex.test(username)) {
                showToast(t('signup.invalidUsername'), 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.value = t('signup.creatingAccount');

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
                    showToast(t('signup.accountCreatedVerify'), 'success');

                    // Redirect to login where the verification panel will auto-show
                    setTimeout(() => {
                        window.location.href = 'login';
                    }, 3000);
                } catch (verifyError) {
                    showToast(t('signup.accountCreatedVerifyFailed'), 'error');
                    setTimeout(() => {
                        window.location.href = 'login';
                    }, 3000);
                }
                
            } catch (error) {
                showToast(t('signup.signupFailedPrefix') + error.message, 'error');
                submitBtn.disabled = false;
                submitBtn.value = t('signup.signUp');
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
            submitBtn.value = t('login.signingIn');

            try {
                // If user is already logged in, delete current session
                try {
                    await account.get();
                    await account.deleteSession('current');
                } catch (e) {
                    // Not logged in, proceed
                }

                await account.createEmailPasswordSession(email, password);
                const loggedInUser = await account.get();
                if (loggedInUser.emailVerification) {
                    window.location.href = 'account';
                } else {
                    submitBtn.disabled = false;
                    submitBtn.value = t('login.signIn');
                    showVerificationPanel(loggedInUser.email);
                }
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.value = t('login.signIn');
                if (error.code === 401) {
                    showToast(t('login.invalidCredentials'), 'error');
                } else {
                    showToast(t('login.loginFailedPrefix') + error.message, 'error');
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
                showToast(t('login.googleFailed'), 'error');
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
                showToast(t('account.logoutFailed') + ': ' + error.message, 'error');
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

    // Handle Forgot Password
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', () => {
            const modal = document.getElementById('forgot-password-modal');
            if (modal) modal.classList.add('active');
        });
    }

    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('forgot-email').value.trim();
            const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = t('login.sending');

            try {
                await account.createRecovery(email, window.location.origin + '/reset-password');
                showToast(t('login.recoverySent'), 'success');
                document.getElementById('forgot-password-modal').classList.remove('active');
                forgotPasswordForm.reset();
            } catch (error) {
                showToast(t('login.recoveryFailedPrefix') + error.message, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = t('login.sendResetLink');
            }
        });
    }
})();

/* ============================================
   MODAL CLOSE HANDLERS
   ============================================ */

// Close modal on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        handleCropModalClose(e.target);
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
            handleCropModalClose(modal);
        });
    }
});

// Close modal on X button click
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            handleCropModalClose(modal);
        }
    });
});

function handleCropModalClose(modal) {
    if (modal.id === 'crop-modal') {
        if (cropperInstance) { cropperInstance.destroy(); cropperInstance = null; }
        const imgUpload = document.getElementById('image-upload');
        if (imgUpload) { imgUpload.value = ''; imgUpload._croppedFile = null; }
    }
}
