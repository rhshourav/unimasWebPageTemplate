// Blog Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    initBlogAnimations();
    initThemeSupport();
});

function initBlogAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.6s ease forwards;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function initThemeSupport() {
    // Add theme-specific styles
    const style = document.createElement('style');
    style.textContent = `
        [data-theme="dark"] .blog-card {
            background: rgba(30, 30, 30, 0.5);
        }

        [data-theme="dark"] .blog-date {
            background: rgba(0, 0, 0, 0.9);
        }

        [data-theme="dark"] .decorative-wave,
        [data-theme="dark"] .decorative-squares {
            opacity: 0.03;
        }
    `;
    document.head.appendChild(style);
}

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 