'use strict';

var USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var USER_NAMES = ['Артем', 'Петр', 'Светлана', 'Елена', 'Сергей'];

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandomValue = function (min, max, step) {
  var res = (Math.floor(Math.random() * (max - min + step) / step)) * step + min;

  return Number(res.toFixed(10));
};

var getPhotoNumbers = function (number) {
  var arr = [];
  var value = 0;

  for (var i = 0; i < number; i++) {
    value = getRandomValue(1, number, 1);

    while (arr.indexOf(value) !== -1) {
      value = getRandomValue(1, number, 1);
    }

    arr.push(value);
  }

  return arr;
};

var createUserComments = function (number) {
  var arr = [];
  for (var i = 0; i < number; i++) {
    arr.push(
        {
          avatar: 'img/avatar-' + getRandomValue(1, USER_NAMES.length, 1) + '.svg',
          message: getRandomValue(0, USER_COMMENTS.length - 1, 1),
          name: getRandomValue(0, USER_NAMES.length - 1, 1),
        }
    );
  }

  return arr;
};

var createArrayObjects = function (number) {
  var arr = [];
  var photoNumbers = getPhotoNumbers(number);

  for (var i = 0; i < number; i++) {
    arr.push(
        {
          url: 'photos/' + photoNumbers[i] + '.jpg',
          likes: getRandomValue(15, 200, 1),
          comments: createUserComments(getRandomValue(1, 6, 1))
        }
    );
  }

  return arr;
};

var arrayPhotos = createArrayObjects(25);

var renderPhoto = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < arrayPhotos.length; i++) {
  fragment.appendChild(renderPhoto(arrayPhotos[i]));
}

pictures.appendChild(fragment);
