// animations.js
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in-left, .slide-in-right');
    const scalers = document.querySelectorAll('.scale-in');
    const staggers = document.querySelectorAll('.stagger-fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(
        function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, 
        appearOptions
    );

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    scalers.forEach(scaler => {
        appearOnScroll.observe(scaler);
    });

    staggers.forEach(stagger => {
        appearOnScroll.observe(stagger);
    });
});

//animatie piesa lego
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const legoPiece = document.querySelector('.lego-piece-3d');
    
    // Limitele de rotație
    const maxRotation = 50;
    
    hero.addEventListener('mousemove', (e) => {
        if (!legoPiece) return;
        
        // Calculăm poziția relativă a mouse-ului în hero section
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convertim poziția în procente (-1 la 1)
        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;
        
        // Calculăm rotația
        const rotateY = xPercent * maxRotation;
        const rotateX = -yPercent * maxRotation;
        
        // Aplicăm transformarea
        legoPiece.style.transform = `
            translateY(-50%)
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
        `;
    });
    
    // Reset la poziția inițială când mouse-ul părăsește secțiunea
    hero.addEventListener('mouseleave', () => {
        if (!legoPiece) return;
        
        legoPiece.style.transform = `
            translateY(-50%)
            rotateY(0deg)
            rotateX(0deg)
        `;
    });
});
