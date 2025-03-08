export class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Initialize theme
        this.setTheme(this.darkThemeMq.matches ? 'dark' : 'light');
        
        // Listen for system theme changes
        this.darkThemeMq.addEventListener('change', (e) => {
            this.setTheme(e.matches ? 'dark' : 'light');
        });
        
        // Listen for manual theme toggle
        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
} 