// Code Challenge #1

const MARK = {
  mass: 78,
  height: 1.69,
};

const JOHN = {
  mass: 92,
  height: 1.95,
};

const markBMI = MARK.mass / MARK.height ** 2;
const johnBMI = JOHN.mass / JOHN.height ** 2;

const markHigherBMI = markBMI > johnBMI;

console.log(markHigherBMI);

// Code Challenge #2
if (markHigherBMI) {
  console.log(`Mark's BMI (${markBMI}) is higher than Johns! (${johnBMI})`);
} else
  console.log(`Johns BMI (${johnBMI}) is higher than Mark's! (${markBMI})`);

// Code Challenge #3
/*
1. Calculatetheaveragescoreforeachteam,usingthetestdatabelow
2. Comparetheteam'saveragescorestodeterminethewinnerofthecompetition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
*/
const dolphinsAverageScore = (96 + 108 + 89) / 3;
const koalasAverageScore = (88 + 91 + 110) / 3;

if (dolphinsAverageScore === koalasAverageScore) console.log(`Tie`);
else if (dolphinsAverageScore > koalasAverageScore) console.log(`Dolphins win`);
else console.log(`Koalas win`);

/*
3. Bonus1:Includearequirementforaminimumscoreof100.Withthisrule,a
team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. Hint: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
*/
const dolphinsAverageScoreBonusOne = (97 + 112 + 101) / 3;
console.log(dolphinsAverageScoreBonusOne);
const koalasAverageScoreBonusOne = (109 + 95 + 123) / 3;
console.log(koalasAverageScoreBonusOne);

if (
  dolphinsAverageScoreBonusOne === koalasAverageScoreBonusOne &&
  dolphinsAverageScoreBonusOne >= 100 &&
  koalasAverageScoreBonusOne >= 100
) {
  console.log(`Tie`);
} else if (
  dolphinsAverageScoreBonusOne > koalasAverageScoreBonusOne &&
  dolphinsAverageScoreBonusOne >= 100
) {
  console.log(`Dolphins win`);
} else if (
  dolphinsAverageScoreBonusOne < koalasAverageScoreBonusOne &&
  koalasAverageScoreBonusOne >= 100
) {
  console.log(`Koalas win`);
} else console.log(`No one wins!!!`);

// Code Challenge #4

/*

Steven wants to build a very simple tip calculator for whenever he goes eating in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.
Your tasks:
1. Calculatethetip,dependingonthebillvalue.Createavariablecalled'tip'for this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
2. Printastringtotheconsolecontainingthebillvalue,thetip,andthefinalvalue (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 316.25”
Test data:
§ Data 1: Test for bill values 275, 40 and 430 Hints:
§ To calculate 20% of a value, simply multiply it by 20/100 = 0.2 § Value X is between 50 and 300, if it's>= 50 && <= 300😉

 */

const bill = 275;
let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
