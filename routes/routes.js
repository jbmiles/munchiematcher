const controllers = require('../controllers/controller.js');

function inDevelopmentMode(req, res, next) {
  if (process.env.NODE_ENV === "development") {
    return next();
  }
  return null;
}
module.exports = function addRoutes(router) {
  //Redirect
  router.get('/', function(req, res) {
    res.redirect('/recipes');
  });

  router.get('/recipes', controllers.recipeControllers.getAllRecipes);
  router.post('/recipes', inDevelopmentMode, controllers.recipeControllers.addNewRecipe);

  router.get('/recipes/:name', controllers.recipeControllers.getRecipe);
  router.patch('/recipes/:name', inDevelopmentMode, controllers.recipeControllers.updateRecipe);
  router.delete('/recipes/:name', inDevelopmentMode, controllers.recipeControllers.deleteRecipe);
}
