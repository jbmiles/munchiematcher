const Recipe = require('../models/recipe.js');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

async function getAllRecipes(req, res) {
  const allRecipeQuery = Recipe.find();
  const recipes = await allRecipeQuery.exec();
  //Read tags from DB later
  const tags = ["hot", "cold", "sweet", "savoury", "salty", "chocolate", "bitter",
  "spicy", "crunchy", "greasy", "creamy", "chewy", "vegetables", "meat",
  "comfort", "snack", "meal", "breakfast", "lunch", "dinner", "cake", "biscuit",
  "baked", "crispy", "bread", "dessert"];
  const tagObject = {};
  const ingredientLists = recipes.map(e => e.ingredients).map(e => e.map(e2 => e2.name));
  const mergedIngredientList = [].concat.apply([], ingredientLists);
  const ingredientObject = {}

  //Weird format that list.js requires
  mergedIngredientList.forEach(ingredient => {
    ingredientObject[ingredient] = null;
  })
  tags.forEach((tag) => {
    tagObject[tag] = null;
  })
  shuffle(recipes); //Random recipes go to top for user
  res.render('../views/recipes.ejs', {
    recipes,
    tags: tagObject,
    ingredients: ingredientObject
  });
}

async function addNewRecipe(req, res) {
  let newRecipe = new Recipe({
    name: req.body.name,
    urlName: req.body.name.split(' ').join('_'), //Replaces ' ' with '_'
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
  let query = { urlName: req.params.name }
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
