'use strict'

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';


// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2


///////////////////////////////////////////////////////////


const controlRecipes = async function() {
  try {

    const id = window.location.hash.slice(1);

    if (!id) return;

    // Render Spinning Loader
    recipeView.renderSpinner();

    // Load Recipe
    await model.loadRecipe(id);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // controlServings();
  } catch(err) {
    // console.error(`Custom_controller: ${err.message}`);
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    
    // 2) Load search results
    await model.loadSearchResults(query);
    
    // 3) Render search results
    resultsView.render(model.getSearchResultsPage());
    
    // 4) Render pagination buttons
    paginationView.render(model.state.search);
    
  } catch(err) {
    console.log(`My error - controller: ${err}`);
  }
}

const controlPagination = function(goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search)
}

const controlServings = function(newServings) {
  // Update recipe servings
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();



document.querySelector('.header__logo').addEventListener('click', (e) =>  window.location = '');