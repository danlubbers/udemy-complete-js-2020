import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable'; // for older browsers - polyfill everything except async
import 'regenerator-runtime'; // for older browsers - polyfill asyn/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return; // otherwise on load without hashID, spinner will be infinite

    recipeView.renderSpinner();

    // 1. Load recipe 'returns a promise - await it'
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  // Subscriber
  recipeView.addHandlerRender(controlRecipes);
};
init();
