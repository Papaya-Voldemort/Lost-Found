import { account, ID } from './auth.js';
import { showToast } from './toast.js';

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
    imageUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            imagePreview.src = URL.createObjectURL(file);
            previewContainer.style.display = 'block';
        }
    });

    imageRemove.addEventListener('click', function (e) {
        e.preventDefault(); // prevent form submit
        imageUpload.value = '';         // clears the file input
        imagePreview.src = '';
        previewContainer.style.display = 'none';
        
        // Also revoke object URL to free memory if possible, 
        // though we'd need to store the url to do that.
    });
}

/* ============================================
   APPWRITE AUTHENTICATION
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    try {
        const user = await account.get();
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.href = 'account.html';
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
        // User is not logged in
        if (window.location.pathname.endsWith('account.html')) {
            window.location.href = 'login.html';
        }
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
                    await account.createVerification({ url: window.location.origin + '/verify.html' });
                    showToast("Account created! Please check your email to verify your account.", "success");
                    
                    // Redirect after a short delay so they can read the toast
                    setTimeout(() => {
                        window.location.href = 'account.html';
                    }, 3000);
                } catch (verifyError) {
                    showToast("Account created, but failed to send verification email.", "error");
                    setTimeout(() => {
                        window.location.href = 'account.html';
                    }, 3000);
                }
                
            } catch (error) {
                showToast("Signup failed: " + error.message, "error");
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

            try {
                // If user is already logged in, delete current session
                try {
                    await account.get();
                    await account.deleteSession('current');
                } catch (e) {
                    // Not logged in, proceed
                }

                await account.createEmailPasswordSession(email, password);
                window.location.href = 'account.html';
            } catch (error) {
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
            
            // If user is already logged in, delete current session
            try {
                await account.get();
                await account.deleteSession('current');
            } catch (err) {
                // Not logged in, proceed
            }

            // Appwrite OAuth2
            account.createOAuth2Session(
                'google',
                window.location.origin + '/account.html',
                window.location.origin + '/login.html'
            );
        });
    });

    // Handle Logout (if on account page)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await account.deleteSession('current');
                window.location.href = 'index.html';
            } catch (error) {
                alert("Logout failed: " + error.message);
            }
        });
    }
});