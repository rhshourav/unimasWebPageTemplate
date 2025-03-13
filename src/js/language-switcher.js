import { translations } from './translations.js';
import { ImageSlideshow } from './image-slideshow.js';
import { AboutSection } from './about.js';

export class LanguageSwitcher {
    constructor() {
        this.currentLang = 'en';
        this.slideshow = new ImageSlideshow();
        this.aboutSection = new AboutSection();
        this.init();
    }

    init() {
        const languageBtns = document.querySelectorAll('.language-btn');
        if (!languageBtns.length) return;

        languageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                localStorage.setItem('language', lang);
                
                // Remove active class from all buttons
                languageBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Reload page with new language
                location.href = `${location.pathname}?lang=${lang}`;
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
        const sinceElement = document.querySelector('.since');
        sinceElement.innerHTML = `
            <img src="img/titleLogo.svg" alt="Title Logo" class="since-logo">
            ${translations[lang].hero.since}
        `;
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

        // Update about section
        this.aboutSection.updateLanguage(lang);

        // Update footer
        const contactInfo = document.querySelector('.contact-info');
        contactInfo.querySelector('p:nth-child(1)').textContent = translations[lang].footer.address;
        contactInfo.querySelector('p:nth-child(2)').textContent = translations[lang].footer.district;
        contactInfo.querySelector('p:nth-child(3)').textContent = translations[lang].footer.email;
    }
} 