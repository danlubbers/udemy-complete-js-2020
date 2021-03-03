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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // this overrides previous data to add new elements

  // Use slice to create a copy so we don't mutate original array
  const sortMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortMovements.forEach((movement, idx) => {
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

const updateUI = currentAccount => {
  // Display Movements
  displayMovements(currentUser.movements);

  // Display Balance
  calcDisplayBalance(currentUser);

  // Display Summary
  calcDisplaySummary(currentUser);
};

// Balance SUM
const calcDisplayBalance = account => {
  account.balance = account.movements.reduce((acc, currVal) => {
    // console.log(acc);
    return acc + currVal;
  }, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, val) => acc + val, 0);

  labelSumIn.textContent = `${incomes}€`;

  const withdrawal = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, val) => acc + val, 0);

  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;

  const interest = account.movements
    .filter(movement => movement > 0) // filter greater than 0
    .map(deposit => (deposit * account.interestRate) / 100) // calculate interest
    .filter(interest => interest >= 1) // filter interest greater than 1 'bank policy'
    .reduce((acc, val) => acc + val, 0); // sum interest

  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

// Event Handler

let currentUser;

btnLogin.addEventListener('click', e => {
  e.preventDefault(); // prevent form from submitting

  currentUser = accounts.find(
    account => account.username === inputLoginUsername.value
  );

  if (currentUser?.pin === +inputLoginPin.value) {
    // Display UI Welcome message
    labelWelcome.textContent = `Welcome back ${
      currentUser.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // gets rid of blinking line. Field loses focus

    updateUI(currentUser);
  } else {
    console.log('No User Found!');
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiver = accounts.find(
    account => account.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiver &&
    currentUser.balance >= amount &&
    receiver?.username !== currentUser.username
  ) {
    currentUser.movements.push(-amount);
    receiver.movements.push(amount);

    updateUI(currentUser);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  const user = inputCloseUsername.value;
  const pin = +inputClosePin.value;

  if (user === currentUser.username && pin === currentUser.pin) {
    const accountIndex = accounts.findIndex(account => {
      return account.username === currentUser.username;
    });
    // Delete account after finding index
    accounts.splice(accountIndex, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentUser.movements.some(mov => mov >= amount * 0.1)) {
    // Add positive movement ( deposit )
    currentUser.movements.push(amount);

    // Update UI
    updateUI(currentUser);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let isSorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentUser.movements, !isSorted);
  isSorted = !isSorted;
});

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

// Code Challenge 2 & 3

const calcAverageHumanAge = dogsAges => {
  return dogsAges
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, idx, arr) => acc + curr / arr.length, 0);
};

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Chaining

const totalDepositsInUSD = movements
  .filter(movement => movement > 0)
  .map(movement => movement * euroToUSD)
  .reduce((acc, val) => acc + val, 0);

// console.log(totalDepositsInUSD);

// Find Method - retreive first element of the array that satisfies the condition
const firstWithdrawal = movements.find(movement => movement < 0);
// console.log(firstWithdrawal);

const account = accounts.find(account => account.owner === 'Jessica Davis');
// console.log(account);

// Using For Of Loop
let accountOwner = {};
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') accountOwner = account;
}
// console.log(accountOwner);

/***  Some and Every ***/

// console.log(movements);

// Checks only for equality
// console.log(movements.includes(-130));

// SOME: Checks for Condition
const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// Every: every condition has to be met
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0)); // account with only deposits

// Separate Callback
const deposit = mov => mov > 0; // reusing this function
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

/*** FLAT AND FLAT MAP ***/

// Flat only goes one level deep
const flatArr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(flatArr.flat());

// Use Depth arguement
const deepArr = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(deepArr.flat(2)); // 2 levels deep

const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

const allMovements = accountMovements.flat();
// console.log(allMovements);

const overallBalance = allMovements.reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalance);

// Use chaining
const overallBalanceChaining = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, curr) => acc + curr, 0);

// console.log(overallBalanceChaining);

// Flat Map - Only goes 1 level deep
const overallBalanceFlatMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalanceFlatMap);

/*** SORTING ARRAYS ***/

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Marta'];
// console.log(owners.sort()); // mutates original array

// Numbers
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
// console.log(movements);

// Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

// console.log(movements);

/*** Programatically create Arrays ***/

// Empty Arrays + fill method
const x = new Array(7);
// console.log(x);

x.fill(1, 3, 5); // similar to slice (value to fill, start position, end position)
// console.log(x);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

const z = Array.from({ length: 7 }, (_, idx) => idx + 1);
// console.log(z);

// random dice rolls challenge
const arrDice = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 6)
);
// console.table(arrDice);

// Create Array from DOM Nodes
labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});

// Code Challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => {
  const recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
  console.log(recommendedFood);
  dog.recommendedFood = recommendedFood;
});

console.log(dogs);

// 2.
const sarahsDog = dogs.find(dog => {
  return dog.owners.includes('Sarah');
});

console.log(
  `Sarahs dog is eating too ${
    sarahsDog.curFood > sarahsDog.recommendedFood ? 'much' : 'little'
  }!`
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => {
    return dog.curFood > dog.recommendedFood;
  })
  .flatMap(obj => obj.owners);

console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => {
    return dog.curFood < dog.recommendedFood;
  })
  .flatMap(obj => obj.owners);

console.log(ownersEatTooLittle);

// 4.
const overEaters = `${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`;
console.log(overEaters);

const underEaters = `${ownersEatTooLittle.join(' and ')}'s dogs eat too much!`;
console.log(underEaters);

// 5.
const exactFood = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(exactFood);

// 6.
const isHealthyDogs = dogs.some(dog => {
  return (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  );
});

console.log(isHealthyDogs);

// 7.
const healthyDogs = dogs.filter(dog => {
  return (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  );
});

console.log(healthyDogs);

// 8.
const dogsSorted = dogs.slice().sort((a, b) => {
  return a.recommendedFood - b.recommendedFood;
});
console.log(dogsSorted);

/*** ARRAY METHODS PRACTICE ***/

console.log(accounts);

// 1.
const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, val) => acc + val, 0);
console.log(bankDepositsSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

// Same thing using reduce
const numDeposits1000Reduced = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);
console.log(numDeposits1000Reduced);

// Prefixed ++ operator
let a = 10;
console.log(a++); // returns previous value / old value
console.log(a);
console.log(++a); // returns new current value
console.log(a);

// 3.

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, cur) => {
      cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
      // acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // different way to do same thing above
      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);

// 4.
// this is a nice title => This Is a Nice Title
const convertTitleCase = title => {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
