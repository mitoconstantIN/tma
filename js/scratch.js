document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Adăugăm visible și la conținutul din interior pentru CTA
                if (entry.target.classList.contains('cta-section')) {
                    entry.target.querySelector('.cta-content').classList.add('visible');
                }
                
                if (entry.target.classList.contains('animate-once')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Elementele care trebuie observate
    const elementsToObserve = [
        '.intro-text',
        '.approach',
        '.feature-box',
        '.age-group',
        '.skill-card',
        '.project-card',
        '.why-us',
        '.cta-section'
    ];

    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            observer.observe(element);
        });
    });
});