// Named Exports

// Importing Module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('coffee', 5);
// console.log(price, tq);
// console.log('Importing Module');

// Import "everything"
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('coffee', 12);
// console.log(ShoppingCart.totalPrice);

// Default imports
import add, { cart } from './shoppingCart.js';
add('bread', 3);
add('coffee', 13);
add('pizza', 2);

console.log(cart); // this proves the import is a live connection, not a copy (They point to the same place in memory )

const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 432;
  const totalPrice = 956;
  const totalQuatity = 28;

  const addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} was added to cart. (Shipping cost is ${shippingCost})`
    );
  };
  const orderStock = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} order from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuatity,
  };
})();

shoppingCart2.addToCart('apple', 4);
console.log(shoppingCart2);
console.log(shoppingCart2.shippingCost); // undefined: not returned

/*** COMMON JS ***/
// Export
// Will not work in browser, only works in node.JS
// export.addToCart = = (product, quantity) => {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} was added to cart. (Shipping cost is ${shippingCost})`
//   );
// };

// Import
// const { addToCart} = require('./shoppingCart.js')

/*** NPM ***/
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; // better way to import

const state = {
  cart: [
    {
      product: 'bread',
      quantity: 5,
    },
    {
      product: 'pizza',
      quantity: 3,
    },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log(stateClone);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone); // did "not" mutate loggedIn to false

// only for parcel: will not reload the page on save
// State is maintained when we save
if (module.hot) module.hot.accept();

// polyfill methods like .filter .map, Promises, etc
import 'core-js/stable';

// polyfilling async functions
import 'regenerator-runtime/runtime';
