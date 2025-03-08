import { translations } from './translations.js';

export class LanguageSwitcher {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedLanguage();
    }

    bindEvents() {
        const buttons = document.querySelectorAll('.language-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
                this.updateActiveButton(btn);
            });
        });
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('language') || 'en';
        this.switchLanguage(savedLang);
        this.updateActiveButton(document.querySelector(`[data-lang="${savedLang}"]`));
    }

    updateActiveButton(activeBtn) {
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update navigation
        const navLinks = {
            '#home': translations[lang].nav.home,
            '#about': translations[lang].nav.about,
            '#services': translations[lang].nav.services,
            '#projects': translations[lang].nav.projects,
            '#blog': translations[lang].nav.blog,
            '#contact': translations[lang].nav.contact
        };

        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (navLinks[href]) {
                link.textContent = navLinks[href];
            }
        });

        // Update hero section
        document.querySelector('.since').textContent = translations[lang].hero.since;
        document.querySelector('.company-name').textContent = translations[lang].hero.companyName;
        document.querySelector('.subsidiary').textContent = translations[lang].hero.subsidiary;
        document.querySelector('.parent-company').textContent = translations[lang].hero.parentCompany;
        document.querySelector('.logo-text').textContent = translations[lang].hero.slogan;
        document.querySelector('.hero p').textContent = translations[lang].hero.description;
        document.querySelector('.watch-btn').innerHTML = `
            <span class="play-icon">▶</span>
            ${translations[lang].hero.watchVideo}
        `;

        // Update features
        const qualityCard = document.querySelector('.feature-card.quality');
        qualityCard.querySelector('h3').textContent = translations[lang].features.quality.title;
        qualityCard.querySelector('p').textContent = translations[lang].features.quality.description;

        const overviewCard = document.querySelector('.feature-card.overview');
        overviewCard.querySelector('h3').textContent = translations[lang].features.overview.title;
        overviewCard.querySelector('p').textContent = translations[lang].features.overview.description;

        // Update footer
        const contactInfo = document.querySelector('.contact-info');
        contactInfo.querySelector('p:first-child').textContent = translations[lang].footer.address;
        contactInfo.querySelector('p:last-child').textContent = translations[lang].footer.email;
    }
} 