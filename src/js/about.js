import { translations } from './translations.js';
import { imageConfigs } from './about-image-config.js';

export class AboutSection {
    constructor() {
        this.slideshow = null;
        this.init();
    }

    init() {
        this.initSlideshow();
    }

    initSlideshow() {
        this.slideshow = new ImageSlideshow();
    }

    updateLanguage(lang) {
        if (this.slideshow) {
            this.slideshow.updateLanguage(lang);
        }
    }
}

class ImageSlideshow {
    constructor() {
        this.currentImageIndex = 0;
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

            this.currentImageIndex = (this.currentImageIndex + 1) % imageConfigs.about.images.length;
            
            // Create new image element
            const newImage = new Image();
            newImage.src = imageConfigs.about.images[this.currentImageIndex];
            
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
        this.currentImageIndex = 0;
        
        // Update current image immediately
        const mainImg = document.querySelector('.about-img.main-img');
        const secondaryImg = document.querySelector('.about-img.secondary-img');
        
        if (mainImg) {
            mainImg.src = imageConfigs.about.images[this.currentImageIndex];
        }
        
        if (secondaryImg) {
            secondaryImg.src = imageConfigs.about.secondaryImage;
        }
        
        // Restart slideshow with new language
        this.startSlideshow();
    }
} 