export class CounterAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Set up Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statContent = entry.target;
                        const targetNumber = this.parseNumber(statContent.querySelector('h3').textContent);
                        this.animateValue(statContent.querySelector('h3'), 0, targetNumber, 2000);
                        observer.unobserve(statContent);
                    }
                });
            },
            { threshold: 0.5 }
        );

        // Observe all stat content elements
        document.querySelectorAll('.stat-content').forEach(content => {
            observer.observe(content);
        });
    }

    parseNumber(text) {
        // Remove any non-numeric characters except decimal points and plus signs
        const numStr = text.replace(/[^\d.+]/g, '');
        return parseFloat(numStr);
    }

    animateValue(element, start, end, duration) {
        const originalText = element.textContent;
        const hasPlus = originalText.includes('+');
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentNumber = Math.floor(progress * (end - start) + start);
            
            element.textContent = currentNumber + (hasPlus ? '+' : '');

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }
} 