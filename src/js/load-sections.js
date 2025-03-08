export class SectionLoader {
    static async loadSection(templateId, filePath) {
        try {
            const response = await fetch(filePath);
            const html = await response.text();
            
            const template = document.getElementById(templateId);
            if (template) {
                template.insertAdjacentHTML('afterend', html);
            }
        } catch (error) {
            console.error(`Error loading section from ${filePath}:`, error);
        }
    }
} 