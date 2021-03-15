'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Freeze makes this immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
// console.log(spendingLimits);

const getLimit = (limits, user) => limits?.[user] ?? 0;

// PURE FUNCTION - NO LONGER PRODUCING SIDE EFFECTS BY MUTATING ORIGINAL STATE
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? // spread obj to make a copy then add new obj values to it
      [...state, { value: -value, description, user: cleanUser }]
    : state;
};

// pass in objects to make copy so we don't mutate the objects that are frozen
const budget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log(budget1);
const budget2 = addExpense(
  budget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const budget3 = addExpense(budget2, spendingLimits, 200, 'Stuff', 'Jay'); // not in spendingLimits, so Jay is not added
console.log(budget);

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );
const finalBudget = checkExpenses(budget3, spendingLimits);
console.log('final', finalBudget);

console.log(budget3);

// Impure function because of the side effect of creating a console.log
const logBigExpenses = function (state, bigLimit) {
  // Rewrite this so this loop is declarative and not imperative
  // let output = '';
  // for (const entry of budget) {
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  //   // Emojis are 2 chars
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  return state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => `${entry.description.slice(-2)} /`.slice(0, -2))
    .join(' / ');

  // Using reduce - attach after filter method
  // .reduce((acc, cur) => `${acc} / ${cur.description.slice(-2)}`, '')
};

console.log(logBigExpenses(finalBudget, 1000));
