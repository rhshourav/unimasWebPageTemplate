// Blog Page Functionality
import { ThemeManager } from './theme-manager.js';
import { LanguageSwitcher } from './language-switcher.js';
import { BlogAnimations } from './components/blog-animations.js';
import { MobileNavigation } from './components/mobile-nav.js';

class BlogPage {
    constructor() {
        this.themeManager = new ThemeManager();
        this.languageSwitcher = new LanguageSwitcher();
        this.blogAnimations = new BlogAnimations();
        this.mobileNav = new MobileNavigation();
    }

    init() {
        this.initThemeAndLanguage();
        this.blogAnimations.init();
        this.mobileNav.init();
        this.initSmoothScroll();
    }

    initThemeAndLanguage() {
        // Initialize theme manager
        this.themeManager.init();

        // Initialize language switcher
        this.languageSwitcher.init();

        // Update active states for language buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.textContent.toLowerCase() === 'en' ? 'en' : 'zh';
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.languageSwitcher.switchLanguage(lang);
            });
        });

        // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            this.themeManager.toggleTheme();
            this.updateThemeIcon();
        });

        // Initial theme icon state
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const moonIcon = document.querySelector('.moon-icon');
        moonIcon.style.transform = isDark ? 'rotate(180deg)' : 'rotate(0deg)';
        moonIcon.style.transition = 'transform 0.3s ease';
    }

    initSmoothScroll() {
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
    }
}

// Initialize the blog page
document.addEventListener('DOMContentLoaded', () => {
    const blogPage = new BlogPage();
    blogPage.init();
}); 