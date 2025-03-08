export class BackgroundSlider {
    constructor(images, containerSelector = '.hero-slider', interval = 5000) {
        this.images = images;
        this.currentSlide = 0;
        this.container = document.querySelector(containerSelector);
        this.interval = interval;
        this.init();
    }

    init() {
        // Create slides
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url(${image})`;
            this.container.appendChild(slide);
        });

        // Start the slideshow
        this.startSlideshow();
    }

    changeSlide() {
        const slides = document.querySelectorAll('.slide');
        slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        slides[this.currentSlide].classList.add('active');
    }

    startSlideshow() {
        setInterval(() => this.changeSlide(), this.interval);
    }
} 