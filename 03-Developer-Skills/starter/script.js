// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const calcTempAmplitude = tempArr => {
  let min = tempArr[0];
  let max = tempArr[0];

  for (let i = 0; i < tempArr.length; i++) {
    let currentTemp = tempArr[i];
    if (typeof currentTemp !== 'number') continue; // accounts for 'error' in array

    if (currentTemp < min) min = currentTemp;
    if (currentTemp > max) max = currentTemp;
  }
  console.log(min, max);
  return max - min;
};

console.log(calcTempAmplitude([2, 9, 4, 7, 23, 76, 1]));

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
console.log(calcTempAmplitude(temperatures));

// Code Challenge #1

/**

Given an array of forecasted maximum temperatures, the thermometer displays a string with the given temperatures. Example: [17, 21, 23] will print "... 17oC in 1 days ... 21oC in 2 days ... 23oC in 3 days ..."
Your tasks:
1. Createafunction'printForecast'whichtakesinanarray'arr'andlogsa string like the above to the console. Try it with both test datasets.
2. Usetheproblem-solvingframework:Understandtheproblemandbreakitup into sub-problems!
Test data:
§ Data 1: [17, 21, 23]
§ Data2:[12,5,-5,0,4]

 */

const printForecast = arr => {
  let days = '';

  for (let i = 0; i < arr.length; i++) {
    days += `${arr[i]}oC in ${++i} days... `;
  }
  return days;
};

console.log(printForecast([17, 21, 33]));
console.log(printForecast([12, 5, -5, 0, 4]));
