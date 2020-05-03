'use strict';
(function() {
  // слайдер Стихи и цитаты о войне
  var slideIndex = 1;
  var slides = document.querySelectorAll('.slider__item');
  var prev = document.querySelector('.slider__button--prev');
  var next = document.querySelector('.slider__button--next');
  var sliderDotsWrapper = document.querySelector('.slider__dots-wrapper');
  var dots = document.querySelectorAll('.slider__dot');

  var showSlides = function(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    };

    for (var j = 0; j < dots.length; j++) {
      dots[j].classList.remove('slider__dot--active');
    };

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('slider__dot--active');
  };

  showSlides(slideIndex);

  var plusSlides = function(n) {
    showSlides(slideIndex += n)
  };

  var currentSlide = function(n) {
    showSlides(slideIndex = n)
  };

  prev.addEventListener('click', function() {
    plusSlides(-1);
  });

  next.addEventListener('click', function() {
    plusSlides(1);
  });

  sliderDotsWrapper.addEventListener('click', function(evt) {
    for (var i = 0; i < dots.length + 1; i++) {
      if (evt.target.classList.contains('slider__dot') && evt.target === dots[i - 1]) {
        currentSlide(i);
      }
    }
  });

})();