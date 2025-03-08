export class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Initialize theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme(this.darkThemeMq.matches ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        this.darkThemeMq.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {  // Only follow system if no manual preference
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Listen for manual theme toggle
        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button class
        this.themeToggle.classList.toggle('dark-mode', theme === 'dark');
    }
} 