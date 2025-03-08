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
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navContainer.classList.toggle('active');
        document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
    }

    // Hamburger click event
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navContainer.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navContainer.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Prevent clicks inside nav container from closing the menu
    navContainer.addEventListener('click', (e) => {
        e.stopPropagation();
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
    
    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
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