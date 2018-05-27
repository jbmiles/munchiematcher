const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  prepTime: Number,
  cookTime: Number,
  numServings: Number,
  ingredients:  [{
    name: String,
    quantity: Number,
    unit: String
  }],
  method: [String]
})

module.exports = mongoose.model('Recipe', recipeSchema);
