document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    
    let currentIndex = 0;
    
    function getSlidesToShow() {
        if (window.innerWidth > 1024) return 3;
        if (window.innerWidth > 768) return 2;
        return 1;
    }
    
    function updateCarousel() {
        const slidesToShow = getSlidesToShow();
        const slideWidth = 100 / slidesToShow;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Actualizare stare butoane
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= slides.length - slidesToShow ? '0.5' : '1';
    }

    nextButton.addEventListener('click', () => {
        const slidesToShow = getSlidesToShow();
        if (currentIndex < slides.length - slidesToShow) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Responsive handling
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });

    // Inițializare
    updateCarousel();
});