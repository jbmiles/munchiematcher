const Recipe = require('../models/recipe.js');

async function getAllRecipes(req, res) {
  const allRecipeQuery = Recipe.find();
  const recipes = await allRecipeQuery;
  console.log(recipes);
  res.render('../views/recipes.ejs', {
    recipes
  });
}

async function addNewRecipe(req, res) {
  return null;
}

async function getRecipe(req, res) {
  return null;
}

async function updateRecipe(req, res) {
  return null;
}

async function deleteRecipe(req, res) {
  return null;
}






module.exports = {
  getAllRecipes,
  addNewRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe
}
