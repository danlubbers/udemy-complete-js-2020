"use strict";

const calcAverage = (scoreOne, scoreTwo, scoreThree) => {
  return (scoreOne + scoreTwo + scoreThree) / 3;
};

const checkWinner = (avgDolphins, avgKoalas) => {
  if (avgDolphins > avgKoalas * 2) {
    return `Dolphins win (${avgDolphins} vs. ${avgKoalas})`;
  } else if (avgKoalas > avgDolphins * 2) {
    return `Koalas win (${avgKoalas} vs. ${avgDolphins})`;
  } else {
    return `No One Wins!`;
  }
};

console.log(checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49)));
console.log(checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27)));

// Coding Challenge 2

/**
 
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
Your tasks:
1. Writeafunction'calcTip'thattakesanybillvalueasaninputandreturns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100
2. Andnowlet'susearrays!Socreateanarray'bills'containingthetestdata below
3. Createanarray'tips'containingthetipvalueforeachbill,calculatedfrom the function you created before
4. Bonus:Createanarray'total'containingthetotalvalues,sothebill+tip Test data: 125, 555 and 44
Hint: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉

 */

const arrBills = [125, 555, 44];

const calcTip = (bill) => {
  let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  return tip;
};

const tips = [calcTip(arrBills[0]), calcTip(arrBills[1]), calcTip(arrBills[2])];
console.log(tips);

const combinedValues = [
  [arrBills[0] + calcTip(arrBills[0])],
  [arrBills[1] + calcTip(arrBills[1])],
  [arrBills[2] + calcTip(arrBills[2])],
];
console.log(combinedValues);

// Code Challenge 3

/**
 
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
Your tasks:
1. Foreachofthem,createanobjectwithpropertiesfortheirfullname,mass,and height (Mark Miller and John Smith)
2. Createa'calcBMI'methodoneachobjecttocalculatetheBMI(thesame method on both objects). Store the BMI value to a property, and also return it from the method
3. LogtotheconsolewhohasthehigherBMI,togetherwiththefullnameandthe respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

 */

const markMiller = {
  firstName: "Mark",
  lastName: "Miller",
  height: 1.69,
  weight: 78,

  calcBMI: function () {
    this.bmi = this.weight / this.height ** 2;
    return this.bmi;
  },
};

const johnSmith = {
  firstName: "John",
  lastName: "Smith",
  height: 1.95,
  weight: 92,

  calcBMI: function () {
    this.bmi = this.weight / this.height ** 2;
    return this.bmi;
  },
};

markMiller.calcBMI();
johnSmith.calcBMI();

if (markMiller.bmi > johnSmith.bmi) {
  console.log(
    `${markMiller.firstName}'s (${markMiller.bmi}) BMI is higher than ${johnSmith.firstName}'s (${johnSmith.bmi})`
  );
} else {
  console.log(
    `${johnSmith.firstName}'s (${johnSmith.bmi}) BMI is higher than ${markMiller.firstName}'s (${markMiller.bmi})`
  );
}

// Code Challenge 4

/**

  Your tasks:
1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!
Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
tips and totals arrays 😉 Bonus:
4. Bonus:Writeafunction'calcAverage'whichtakesanarraycalled'arr'as an argument. This function calculates the average of all numbers in the given array. This is a difficult challenge (we haven't done this before)! Here is how to solve it:
4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
4.3. Call the function with the 'totals' array
 */

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tipsFour = [];
let totalsFour = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tipsFour.push(tip);
  totalsFour.push(bills[i] + tip);
}

const calcAverageFour = (arr) => {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log("total average", calcAverageFour(totalsFour));
