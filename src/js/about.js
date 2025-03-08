import { translations } from './translations.js';
import { imageConfigs } from './about-image-config.js';
import { CounterAnimation } from './counter-animation.js';

export class AboutSection {
    constructor() {
        this.slideshow = null;
        this.counterAnimation = null;
        this.init();
    }

    init() {
        this.initSlideshow();
        this.initCounterAnimation();
    }

    initSlideshow() {
        this.slideshow = new ImageSlideshow();
    }

    initCounterAnimation() {
        this.counterAnimation = new CounterAnimation();
    }

    updateLanguage(lang) {
        if (this.slideshow) {
            this.slideshow.updateLanguage(lang);
        }
    }
}

class ImageSlideshow {
    constructor() {
        this.mainImageIndex = 0;
        this.secondaryImageIndex = 0;
        this.mainIntervalId = null;
        this.secondaryIntervalId = null;
        this.init();
    }

    init() {
        this.startSlideshow();
    }

    startSlideshow() {
        // Clear any existing intervals
        if (this.mainIntervalId) {
            clearInterval(this.mainIntervalId);
        }
        if (this.secondaryIntervalId) {
            clearInterval(this.secondaryIntervalId);
        }

        // Start main image interval
        this.mainIntervalId = setInterval(() => {
            const mainImg = document.querySelector('.about-img.main-img');
            if (!mainImg) return;

            this.mainImageIndex = (this.mainImageIndex + 1) % imageConfigs.about.images.length;
            
            // Create new image element
            const newImage = new Image();
            newImage.src = imageConfigs.about.images[this.mainImageIndex];
            
            // Add fade-out class to current image
            mainImg.classList.add('fade-out');
            
            // Wait for fade out animation
            setTimeout(() => {
                // Update source and remove fade-out class
                mainImg.src = newImage.src;
                mainImg.classList.remove('fade-out');
            }, 500); // Match this with CSS transition duration
        }, 5000); // Change image every 5 seconds

        // Start secondary image interval with offset
        setTimeout(() => {
            this.secondaryIntervalId = setInterval(() => {
                const secondaryImg = document.querySelector('.about-img.secondary-img');
                if (!secondaryImg) return;

                this.secondaryImageIndex = (this.secondaryImageIndex + 1) % imageConfigs.about.secondaryImages.length;
                
                // Create new image element
                const newImage = new Image();
                newImage.src = imageConfigs.about.secondaryImages[this.secondaryImageIndex];
                
                // Add fade-out class to current image
                secondaryImg.classList.add('fade-out');
                
                // Wait for fade out animation
                setTimeout(() => {
                    // Update source and remove fade-out class
                    secondaryImg.src = newImage.src;
                    secondaryImg.classList.remove('fade-out');
                }, 500); // Match this with CSS transition duration
            }, 5000); // Change image every 5 seconds
        }, 2500); // Start with 2.5s offset for better visual effect
    }

    updateLanguage(lang) {
        this.mainImageIndex = 0;
        this.secondaryImageIndex = 0;
        
        // Update current images immediately
        const mainImg = document.querySelector('.about-img.main-img');
        const secondaryImg = document.querySelector('.about-img.secondary-img');
        
        if (mainImg) {
            mainImg.src = imageConfigs.about.images[this.mainImageIndex];
        }
        
        if (secondaryImg) {
            secondaryImg.src = imageConfigs.about.secondaryImages[this.secondaryImageIndex];
        }
        
        // Restart slideshow
        this.startSlideshow();
    }
} 