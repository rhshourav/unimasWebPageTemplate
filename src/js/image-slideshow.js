import { translations } from './translations.js';

export class ImageSlideshow {
    constructor() {
        this.currentImageIndex = 0;
        this.currentLang = 'en';
        this.intervalId = null;
        this.init();
    }

    init() {
        this.startSlideshow();
    }

    startSlideshow() {
        // Clear any existing interval
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        // Start new interval
        this.intervalId = setInterval(() => {
            const mainImg = document.querySelector('.about-img.main-img');
            if (!mainImg) return;

            this.currentImageIndex = (this.currentImageIndex + 1) % translations[this.currentLang].about.images.length;
            
            // Create new image element
            const newImage = new Image();
            newImage.src = translations[this.currentLang].about.images[this.currentImageIndex];
            
            // Add fade-out class to current image
            mainImg.classList.add('fade-out');
            
            // Wait for fade out animation
            setTimeout(() => {
                // Update source and remove fade-out class
                mainImg.src = newImage.src;
                mainImg.classList.remove('fade-out');
            }, 500); // Match this with CSS transition duration
        }, 5000); // Change image every 5 seconds
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        this.currentImageIndex = 0;
        
        // Update current image immediately
        const mainImg = document.querySelector('.about-img.main-img');
        if (mainImg) {
            mainImg.src = translations[this.currentLang].about.images[this.currentImageIndex];
        }
        
        // Restart slideshow with new language
        this.startSlideshow();
    }
} 