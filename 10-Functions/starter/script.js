'use strict';

/*** Default Parameters ***/
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers // you can use previous parameter as a variable
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  // console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', undefined, 1000); // used undefined to skip a default parameter

/*** Passing Arguements: Value vs. Reference ***/
const flight = 'LH234'; // primitive
const dan = {
  name: 'Dan Lubbers',
  passport: 98732958734098,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH789'; // does nothing to variable flight as flightNum is a copy not a reference
  passenger.name = 'Mr. ' + passenger.name; // exactly same as manipulating object

  if (passenger.passport === 98732958734098) {
    alert('Checked In');
  } else {
    alert('Wrong Passport');
  }
};

// checkIn(flight, dan); // flight being passed in is a copy as flightNum ( different variable )
// console.log(flight); // Which is why it's still LH234
// console.log(dan); // dan object is passed as a reference object in memory heap

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(dan);
// console.log(dan.passport);
// checkIn(flight, dan);

/**** Higher order functions ****/

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...rest] = str.split(' ');
  return [firstWord.toUpperCase(), ...rest].join(' ');
};

// This is the HOF
const transformer = function (str, fn) {
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Function Name: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const highFive = function () {
  console.log('*** highfive ***');
};

// document.body.addEventListener('click', highFive);

/*** Functions Returning Functions ***/

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// Same as above but with arrow functions
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greetHola = greet('Hola');
greetHola('Dan');

// a different way to do exactly the same as above
greet('Hey')('Que');

/*** Call and Bind Methods ***/

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Dan Lubbers');
console.log(lufthansa);

// storing book method to reuse it
const book = lufthansa.book;

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Call Method
// Explicitly sets function to 'eurowings.' Without the .call book is just a function, it is not a method on the object so it returns 'undefined'
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 897, 'Que Nguyen');

// Apply Method: uses Array of data
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
// better way than apply. Use spread operator
book.call(swiss, ...flightData);

/*** BIND METHOD ***/

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Wiliams');

// Preset arguements such as the fightNum as 23
const bookEW23 = book.bind(eurowings, 23);

bookEW23('Dan Lubbers');
bookEW23('Marta Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // bind here binds "this" to the buyplane function so 'this' does not get bound to the button

// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(120));

// Challenge same as above without using bind
const addTax1 = rate => value => value + value * rate;
console.log(addTax1(0.1)(200));

/*** Code Challenge 1 ***/
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.options.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
const pollBtn = document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

/*** IIFE ***/

(function () {
  console.log('Only run once!');
  const isPrivate = 26;
})();

// Block Scoped for data privacy
{
  const isPrivate = 40;
}

// console.log(isPrivate); // creates private scoped variables for security reasons

/*** CLOSURES ***/

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// Example 1
let f;

const g = function () {
  const a = 24;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // this global variable does not affect the closure scope chain variable
boardPassengers(180, 3);

// Code Challenge 2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
