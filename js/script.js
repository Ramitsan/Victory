'use strict';
(() => {
  //кнопка прокрутки
  const upButton = document.querySelector('.up-button');
  const scrollHeight = 800;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > scrollHeight) {
      upButton.classList.add('shown');
    } else {
      upButton.classList.remove('shown');
    }
  });

  upButton.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });


  //полноэкранный просмотр изображений
  const previewList = document.querySelectorAll('.js-preview');
  const ESC_KEYCODE = 27;
  let overlay;
  let buttonClose;


  previewList.forEach((preview) => {
    preview.addEventListener('click', (e) => {
      e.preventDefault();
      openBigPicture(preview);
    });
  });

  const openBigPicture = (preview) => {
    let coverImageElement;

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

    coverImageElement.onload = () => {
      overlay.appendChild(coverImageElement)
    };

    overlay.addEventListener('click', closeBigPicture);
    buttonClose.addEventListener('click', closeBigPicture);
  };

  const closeBigPicture = (e) => {
    if (e.target === overlay || e.target === buttonClose) {
      overlay.remove();
      buttonClose.remove();
      overlay.removeEventListener('click', closeBigPicture);
      buttonClose.removeEventListener('click', closeBigPicture);
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === ESC_KEYCODE) {
      overlay.remove();
      buttonClose.remove();
      overlay.removeEventListener('click', closeBigPicture);
      buttonClose.removeEventListener('click', closeBigPicture);
    }
  });

  const createOverlay = () => {
    let overlayElement = document.createElement('div');
    overlayElement.classList.add('overlay');
    return overlayElement;
  }

  const createButtonClose = () => {
    let buttonElement = document.createElement('button');
    buttonElement.classList.add('button--close');
    return buttonElement;
  }

})();