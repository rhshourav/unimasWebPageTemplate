import { BackgroundSlider } from './js/slider.js';
import { LanguageSwitcher } from './js/language-switcher.js';
import { ThemeManager } from './js/theme-manager.js';
import { AboutSection } from './js/about.js';
import { SectionLoader } from './js/load-sections.js';

// Load about section
await SectionLoader.loadSection('about-section', 'about.html');

// Initialize theme manager
new ThemeManager();

// Initialize language switcher
const languageSwitcher = new LanguageSwitcher();

// Initialize about section
const aboutSection = new AboutSection();

// Image slider configuration
const images = [
    'img/slide1.jpg',
    'img/slide2.png',
    'img/slide3.jpg',
    'img/slide4.jpg',
    'img/slide5.jpg'
];

// Initialize the background slider
new BackgroundSlider(images);

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

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
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
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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

// Video button click handler
const watchBtn = document.querySelector('.watch-btn');
if (watchBtn) {
    watchBtn.addEventListener('click', () => {
        alert('Video player functionality will be implemented here');
    });
}

// Hover effect for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}); 