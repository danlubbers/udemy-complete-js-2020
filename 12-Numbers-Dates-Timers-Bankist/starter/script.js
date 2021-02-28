'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const displayDate = `${day}/${month}/${year}`;

    const formattedMov = formatCurrency(mov, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = () => {
  // pass function into setInterval
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${seconds}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started!';
      containerApp.style.opacity = 0;
    }
  };

  // This must be after the if statement otherwise we get logged out at 1 second, not 0
  // Decrease 1 second
  time--;

  // Set time to 2 minutes
  let time = 120; // in seconds

  // Call timer every second
  tick(); // call function immediately to get rid of initial 1 sec delay
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// Fake Always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weeekday: 'long',
    };

    const locale = navigator.language; // check browser language

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // HOW We did it before using international date way above
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer); // this clears timer between different users logging in
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Base 10: is 0 - 9
// Binaary: is 0 1
console.log(0.1 + 0.2);

// Convert strings to numbers
console.log(+'23');
console.log(+'23'); // + operator is type coercion

// Parsing
console.log(Number.parseInt('30px', 10)); // string needs to start with a number, second argument is base 10
console.log(Number.parseInt('e30')); // this will not work

console.log(Number.parseFloat('2.5rem')); // floating/decimal points

// isNaN: Check if value isNaN
console.log(Number.isNaN(20)); // false, is a number
console.log(Number.isNaN('20')); // false, type coercion to a number
console.log(Number.isNaN(+'20X')); // true: is not a number

// isFinite is best way to check if value is a number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

/*** MATH AND ROUNDING ***/

// Square Root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
// Cubic Root
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, '23', 11, 2)); // does type coercion, but not parsing
console.log(Math.min(5, 18, '23', 11, 2)); // does type coercion, but not Parsing

// Calculate the area of circle with 10px radius
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Generate random integer betwee 1 through 6
console.log(Math.trunc(Math.random() * 6) + 1);

// Math.random is between 0 - 1
// this function gives us a random number that will always stay between min and max
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};
console.log(randomInt(10, 20));

// Rounding Integers
console.log(Math.trunc(23.3)); // removes decimal

console.log(Math.round(23.9)); // round to nearest integer
console.log(Math.round(23.3)); // round to nearest integer

console.log(Math.ceil(23.9)); // Round up
console.log(Math.ceil(23.3)); // Round up

console.log(Math.floor(23.9)); // round down
console.log(Math.floor(23.3)); // round down

console.log(Math.trunc(-23.3)); // trunc just removes decimal
console.log(Math.floor(-23.3)); // round works opposite for negative numbers

// Floating Points / Rounding Decimals
console.log((2.7).toFixed(0)); // toFixed returns a string, not a number
console.log((2.7).toFixed(3)); // toFixed adds decimal places
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); // convert back to number

/*** REMAINDER / MODULUS ***/

console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); //  8 = 2 * 3 + 2

console.log(6 % 2);
console.log(6 / 2);

const isEven = num => num % 2 === 0;
console.log(isEven(2)); // true
console.log(isEven(3)); // false

labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, idx) => {
    // Every other row - 0, 2, 4, 6
    if (idx % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
    // Every third row 0, 3, 6, 9
    if (idx % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

const isOdd = num => num % 2 === 1;
console.log(isOdd(2)); // false
console.log(isOdd(3)); // true

/*** BIG INT ***/

console.log(2 ** 53 - 1); // this is the biggest number JS can represent
console.log(Number.MAX_SAFE_INTEGER);

// n transforms a regular number into a BigInt Number
console.log(1927049172394172093471098730n);

console.log(BigInt(1927049172));

// Operations
console.log(10000n + 10000n);
console.log(19273912730941720394710974893n * 19287491273049170394710947310n);

const huge = 9823948701239701928739174019n;
const num = 54;

console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n == 20); // TRUE: type coercion bigInt vs num
console.log(20n === 20); // FALSE: does not do type coercion. bigInt vs num

console.log(huge + ' is REALLY BIG!!!');

// Divisions
console.log(10n / 3n); // cuts off decimal point

/*** DATES AND TIME ***/

// Create a date
const now2 = new Date();
console.log(now2);

console.log(new Date('Feb 27 2021 17:40:49'));
console.log(new Date('December 24, 2015'));

console.log(new Date(account1.movementsDates[0]));

// Month is 0 based like Arrays
console.log(new Date(2037, 10, 19, 15, 23, 5)); // year, month, day, hour, min, sec
console.log(new Date(2037, 10, 31)); // JS will autocorrect dates. There is no Nov. 31st

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); // 10 is Nov
console.log(future.getDay()); // 4 is thursday
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142274980000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

/***  INTL NUMBERS ***/
const numIntl = 23948723.23;

const options = {
  // style: 'unit',
  // unit: 'mile-per-hour',
  // unit: 'celsius',
  // style: 'percent',
  style: 'currency',
  currency: 'EUR',
};

console.log(
  'US:     ',
  new Intl.NumberFormat('en-US', options).format(numIntl)
);
console.log(
  'Germany:',
  new Intl.NumberFormat('de-DE', options).format(numIntl)
);
console.log(
  'Syria:  ',
  new Intl.NumberFormat('ar-SY', options).format(numIntl)
);
console.log(
  'Browser:  ',
  new Intl.NumberFormat(navigator.language, options).format(numIntl)
);

/*** SetTIMEOUT and SetINTERVAL***/

// setTimeout
const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ingredients1, ingredients2) =>
    console.log(`here is your pizza with ${ingredients1} and ${ingredients2}`),
  2000,
  ...ingredients
);

// Will not be printed to console because the spinach is in the array
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// setInterval(() => {
//   const now = new Date();
//   const hours = `${now.getHours()}`.padStart(2, 0);
//   const min = `${now.getMinutes()}`.padStart(2, 0);
//   const seconds = `${now.getSeconds()}`.padStart(2, 0);
//   console.log(`${hours}:${min}:${seconds}`);
// }, 1000);
