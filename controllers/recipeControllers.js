const Recipe = require('../models/recipe.js');

async function getAllRecipes(req, res) {
  const allRecipeQuery = Recipe.find();
  const recipes = await allRecipeQuery.exec();
  //Read tags from DB later
  const tags = ["hot", "cold", "sweet", "savoury", "salty", "chocolate", "bitter",
  "spicy", "crunchy", "greasy", "creamy", "chewy", "vegetables", "meat",
  "comfort", "snack", "meal", "breakfast", "lunch", "dinner", "cake", "biscuit",
  "baked", "crispy", "bread", "dessert"];
  const tagObject = {};
  tags.forEach((tag) => {
    tagObject[tag] = null;
  })
  res.render('../views/recipes.ejs', {
    recipes,
    tags: tagObject
  });
}

async function addNewRecipe(req, res) {
  let newRecipe = new Recipe({
    name: req.body.name,
    image: req.body.image,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    numServings: req.body.numServings,
    cost: req.body.cost,
    ingredients: req.body.ingredients,
    method: req.body.method,
    tags: req.body.tags
  });
  await newRecipe.save();
  res.redirect(`/recipes/${req.body.name}`);
}

async function getRecipe(req, res) {
  let query = { name: req.query.name }
  let recipeGetQuery = Recipe.findOne(query);
  let recipeDoc = await recipeGetQuery.exec();
  res.render('../views/recipe.ejs', {
    recipe: recipeDoc
  });
  return null;
}

async function updateRecipe(req, res) {
  let query = { name: req.body.name }
  let recipeUdateQuery = Recipe.findOneAndUpdate(query, req.body);
  let updatedRecipeDoc = await recipeUdateQuery.exec();
  console.log(updatedRecipeDoc);
  res.redirect(`/recipes/${req.body.name}`);
  return null;
}

async function deleteRecipe(req, res) {
  let query = { name: req.body.name }
  let recipeDeleteQuery = Recipe.findOneandRemove(query);
  let deletedRecipe = await recipeDeleteQuery.exec();
  res.redirect(`/recipes`);
  return null;
}






module.exports = {
  getAllRecipes,
  addNewRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe
}
