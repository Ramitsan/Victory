'use strict';
//кнопка прокрутки
var upButton = document.querySelector('.up-button');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 800) {
    upButton.classList.add('shown');
  } else {
    upButton.classList.remove('shown');
  }
});

upButton.addEventListener('click', function() {
  window.scrollTo(0, 0);
});


//полноэкранный просмотр изображений
var previewList = document.querySelectorAll('.js-preview');
var overlay;

previewList.forEach(function(preview) {
  preview.addEventListener('click', function(e) {
    e.preventDefault();
    openBigPicture(preview);
  });
});

var openBigPicture = function(preview) {
  var coverImageElement;

  if (preview.hasAttribute('data-preview')) {
    coverImageElement = document.createElement('img');
    coverImageElement.src = preview.getAttribute('data-preview');
    coverImageElement.style.border = '10px solid #ffffff';
  } else {
    coverImageElement = preview.cloneNode(true);
  }

  overlay = createOverlay();
  document.body.appendChild(overlay);

  coverImageElement.onload = function() {
    overlay.appendChild(coverImageElement);
  };

  overlay.addEventListener('click', closeBigPicture)
};

var closeBigPicture = function(e) {
  if (e.target === overlay) {
    e.target.remove();
    overlay.removeEventListener('click', closeBigPicture);
  }
};

var createOverlay = function() {
  var overlayElement = document.createElement('div');
  overlayElement.style.position = 'fixed';
  overlayElement.style.backgroundColor = 'rgba(0,0,0,0.8)';
  overlayElement.style.left = 0;
  overlayElement.style.top = 0;
  overlayElement.style.right = 0;
  overlayElement.style.bottom = 0;
  overlayElement.style.zIndex = 99;
  overlayElement.style.display = 'flex';
  overlayElement.style.alignItems = 'center';
  overlayElement.style.justifyContent = 'center';
  return overlayElement;
}