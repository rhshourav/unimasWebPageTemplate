export class MobileNavigation {
    constructor() {
        this.hamburger = null;
        this.navLinks = null;
        this.navControls = null;
        this.overlay = null;
        this.isOpen = false;
    }

    init() {
        this.createOverlay();
        this.setupHamburger();
        this.setupEventListeners();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'mobile-overlay';
        document.body.appendChild(this.overlay);
    }

    setupHamburger() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.navControls = document.querySelector('.nav-controls');
    }

    setupEventListeners() {
        // Hamburger click
        this.hamburger.addEventListener('click', () => this.toggleMenu());

        // Overlay click
        this.overlay.addEventListener('click', () => this.closeMenu());

        // Close menu when clicking a link
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.hamburger.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        this.navControls.classList.toggle('active');
        this.overlay.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMenu() {
        if (this.isOpen) {
            this.isOpen = false;
            this.hamburger.classList.remove('active');
            this.navLinks.classList.remove('active');
            this.navControls.classList.remove('active');
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
} 