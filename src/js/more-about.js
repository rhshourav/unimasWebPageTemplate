import { ThemeManager } from './theme-manager.js';
import { LanguageSwitcher } from './language-switcher.js';

// Initialize theme manager
new ThemeManager();

// Initialize language switcher
const languageSwitcher = new LanguageSwitcher();

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');
const body = document.body;

// Toggle mobile menu
const toggleMobileMenu = (show) => {
    hamburger.classList.toggle('active', show);
    navContainer.classList.toggle('active', show);
    body.style.overflow = show ? 'hidden' : '';
};

// Hamburger click event
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const willShow = !navContainer.classList.contains('active');
    toggleMobileMenu(willShow);
});

// Close menu when clicking links or language buttons
document.querySelectorAll('.nav-links a, .language-btn, .theme-toggle').forEach(item => {
    item.addEventListener('click', () => {
        toggleMobileMenu(false);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && 
        !navContainer.contains(e.target) && 
        navContainer.classList.contains('active')) {
        toggleMobileMenu(false);
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to elements
const animatedElements = document.querySelectorAll('.facility-card, .certification-card, .team-member');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add class for fade-in animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`); 