const controllers = require('../controllers/controller.js');

module.exports = function addRoutes(router) {
  //Redirect
  router.get('/', function(req, res) {
    res.redirect('/recipes');
  });

  router.get('/recipes', controllers.recipeControllers.getAllRecipes);
  router.post('/recipes', controllers.recipeControllers.addNewRecipe);

  router.get('/recipes/:name', controllers.recipeControllers.getRecipe);
  router.post('/recipes/:name', controllers.recipeControllers.addRecipe);
  router.patch('/recipes/:name', controllers.recipeControllers.updateRecipe);
  router.delete('/recipes/:name', controllers.recipeControllers.deleteRecipe);
}
