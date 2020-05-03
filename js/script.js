'use strict';
(function() {
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
  var buttonClose;
  var ESC_KEYCODE = 27;

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
    buttonClose = createButtonClose();
    document.body.appendChild(overlay);
    document.body.appendChild(buttonClose);

    coverImageElement.onload = function() {
      overlay.appendChild(coverImageElement)
    };

    overlay.addEventListener('click', closeBigPicture);
    buttonClose.addEventListener('click', closeBigPicture);
  };

  var closeBigPicture = function(e) {
    if (e.target === overlay || e.target === buttonClose) {
      // e.target.remove();
      overlay.remove();
      buttonClose.remove();
      overlay.removeEventListener('click', closeBigPicture);
      buttonClose.removeEventListener('click', closeBigPicture);
    }
  };

  window.addEventListener('keydown', function(e) {
    if (e.keyCode === ESC_KEYCODE) {
      overlay.remove();
      buttonClose.remove();
      overlay.removeEventListener('click', closeBigPicture);
      buttonClose.removeEventListener('click', closeBigPicture);
    }
  });

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

  var createButtonClose = function() {
    var buttonElement = document.createElement('button');
    buttonElement.style.position = 'fixed';
    buttonElement.style.backgroundColor = 'transparent';
    buttonElement.style.right = '5%';
    buttonElement.style.top = '5%';
    buttonElement.style.width = '30px';
    buttonElement.style.height = '30px';
    buttonElement.style.display = 'block';
    buttonElement.style.border = '1px solid transparent';
    buttonElement.style.backgroundImage = 'url(img/close-button.svg)';
    buttonElement.style.backgroundPosition = 'center';
    buttonElement.style.backgroundRepeat = 'no-repeat';
    buttonElement.style.cursor = 'pointer';
    buttonElement.style.zIndex = 100;
    return buttonElement;
  }

})();