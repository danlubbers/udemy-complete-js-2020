'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // prevents page from jumping to the top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++) {
//   btnsOpenModal[i].addEventListener('click', openModal);
// }

// Rewritten to ES6 instead of using For Loop
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/** SELECTING, CREATING, DELETING ELEMENTS **/
// console.log(document.documentElement); // selection of the entire html page
// console.log(document.head); // selection of the head
// console.log(document.body); // selection of the body

const header = document.querySelector('.header'); // first element found
const allSections = document.querySelectorAll('.section'); // returns a node list of all elements

// console.log(allSections);

document.getElementById('section--1'); // only by ID
const allBtns = document.getElementsByTagName('button'); // returns an HTMLCollection of all elements with name of button
// console.log(allBtns);

document.getElementsByClassName('btn'); // returns an HTMLCollection

// Creating and inserting elements programmatically
const message = document.createElement('div');
message.classList.add('cookie-message');
// postMessage.textContent = 'We used cookies for improved functionality.';
message.innerHTML =
  'We use cookies for improved functionality. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message); // first child
header.append(message); // last child

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // message.parentElement.removeChild(message) // old way of removing elements
});

/*** STYLES, ATTRIBUTES and CLASSES ***/

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(getComputedStyle(message).color); // get css styles that are not in-line

// use Number.parseFloat to get rid to extract number and get rid of px so we can add it to 40 + px
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src); // absolute path
// console.log(logo.className);

// Setting
logo.alt = 'Beautiful minimalist logo';

// Non-standard attributes
// console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
// console.log(logo.getAttribute('src')); // relative path

const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // absolute path
// console.log(link.getAttribute('href')); // relative path

// Data attributes
// console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'd');
logo.classList.remove('c', 'g');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use
logo.className = 'jonas';

/*** SMOOTH SCROLLING ***/
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1Coordinates = section1.getBoundingClientRect();
  console.log(s1Coordinates);

  // console.log(e.target.getBoundingClientRect());
  // console.log(
  //   'Current Scroll Position:',
  //   window.pageXOffset,
  //   window.pageYOffset
  // );

  // console.log(
  //   'Height/Width of ViewPort:',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // First way
  // window.scrollTo(
  //   // current position + current scroll
  //   s1Coordinates.left + window.pageXOffset,
  //   s1Coordinates.top + window.pageYOffset // have to add pageXoffset to find absolute position of element relative to the document
  // );

  // Second Way
  // window.scrollTo({
  //   left: s1Coordinates.left + window.pageXOffset,
  //   top: s1Coordinates.top + window.pageYOffset,
  //   behavior: 'smooth', // How to implement smooth scrolling
  // });

  // Third way: Most modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

/*** Types of Events and Event Handlers ***/

const h1 = document.querySelector('h1');

const alertH1 = e => {
  alert('Hit!');

  // Only listen to the event onces
  h1.removeEventListener('mouseenter', alertH1);
};

// Modern way
// h1.addEventListener('mouseenter', alertH1);

// old way of listening for events
h1.onmouseenter = () => {
  // console.log('hitting again');
};

/*** EVENT PROPOGATION ***/
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  // Stop Propogation
  // e.stopPropagation();
});
