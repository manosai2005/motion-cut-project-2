let slideIndex = 0;
let autoSlideInterval;

const slides = document.querySelectorAll('.slide');
const thumbnails = document.querySelectorAll('.thumbnail');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// Function to move to a specific slide
function moveToSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        thumbnails[i].classList.remove('active');
    });

    slides[index].classList.add('active');
    thumbnails[index].classList.add('active');
    slideIndex = index;
}

// Next Slide
nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    moveToSlide(slideIndex);
});

// Previous Slide
prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    moveToSlide(slideIndex);
});

// Auto-slide Function
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        moveToSlide(slideIndex);
    }, 4000);
}

// Stop Auto-slide when user interacts
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Touch and Swipe Support
let startX = 0;
document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAutoSlide();
});

document.querySelector('.slider-container').addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        slideIndex = (slideIndex + 1) % slides.length;
    } else if (startX < endX - 50) {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    }
    moveToSlide(slideIndex);
    startAutoSlide();
});

// Start the slider
moveToSlide(0);
startAutoSlide();
