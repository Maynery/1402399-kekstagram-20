var similarListElement = document.querySelector('.pictures');
var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var fragment = document.createDocumentFragment();

var COMMENTS_NAMES = ['Рудольф', 'Илья', 'Тимофей', 'Игорь', 'Кекс', 'Гоша', 'Петя'];
var COMMENTS_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTOS_QUANTITY = 25;
var MAX_COMMENTS = 99;
var MINIMUM_COMMENTS_QUANTITY = 0;

var MINIMUM_AVATAR_INDEX = 1;
var MAXIMUM_AVATAR_INDEX = 6;

var MINIMUM_LIKES_INDEX = 15;
var MAXIMUM_LIKES_INDEX = 200;

var getRandomNumberInRange = function (min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

var generateComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomNumberInRange(MINIMUM_AVATAR_INDEX, MAXIMUM_AVATAR_INDEX) + '.svg',
    message: getRandomElement(COMMENTS_MESSAGES),
    name: getRandomElement(COMMENTS_NAMES)
  };

  return comment;
};

var generateComments = function () {
  var randomCommentQuantity = getRandomNumberInRange(MINIMUM_COMMENTS_QUANTITY, MAX_COMMENTS);
  var comments = [];

  for (var i = MINIMUM_COMMENTS_QUANTITY; i < randomCommentQuantity; i++) {
    comments.push(generateComment());
  }

  return comments;
};

var createPhoto = function (index) {
  var photo = {
    url: 'photos/' + index + '.jpg',
    description: 'Описание',
    likes: getRandomNumberInRange(MINIMUM_LIKES_INDEX, MAXIMUM_LIKES_INDEX),
    comments: generateComments()
  };

  return photo;
};

var createPhotos = function () {
  var photos = [];

  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    photos.push(createPhoto(i + 1));
  }

  return photos;
};

var newPhotos = createPhotos();

var renderPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('img').alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  fragment.appendChild(photoElement);
};

for (var i = 0; i < newPhotos.length; i++) {
  renderPhoto(newPhotos[i]);
}

similarListElement.appendChild(fragment);


var bigPicture = document.querySelectorAll('.big-picture');

var firstItem = contentItems[0];


var replaceElementContent = function (element, newContent) {
  while (element.firstChild) {
    element.lastChild.remove();
  }
  element.appendChild(newContent);
};

var getCommentsTemplate = function (picture, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picture.comments.length; i++) {
    var commentsItem = template.cloneNode(true);
    commentsItem.querySelector('.social__picture').src = picture.comments[i].avatar;
    commentsItem.querySelector('.social__picture').alt = picture.comments[i].name;
    commentsItem.querySelector('.social__text').textContent = picture.comments[i].message;
    fragment.appendChild(commentsItem);
  }
  return fragment;
};

var renderSelectedItem = function (picture) {
  var commentsTemplate = document.querySelector('.social__comment');
  var socialCommentsList = document.querySelector('.social__comments');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  var comments = getCommentsTemplate(picture, commentsTemplate);

  replaceElementContent(socialCommentsList, comments);
};

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

renderSelectedItem(firstItem);