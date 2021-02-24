'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // this overrides previous data to add new elements
  movements.forEach((movement, idx) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      idx + 1
    } ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${movement}€</div>
  </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// Balance SUM
const calcDisplayBalance = movements => {
  const currentBalance = movements.reduce((acc, currVal) => {
    // console.log(acc);
    return acc + currVal;
  }, 0);
  labelBalance.textContent = `${currentBalance}€`;
};
calcDisplayBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice - Immutable
// console.log(arr.slice()); // creates a shallow copy of the array
// console.log([...arr]); // new way to create a shallow copy

// console.log(arr.slice(2)); // start at index 2
// console.log(arr.slice(2, 4)); // start at index 2 and go to index 4
// console.log(arr.slice(-2)); // last two element
// console.log(arr.slice(1, -1)); // start at index 1 and stop before last index

// Splice - Mutates the array
// console.log(arr.splice(2));
// console.log(arr.splice(-1));
// console.log(arr); // Has been mutated

// Reverse - Mutates the array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.reverse());

// Concat
const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); // new way to do the concat method

// Join
// console.log(letters.join('-')); // turns array values into a string

/*** forEach Method ***/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Using For Of Loop
// for (const value of movements) {
//   if (value > 0) {
//     console.log(`You deposited ${value}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(value)}`);
//   }
// }

movements.forEach((value, idx) => {
  if (value > 0) {
    // console.log(`Movement ${idx + 1}: You deposited ${value}`);
  } else {
    // console.log(`Movement ${idx + 1}: You withdrew ${Math.abs(value)}`);
  }
});

// forEach with Maps and Sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// MAP
currencies.forEach((value, key, map) => {
  // console.log(key, value);
});

// SET - does not have keys or indexes
const currenciesSet = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesSet.forEach((value, _, map) => {
  // console.log(value);
});

// Code Challenge 1

const checkDogs = (juliasDogs, katesDogs) => {
  const juliasDogsCorrected = juliasDogs.slice(1, -2);
  const mergedDogs = [...juliasDogsCorrected, ...katesDogs];

  mergedDogs.forEach((dogsAge, idx) => {
    if (dogsAge >= 3) {
      // console.log(
      //   `Dog number ${idx + 1} is an adult, and is ${dogsAge} years old.`
      // );
    } else {
      // console.log(`Dog number ${idx + 1} is still a puppy!`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Map
const euroToUSD = 1.1;

// This is more in line with Functional Programming
const movementsUSD = movements.map(movement => movement * euroToUSD);
// console.log(movementsUSD);

// using for of loop
const movementsUSDfor = [];

for (const movement of movements) {
  movementsUSDfor.push(movement * euroToUSD);
}

// console.log(movementsUSDfor);

// Compute Usernames using forEach and Map
const user = 'Steven Thomas Williams'; // the output we want: stw

const createUsernames = accounts => {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts); // adds key: username to the accounts object

// Filter
const deposits = movements.filter(movement => movement > 0);
// console.log(deposits);

const depositsFor = [];
const withdrawals = [];
for (const movement of movements) {
  movement > 0 ? depositsFor.push(movement) : withdrawals.push(movement);
}

// console.log(depositsFor);
// console.log(withdrawals);

// Reduce
// console.log(movements);
const balance = movements.reduce((acc, currVal, idx, arr) => {
  // console.log(`Iteration ${idx}: ${acc}`);
  return acc + currVal;
}, 0); // initial value in "first" loop iteration
// console.log(balance);

let balance2 = 0;
for (const movement of movements) {
  balance2 += movement;
}
// console.log(balance2);

// Maximum Value
const max = movements.reduce((acc, val) => {
  if (acc > val) return acc;
  else return val;
}, movements[0]);

// console.log(max);

// Code Challenge 2

const calcAverageHumanAge = dogsAges => {
  const dogInHumanAge = dogsAges
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18);
  console.log(dogInHumanAge);
  return dogInHumanAge.reduce(
    (acc, curr, idx, arr) => acc + curr / arr.length,
    0
  );
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
