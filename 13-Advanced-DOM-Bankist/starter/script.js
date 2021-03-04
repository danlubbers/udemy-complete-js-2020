'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

/*** SMOOTH SCROLLING ***/
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

/*** EVENT DELEGATION ***/
// Page Navigation "without" Event Delegation
// This way attaches the function to each element. If there were thousands, this is not efficient. This is why we use Event Delegation instead ( example below ).
// document.querySelectorAll('.nav__link').forEach(el => {
//   return el.addEventListener('click', function (e) {
//     e.preventDefault(); // prevents html # scrolling to id

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// *** USE THIS WAY ***
// Page Navigation with Event Delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target); // This shows us where the event began
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/*** TABBED COMPONENT ***/

// Use Event Delegation to select tabs and add click event
tabsContainer.addEventListener('click', function (e) {
  const btnClicked = e.target.closest('.operations__tab'); // use closest so it doesn't matter if we click the button or the nested span inside the button
  // console.log(btnClicked);

  if (!btnClicked) return; // guard clause for Error log of classList of "nulls"

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active')); // clears the class on all tabs
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  // Add active class
  btnClicked.classList.add('operations__tab--active'); // class to the one user clicked

  // Activate content area
  document
    .querySelector(`.operations__content--${btnClicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/*** PASSING ARGUMENTS TO EVENT HANDLERS ***/

// Menu Fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this; // this is now opacity coming from bind
      }
      logo.style.opacity = this;
    });
  }
};
// Passing an "arguement" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/*** STICKY NAVIGATION ***/
const initialCoords = section1.getBoundingClientRect();

// This is not a good way to do a scroll event. Scrolling fires all the time decreasing performance.
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

/*** STICKY NAVIGATION: INTERSECTION OBSERVER API ***/

// const observerCB = (entries, observer) => {
//   entries.forEach(entry => console.log(entry));
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCB, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header'); // first element found
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries; // destructuring to get first entry out of entries
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // when 0 percent of the header is visible, do this...
  rootMargin: `-${navHeight}px`, // adjusting the margin
});
headerObserver.observe(header);

/*** REVEALING ELEMENTS ON SCROLL ***/
const allSections = document.querySelectorAll('.section'); // returns a node list of all elements
const revealSection = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // performance enhancement: Don't need to keep observing once sections have already been observed
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/*** LAZY LOADING IMAGES ***/
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // If we don't use load event, blur filter gets removed immediately and slower connections will see the pixelated image
  entry.target.addEventListener('load', () => {
    // Remove class with blur only after image is loaded now
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // load 200px before we reach each image
});

imgTargets.forEach(img => imgObserver.observe(img));

/*** SLIDER FUNCTIONALITY ***/

const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS
  const createDots = () => {
    slides.forEach((_, idx) => {
      // create html element as the last child
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${idx}"></button>`
      );
    });
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = curSlide => {
    slides.forEach(
      (slide, idx) =>
        (slide.style.transform = `translateX(${100 * (idx - curSlide)}%)`)
      // curSlide = 1: -100%, 0%, 100%, 200% ...
    );
  };

  // Next Slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Prev Slide
  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0); // starts at slide 0
    createDots();
    activateDot(0);
  };

  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Slide using Keyboard
  document.addEventListener('keydown', e => {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////////////////////////////////////////////

/** SELECTING, CREATING, DELETING ELEMENTS **/
// console.log(document.documentElement); // selection of the entire html page
// console.log(document.head); // selection of the head
// console.log(document.body); // selection of the body

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
// logo.className = 'jonas';

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
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();

//   // Stop Propogation
//   // e.stopPropagation();
// });

/*** DOM TRAVERSING ***/

// Going downwards: Selecting child elements
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // NodeList
// console.log(h1.children); // HTMLCollection: only works for direct children
// // h1.firstElementChild.style.color = 'orangered';
// // h1.lastElementChild.style.color = 'blue';

// // Going upwards: Selecting parent elements
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // h1.closest('.header').style.background = 'var(--gradient-secondary)';
// // h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: Siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children); // gets parent element and all siblings including itself 'h1'

// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

/*** LIFECYCLE DOME EVENTS ***/
document.addEventListener('DOMContentLoaded', e =>
  console.log('HTML parsed and dom tree built', e)
);

window.addEventListener('load', e => console.log('Page fully loaded', e));

// Asks if you want to leave the site
// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
