// Blog Page Functionality
import { ThemeManager } from './theme-manager.js';
import { LanguageSwitcher } from './language-switcher.js';

document.addEventListener('DOMContentLoaded', () => {
    initBlogAnimations();
    initThemeAndLanguage();
});

function initThemeAndLanguage() {
    // Initialize theme manager
    const themeManager = new ThemeManager();
    themeManager.init();

    // Initialize language switcher
    const languageSwitcher = new LanguageSwitcher();
    languageSwitcher.init();

    // Update active states for language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.textContent.toLowerCase() === 'en' ? 'en' : 'zh';
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            languageSwitcher.switchLanguage(lang);
        });
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        themeManager.toggleTheme();
        updateThemeIcon();
    });

    // Initial theme icon state
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const moonIcon = document.querySelector('.moon-icon');
    moonIcon.style.transform = isDark ? 'rotate(180deg)' : 'rotate(0deg)';
    moonIcon.style.transition = 'transform 0.3s ease';
}

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