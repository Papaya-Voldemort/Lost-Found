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

document.getElementById('location').addEventListener('change', function () {
    const otherLabel = document.getElementById('location-other-label');
    otherLabel.style.display = this.value === 'other' ? 'flex' : 'none';
});

/* ============================================
   TAGS ON FORM
   ============================================ */

const tagInput = document.getElementById('tag-input');
const tagPills = document.getElementById('tag-pills');
const tagsHidden = document.getElementById('tags-hidden');
let tags = [];

tagInput.addEventListener('keydown', function (e) {
    // Add tag on Enter or comma
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const val = this.value.trim().replace(',', '');
        if (val && !tags.includes(val)) {
            tags.push(val);
            renderTags();
        }
        this.value = '';
    }
});

function renderTags() {
    tagPills.innerHTML = '';
    tags.forEach(tag => {
        const pill = document.createElement('span');
        pill.className = 'tag-pill';
        pill.setAttribute('role', 'listitem');

        const text = document.createTextNode(tag + ' ');
        const btn = document.createElement('button');
        btn.textContent = '×';
        btn.setAttribute('aria-label', `Remove tag ${tag}`);
        btn.addEventListener('click', () => {
            tags = tags.filter(t => t !== tag);
            renderTags();
        });

        pill.appendChild(text);
        pill.appendChild(btn);
        tagPills.appendChild(pill);
    });
    tagsHidden.value = tags.join(',');
}

/* ============================================
   Image preview
   ============================================ */

const imageUpload = document.getElementById('image-upload');
const previewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const imageRemove = document.getElementById('image-remove');

imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        imagePreview.src = URL.createObjectURL(file);
        previewContainer.style.display = 'block';
    }
});

imageRemove.addEventListener('click', function () {
    imageUpload.value = '';         // clears the file input
    imagePreview.src = '';
    previewContainer.style.display = 'none';
});