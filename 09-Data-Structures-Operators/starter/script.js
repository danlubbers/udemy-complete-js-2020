'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    // console.log(
    //   `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delievered to ${address} at ${time}`
    // );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here are your pasta ingredients: ${ing1}, ${ing2}, ${ing3}!`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    // console.log(mainIngredient, otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const arr = [1, 2, 3];

/** ARRAY DESTRUCTURING */
const [a, b, c] = arr;
// console.log(a, b, c);

let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

/** Switching variables */
// The way before destructuring
// const temp = main;
// main = secondary;
// secondary = temp;

// With destructuring
[main, secondary] = [secondary, main];
// console.log(main, secondary);

// console.log(restaurant.order(2, 0));
// Recieve 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
// console.log(i, j, k);

// Default Values - r has a default value of 1
const [p, q, r = 1] = [8, 9];
// console.log(p, q, r);

/** OBJECT DESTRUCTURING */
const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// reassign key names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
// console.log(restaurantName, hours, tags);

// default values
const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// Mutating variables
let o = 111;
let s = 999;
const obj = { o: 23, s: 7, c: 14 };

({ o, s } = obj);
// console.log(o, s);

// Nested Objects
const {
  fri: { open, close },
} = openingHours;
// console.log(open, close);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole 21',
  mainIndex: 2,
  starterIndex: 2,
});

/** REST */
const arrRest = [7, 8, 9];

const arrWithRest = [1, 2, ...arrRest];
// console.log(arrWithRest); // logs array
// console.log(...arrWithRest); // logs all individual elements from array

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// Copy Array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 or more arrays
const joinArray = [...restaurant.starterMenu, ...restaurant.mainMenu];

// Iterables: arrays, strings, maps, sets. Now Objects
const str = `Dan`;
// console.log([...str, ' ', 's']);

// Real world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];

// restaurant.orderPasta(...ingredients);

// Objects rest Operator
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// Copying Object without mutating original
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

/** Destructuring SPREAD OPERATOR */

// spread because RIGHT side of assignment operator =
// Values separated by comma
const arrSpread = [1, 2, ...[3, 4]];

// rest, because on LEFT side of assignment operator =
// Variable names separated by comma, not values
const [ab, bc, ...rest] = [1, 2, 3, 4, 5];

const [pizza, , risotto, ...restFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

// console.log(pizza, risotto, restFood);

// Destructuring Objects
const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// Destructuring Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  // console.log(sum);
  return sum;
};

add(2, 3);
add(5, 3, 7, 2);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onions', 'spinach');

/*** CODE CHALLENGE 1 ***/
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Create player array for each team
const [players1, players2] = game.players;
// console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// 5.
const { team1, x: draw, team2 } = game.odds;
// console.log(draw);

// 6.
const printGoals = function (...players) {
  // console.log(`${players.length} goals were scored!`);
};

printGoals('Davies', 'Mullers', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7.
// team1 < team2 && console.log('Team 1 is more likely to win!');
// team1 > team2 && console.log('Team 2 is more likely to win!');

/** FOR OF LOOP */

const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of fullMenu) {
  // console.log(item);
}

// .entries is to get the index
for (const item of fullMenu.entries()) {
  // console.log(`${item[0] + 1}: ${item[1]}`);
}

// destructure item
for (const [i, item] of fullMenu.entries()) {
  // console.log(`${i + 1}: ${item}`);
}

/*** OPTIONAL CHAINING ***/

// only if mon exists then log the open value otherwise log 'undefined'
// console.log(restaurant.openingHours.mon?.open);
// Without the "?" code will throw a typeError
// console.log(restaurant.openingHours.mon.open);

// Before optional chainging this was how you did it
if (restaurant.openingHours && restaurant.openingHours.mon) {
  // console.log(restaurant.openingHours.mon.open);
}
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // Using the ?? nullish coalescing operator, instead of || which will be falsy for Sat
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  // console.log(`On ${day}, we open at ${open}`);
}

// Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist!');
// fake method to show nullish coalescing operator workings
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist!');

// Arrays
const users = [{ name: 'Dan', email: 'hello@dan.io' }];
// console.log(users[0]?.name ?? 'User array emptys');
// console.log(users[0]?.birthDate ?? 'User array empty!');

// Before optional chaining
if (users.length > 0) {
  // console.log(users[0].name);
} else {
  // console.log('user array empty!');
}

/*** LOOPING OBJECTS, KEYS,  VALUES***/

// Property Names
const properties = Object.keys(openingHours);

let openText = `we are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openText += `${day}, `;
}

// console.log(openText);

// Property Values
const values = Object.values(openingHours);

// Entire Object (Key and Value)
const entries = Object.entries(openingHours);

for (const [key, { open, close }] of entries) {
  // console.log(`On ${key} we open at ${open} and close at ${close}`);
}

/*** Code Challenge 2 ***/

// 1.
for (const [idx, player] of game.scored.entries()) {
  // console.log(`Goal ${idx + 1}: ${player}`);
}
// 2.
const odds = Object.values(game.odds);

let average = 0;
for (const value of odds) {
  average += value / odds.length;
}
// console.log(average);

// 3.
for (const [team, value] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  // console.log(`Odd of ${teamStr} ${value}`);
}

// 4.
const scorers = {};

for (const player of game.scored) {
  if (scorers[player]) scorers[player] += 1;
  else scorers[player] = 1;
}

// console.log(scorers);

/*** Sets ***/

// No duplicates in sets, elements are unique, order is irrelevant
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

// console.log(ordersSet);
// console.log(ordersSet.size); //  size instead of length
// console.log(ordersSet.has('Pizza')); // true
// console.log(ordersSet.has('bread')); // false
ordersSet.add('Garlic Bread'); // pushed to set
ordersSet.add('Garlic Bread'); // no duplicates, not added
// console.log(ordersSet);
ordersSet.delete('Risotto'); // delete element
// console.log(ordersSet);

// Set looping
for (const order of ordersSet) {
  // console.log(order);
}

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const uniqueStaff = [...new Set(staff)]; // use spread operator [...] to create array instead of object
// console.log(uniqueStaff);

/*** Maps ***/
// Keys can be anything unlike Objects, where keys can only be strings

const restMap = new Map();

restMap.set('name', 'Classico Italiano');
restMap.set(1, 'Firenze, Italy');
restMap.set(2, 'Lisbon, Portugal');
// console.log(restMap);

restMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('closed', 23)
  .set(true, 'We are open!')
  .set(false, 'We are closed!');

// console.log(restMap);

// console.log(restMap.get('name'));
// console.log(restMap.get(true));

const time = 21;
const openOrClosed = restMap.get(
  time > restMap.get('open') && time < restMap.get('closed')
);
// console.log(openOrClosed);

// console.log(restMap.has('categories'));
restMap.delete(2);
// console.log(restMap);
// console.log(restMap.size);

restMap.set(document.querySelector('h1'), 'Heading');
restMap.set([1, 2], 'TEST');
// console.log(restMap);

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try Again!'],
]);

// console.log(question);

// Convert Object to Map
const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// Iteration
for (const [key, value] of question) {
  if (typeof key === 'number') {
    // console.log(`Answer ${key}: ${value}`);
  }
}

// const answer = Number(prompt('Your Answer'));
// if (answer === question.get('correct')) {
//   console.log(question.get(true));
// } else {
//   console.log(question.get(false));
// }

// Convert Map to array
// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

/***  Coding Challenge 3 ***/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
const events = [...new Set(gameEvents.values())];
// console.log(events);

// 2.
gameEvents.delete(64);
// console.log(gameEvents);

// 3.
const gameTime = [...gameEvents.keys()].pop();
const averageEventTime = gameTime / gameEvents.size;
// console.log(
//   `An event happened, on average, every ${averageEventTime} minutes.`
// );

// 4.
for (const [num, value] of gameEvents.entries()) {
  const half = num <= 45 ? 'FIRST' : 'SECOND';
  // console.log(`[${half} HALF]${num}: ${value}`);
}

/*** Strings ***/

const airline = 'TAP Air Portugal';
const plane = 'A320';

// console.log(airline.length); // length of string
// console.log(airline.indexOf('r')); // gets position
// console.log(airline.lastIndexOf('r')); // last possible position
// console.log(airline.indexOf('Portugal')); // starts at position 8 ( case sensitive )

// console.log(airline.slice(4)); // position at where slice starts, subString result "Air Portugal"
// console.log(airline.slice(4, 7)); // start and end index, subString result "Air"

// console.log(airline.slice(0, airline.indexOf(' '))); // First word, result is "TAP"
// console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // + 1 gets rid of the space. last word, result is "Portugal"

// console.log(airline.slice(-2)); // last two characters in string
// console.log(airline.slice(1, -1)); // Cuts off first character and last character

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const isMiddleSeat = seat.slice(-1);
  if (isMiddleSeat === 'B' || isMiddleSeat === 'E') {
    // console.log('You got the middle seat!');
  } else {
    // console.log('You got lucky!');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Fix capitalization in name
const passenger = 'jOnAs';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// Compare email
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
// console.log(priceUS);

// replace all instances
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

// Using Regex
// console.log(announcement.replace(/door/g, 'gate'));
// replaceALL is the new way
// console.log(announcement.replaceAll('door', 'gate'));

// Booleans | includes | startsWith | endsWith
const planeA320 = 'Airbus A320neo';

// console.log(planeA320.includes('neo'));
// console.log(planeA320.includes('boeing'));
// console.log(planeA320.startsWith('Air'));

if (planeA320.startsWith('Airbus') && planeA320.endsWith('neo')) {
  // console.log('Part of the NEW Airbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const lowerBaggage = items.toLowerCase();
  if (lowerBaggage.includes('knife') || lowerBaggage.includes('gun')) {
    // console.log('You are NOT allowed to board');
  } else {
    // console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife.');
checkBaggage('I have some socks and a camera');
checkBaggage('Got some snacks and a gun for protection.');

// Split and Join
// console.log('a+very+nice+string'.split('+'));

const [firstName, lastName] = 'Dan Lubbers'.split(' ');
// console.log(lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

const capitalizeName = function (name) {
  const nameArr = name.split(' ');
  const namesUpper = [];

  for (const word of nameArr) {
    // Two different ways to do it
    // namesUpper.push(word[0].toUpperCase() + word.slice(1));
    namesUpper.push(word.replace(word[0], word[0].toUpperCase()));
  }
  // console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');

// Padding

const message = 'Go to gate 23!';
// console.log(message.padStart(25, '+').padEnd(35, '+'));
// console.log('Dan'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (num) {
  const strNum = num + '';
  const last = strNum.slice(-4);
  return last.padStart(strNum.length, '*');
};

// console.log(maskCreditCard(4123987912567596));

// Repeat
const repeatMsg = 'Bad weather... All departures delayed... \n';
// console.log(repeatMsg.repeat(5));

const planesInLine = function (planes) {
  // console.log(`There are ${planes} planes in line ${'🛩'.repeat(planes)}`);
};

planesInLine(8);
planesInLine(3);

/*** Code Challenge 4 ***/
/** 
THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', () => {
  const text = document.querySelector('textarea').value;

  let splitWords = text.split('\n');
  // console.log(splitWords);

  for (const [idx, word] of splitWords.entries()) {
    const [first, second] = word.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    console.log(`${output.padEnd(20)}${'✅'.repeat(idx + 1)}`);
  }
});
