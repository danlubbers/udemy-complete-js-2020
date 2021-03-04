'use strict';

/*** Constructor Function ***/
const Person = function (firstName, birthYear) {
  // Instance properties:
  // Ex. this.property = parameter
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function
  // bad performance - use prototypal inheritance
  // this.calcAge = function () {
  //   console.log(2021 - this.birthYear);
  // };
};

// new calls the Person function
const dan = new Person('Dan', 1980);
console.log(dan);

// 1. New empty {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const eima = new Person('Eima', 1989);
console.log(eima);
console.log(eima instanceof Person);

/*** PROTOTYPES ***/
console.log(Person.prototype);

// Prototypal inheritance
Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

dan.calcAge();
eima.calcAge();

// Prototype of Dan showing calcAge function
console.log(dan.__proto__);
console.log(dan.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(dan)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';
console.log(dan.species);
console.log(dan.hasOwnProperty('firstName')); // true
console.log(dan.hasOwnProperty('species')); // false: it's not inside the dan object, it's in the prototype property of person

/*** PROTOTYPAL INHERITANE ON BUILT IN OBJECTS ***/

console.log(dan.__proto__.__proto__); // prototype property of object
console.log(dan.__proto__.__proto__.__proto__); // Object.prototype is null

console.dir(Person.prototype.constructor);

const arr = [23, 6, 4, 3, 6, 4, 6, 346]; // short hand for using "new Array"
console.log(arr.__proto__); // shows all methods on array object
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

// This is an example, not good practice to create your own methods
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');

// Code Challenge 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.brake();
