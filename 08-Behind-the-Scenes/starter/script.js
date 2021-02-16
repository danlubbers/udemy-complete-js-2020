'use strict';

/** Scoping **/
function calcAge(birthYear) {
  const age = 2021 - birthYear;

  function printAge() {
    // console.log(`${firstName}'s age is ${age}`);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; // var is function scoped, not blocked scoped!
      // console.log(`Oh, you're a millenial, ${firstName}`);
    }
    // console.log(millenial); // function scoped so can be called outside of the block scope
  }
  printAge();
  return age;
}

const firstName = 'Dan';
// console.log(calcAge(1980));
// console.log(calcAge(1988));

/** HOISTING  **/

// Variables
// console.log(me);

var me = 'Dan';
let job = 'retoucher';
const year = 1980;

// Functions

// console.log(addDeclaration(2, 3));
// console.log(addExpression(2, 3));
// console.log(addArrow(2, 3));

function addDeclaration(a, b) {
  return a + b;
}

var addExpression = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// Example of a pitfall

if (!productsNum) deleteShoppingCart();

var productsNum = 10;

function deleteShoppingCart() {
  // console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

/** THIS **/

// console.log(this);

const thisFunc = function (param) {
  // console.log(param);
  // console.log(this); // in function expression this refers to the function and is undefined
};

thisFunc('test');

const thisFuncArrow = param => {
  // console.log(param);
  // console.log(this); // in arrow function this refers to window
};

thisFuncArrow('test');

const dan = {
  firstName: 'Dan',
  birthYear: 1980,
  calcAge: function () {
    // console.log(this); // method call refers to object calling the method
    // console.log(2021 - this.birthYear);

    /** Pre ES6 Solution
    const self = this; // 'this' is not referenced in the isMillenial function so we assign 'this' to self and use this variable in isMillenial
    const isMillenial = function () {
      console.log(self.birthYear >= 1981 && self.birthYear <= 1996);
    };
    */

    /** ES6 Solution using arrow function which uses 'this' or parent scope */
    const isMillenial = () => {
      // console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
    };
    isMillenial();
  },

  // greet: () => console.log(`Hey ${this.firstName}`), // this does not work in arrow function. Goes to the window object and there is not firstName on the window Object
};

dan.calcAge();
// dan.greet();

const que = {
  birthYear: 1982,
};

que.calcAge = dan.calcAge;
que.calcAge();

const f = dan.calcAge;
// console.log(f);

let age = 40;
let oldAge = age;
age = 41;

// console.log(age);
// console.log(oldAge);

const myself = {
  name: 'Dan',
  age: 40,
};

const friend = myself;
friend.age = 32;

// console.log(myself);
// console.log(friend);

// Primitive Value
let lastName = 'Nguyen';
let oldLastName = lastName;
lastName = 'Lubbers';

console.log(lastName, oldLastName);

// Reference Object
const jessica = {
  firstName: 'Jessica',
  lastName: 'Nguyen',
  age: 27,
};

// does not create a new object in the heap. Just another variable to reference Obj. Points to same memory address in the heap.
const marriedJessica = jessica;
marriedJessica.lastName = 'Lubbers';
// console.log('Before Marriage', jessica);
// console.log('After Marriage', marriedJessica);

// Copying Objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Nguyen',
  age: 27,
  family: ['Alice', 'Bob'],
};

// Object.assign is used to create a new object in the heap and does not mutate the original object. Only creates a "Shallow Copy" which is the first level.
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Lubbers';

console.log('Before Marriage', jessica2);
console.log('After Marriage', jessicaCopy);

jessicaCopy.family.push('Mary');

// Object.assign still mutates anything lower than first level
console.log('Before Marriage', jessica2); // should not have Mary in the array
console.log('After Marriage', jessicaCopy);
