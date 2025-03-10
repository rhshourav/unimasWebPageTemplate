// Import theme and language managers
import { ThemeManager } from './theme-manager.js';
import { LanguageSwitcher } from './language-switcher.js';

// Blog Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    initBlogAnimations();
    initMobileNav();
    
    // Initialize theme and language support
    const themeManager = new ThemeManager();
    const languageSwitcher = new LanguageSwitcher();
    
    // Initialize language based on stored preference
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
        updateLanguage(storedLang);
    }
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

function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');
    const header = document.querySelector('.header');

    if (!hamburger || !mobileMenu) {
        console.error('Mobile navigation elements not found');
        return;
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Hamburger click event
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = mobileMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Prevent menu from closing when clicking inside
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Handle scroll behavior
    let lastScroll = 0;
    let scrollTimer = null;

    window.addEventListener('scroll', () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                header.classList.remove('scroll-down');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        }, 100);
    });
}

function updateLanguage(lang) {
    const translations = {
        en: {
            home: 'HOME',
            about: 'ABOUT US',
            projects: 'PROJECTS',
            blog: 'BLOG',
            contact: 'CONTACT',
            latestNews: 'Our Latest News',
            stayUpdated: 'Stay updated with Unimas Sportswear\'s journey and innovations'
        },
        zh: {
            home: '首页',
            about: '关于我们',
            projects: '项目',
            blog: '博客',
            contact: '联系我们',
            latestNews: '最新消息',
            stayUpdated: '及时了解 Unimas Sportswear 的发展历程和创新'
        }
    };

    const t = translations[lang];
    
    // Update all navigation links (both desktop and mobile)
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
        const key = link.getAttribute('href').split('#')[1] || 'blog';
        if (t[key.toLowerCase()]) {
            link.textContent = t[key.toLowerCase()];
        }
    });

    // Update hero section
    const heroTitle = document.querySelector('.blog-hero h1');
    const heroText = document.querySelector('.blog-hero p');
    if (heroTitle) heroTitle.textContent = t.latestNews;
    if (heroText) heroText.textContent = t.stayUpdated;
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