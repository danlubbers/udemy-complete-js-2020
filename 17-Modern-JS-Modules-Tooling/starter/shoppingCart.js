// Exporting Module
console.log('Exporting Module');

// Named Exports
const shippingCost = 10;
export const cart = [];

export const addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to cart`);
};

const totalPrice = 157;
const totalQuantity = 54;

export { totalPrice, totalQuantity as tq };

// Default Exports
export default (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to cart`);
};
