// courses.js - JavaScript comun pentru toate paginile de cursuri

class CourseAnimations {
    constructor() {
        this.initScrollAnimations();
        this.initSkillCards();
        this.initSmoothScroll();
        this.initProjectCards();
        this.initParallax();
        this.initNavigationHighlight();
        this.initImageLoading();
        this.createParticles();
    }

    // Animații la scroll
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('animate-once')) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Adaugă elementele pentru animație
        const animatedElements = document.querySelectorAll('.skill-card, .project-card, .feature-card, .age-group, .learning-card');
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Animații pentru skill cards
    initSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const progress = card.querySelector('.skill-progress');
                if (progress) progress.style.transform = 'scaleX(1)';
            });

            card.addEventListener('mouseleave', () => {
                const progress = card.querySelector('.skill-progress');
                if (progress) progress.style.transform = 'scaleX(0)';
            });
        });
    }

    // Smooth scroll pentru anchor links
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Hover effects pentru project cards
    initProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Parallax effect pentru hero section
    initParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
            });
        }
    }

    // Navigation highlight la scroll
    initNavigationHighlight() {
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`a[href="#${sectionId}"]`);

                if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else if (navLink) {
                    navLink.classList.remove('active');
                }
            });
        });
    }

    // Loading animation pentru imagini
    initImageLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }

    // Particles effect pentru hero section
    createParticles() {
        const heroSection = document.querySelector('.course-hero');
        if (!heroSection) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--speed', Math.random() * 3 + 1 + 's');
            particle.style.setProperty('--size', Math.random() * 10 + 5 + 'px');
            particle.style.left = Math.random() * 100 + 'vw';
            heroSection.appendChild(particle);
        }
    }

    // Utilitar pentru animarea numerelor
    static animateNumber(element, final, duration = 2000) {
        let start = 0;
        const increment = Math.ceil(final / (duration / 16));
        const timer = setInterval(() => {
            start += increment;
            if (start > final) {
                element.textContent = final;
                clearInterval(timer);
            } else {
                element.textContent = start;
            }
        }, 16);
    }
}

// Inițializare când DOM-ul e încărcat
document.addEventListener('DOMContentLoaded', () => {
    new CourseAnimations();
});