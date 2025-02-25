// LED Grid Animation
document.addEventListener('DOMContentLoaded', () => {
    const leds = document.querySelectorAll('.led-grid .led');
    
    // Pattern-uri pentru afișare
    const patterns = {
        random: () => {
            return Array(25).fill(0).map(() => Math.random() > 0.5 ? 1 : 0);
        },
        smiley: [
            0, 0, 0, 0, 0,
            0, 1, 0, 1, 0,
            0, 0, 0, 0, 0,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0
        ],
        heart: [
            0, 1, 0, 1, 0,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            0, 1, 1, 1, 0,
            0, 0, 1, 0, 0
        ],
        arrow: [
            0, 0, 1, 0, 0,
            0, 1, 1, 1, 0,
            1, 0, 1, 0, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ]
    };

    // Funcție pentru aplicarea unui pattern
    function applyPattern(pattern) {
        const ledStates = typeof pattern === 'function' ? pattern() : pattern;
        leds.forEach((led, index) => {
            led.dataset.state = ledStates[index].toString();
        });
    }

    // Secvența de pattern-uri pentru animație
    const patternSequence = ['random', 'smiley', 'heart', 'arrow'];
    let currentPatternIndex = 0;

    // Funcție pentru actualizarea pattern-ului curent
    function updatePattern() {
        const currentPattern = patterns[patternSequence[currentPatternIndex]];
        applyPattern(currentPattern);
        currentPatternIndex = (currentPatternIndex + 1) % patternSequence.length;
    }

    // Pornește animația și o repetă la fiecare 3 secunde
    updatePattern(); // Aplică primul pattern imediat
    setInterval(updatePattern, 3000);

    // Animație pentru timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left') ? 
            'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.5s ease-out';
        timelineObserver.observe(item);
    });

    // Animație pentru cardurile de feature-uri
    const featureCards = document.querySelectorAll('.feature-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        cardObserver.observe(card);
    });

    // Efect de parallax pentru hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        }
    });

    // Animație pentru butonul CTA
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-5px)';
        });

        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0)';
        });
    }

    // Smooth scroll pentru link-uri de navigare
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});