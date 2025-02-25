// Funcție pentru sistemul de particule Minecraft
function createMinecraftParticles() {
    const particleContainer = document.querySelector('.minecraft-particles');
    if (!particleContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomizăm tipul particulei
        const particleTypes = ['normal', 'xp', 'diamond'];
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        if (type === 'xp') particle.classList.add('xp');
        if (type === 'diamond') particle.classList.add('diamond');

        // Poziție random pe axa X
        const startX = Math.random() * window.innerWidth;
        particle.style.left = `${startX}px`;
        particle.style.bottom = '0';

        // Offset random pentru mișcare
        const xOffset = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--x-offset', `${xOffset}px`);

        particle.classList.add('particle-animated');
        particleContainer.appendChild(particle);

        // Curățăm particula după ce animația e gata
        setTimeout(() => {
            particleContainer.removeChild(particle);
        }, 2000);
    }

    // Creăm particule la intervale regulate
    setInterval(createParticle, 100);

    // Creăm mai multe particule când hover pe hero section
    particleContainer.parentElement.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) {  // 20% șansă de a crea particulă la mișcare
            const particle = document.createElement('div');
            particle.className = 'particle particle-animated';
            particle.style.left = `${e.pageX}px`;
            particle.style.top = `${e.pageY}px`;
            particleContainer.appendChild(particle);

            setTimeout(() => {
                particleContainer.removeChild(particle);
            }, 2000);
        }
    });
}

// Inițializare când DOM-ul e încărcat
document.addEventListener('DOMContentLoaded', createMinecraftParticles);