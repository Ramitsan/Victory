'use strict';
(() => {
  // слайдер Стихи и цитаты о войне
  const slides = document.querySelectorAll('.slider__item');
  const prev = document.querySelector('.slider__button--prev');
  const next = document.querySelector('.slider__button--next');
  const sliderDotsWrapper = document.querySelector('.slider__dots-wrapper');
  const dots = document.querySelectorAll('.slider__dot');
  let slideIndex = 1;

  const showSlides = (n) => {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    };

    for (let j = 0; j < dots.length; j++) {
      dots[j].classList.remove('slider__dot--active');
    };

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('slider__dot--active');
  };

  showSlides(slideIndex);

  const plusSlides = (n) => {
    showSlides(slideIndex += n)
  };

  const currentSlide = (n) => {
    showSlides(slideIndex = n)
  };

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });

  next.addEventListener('click', () => {
    plusSlides(1);
  });

  sliderDotsWrapper.addEventListener('click', (evt) => {
    for (let i = 0; i < dots.length + 1; i++) {
      if (evt.target.classList.contains('slider__dot') && evt.target === dots[i - 1]) {
        currentSlide(i);
      }
    }
  });

})();