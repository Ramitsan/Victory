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
//  получаем все элементы изображений книг
var previewList = document.querySelectorAll('.js-preview');
// заводим переменную под overlay, она пригодится позже
var overlay;

// В цикле бежим по всем bookWrapList
previewList.forEach(function(preview) {

  // Для каждого вешаем слушаетль на клик
  preview.addEventListener('click', function(e) {
    e.preventDefault();
    // Вызываем функцию отькрытия большой картинки
    openBigPicture(preview);
  });
});

// функция открытия большой картинки
var openBigPicture = function(preview) {
  // Переменная под клон или новый элемент изображения
  var coverImageElement;

  // Здесь вилка. Можем использовать как на прямую тег src, так и через атрибут data-preview
  // Указывать нужно путь как и в SRC
  // 1) Создаем новый элемент IMG и вставляем в него изображение из data-preview
  if (preview.hasAttribute('data-preview')) {
    coverImageElement = document.createElement('img');
    coverImageElement.src = preview.getAttribute('data-preview');
    coverImageElement.style.border = '10px solid #ffffff';
  } else {
    // 2) Здесь просто клонируем элемент из существуещего src
    coverImageElement = preview.cloneNode(true);
  }

  // Создаем и вставляем оверлей
  overlay = createOverlay();
  document.body.appendChild(overlay);

  // Эта функция-фича для отображения картинки только после загрузки. При желании можно повесить прелоадер
  coverImageElement.onload = function() {
    overlay.appendChild(coverImageElement);
  };

  overlay.addEventListener('click', closeBigPicture)
};

// Колбек на закрытие
var closeBigPicture = function(e) {
  if (e.target === overlay) {
    e.target.remove();
    overlay.removeEventListener('click', closeBigPicture);
  }
};

// Функция создания оверлея
// Оверлей создается динамически
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