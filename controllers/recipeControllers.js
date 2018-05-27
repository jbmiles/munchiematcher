const Recipe = require('../models/recipe.js');

async function getAllRecipes(req, res) {
  const allRecipeQuery = Recipe.find();
  const recipes = await allRecipeQuery;
  console.log(recipes);
  res.render('../views/recipes.ejs', {
    recipes,
    tags: ["hot", "cold", "sweet", "savoury", "salty", "chocolate", "bitter",
    "spicy", "crunchy", "greasy", "creamy", "chewy", "vegetables", "meat",
    "comfort", "snack", "meal", "breakfast", "lunch", "dinner", "cake", "biscuit",
    "baked", "crispy", "bread", "dessert"]
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
