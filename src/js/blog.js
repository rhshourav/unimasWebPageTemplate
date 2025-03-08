// Blog Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    initBlogAnimations();
    initThemeSupport();
    initMobileNav();
    initLanguageSwitcher();
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
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    }

    themeToggle?.addEventListener('click', () => {
        let theme = 'light';
        if (document.body.getAttribute('data-theme') !== 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            theme = 'dark';
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('theme', theme);
    });
}

function initLanguageSwitcher() {
    const languageBtns = document.querySelectorAll('.language-btn');
    const currentLang = localStorage.getItem('language') || 'en';

    languageBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            languageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            localStorage.setItem('language', lang);
            updateLanguage(lang);
        });
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

function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navContainer?.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger?.contains(e.target) && 
            !navContainer?.contains(e.target) && 
            navContainer?.classList.contains('active')) {
            hamburger?.classList.remove('active');
            navContainer?.classList.remove('active');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navContainer?.classList.remove('active');
        });
    });
}

// Initialize language based on stored preference
const storedLang = localStorage.getItem('language');
if (storedLang) {
    updateLanguage(storedLang);
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