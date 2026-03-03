document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const header = document.querySelector('header');
    
    // Only run if elements exist (mobile header present)
    if (hamburger && header) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling causing immediate close check
            document.body.classList.toggle('nav-open');
            
            const isExpanded = document.body.classList.contains('nav-open');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Close when clicking outside (on the backdrop or main content)
        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('nav-open')) {
                // If click is NOT inside the header (drawer) AND NOT on the hamburger button
                if (!header.contains(e.target) && !hamburger.contains(e.target)) {
                    document.body.classList.remove('nav-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Close when a link is clicked
        const navLinks = header.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
                document.body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});