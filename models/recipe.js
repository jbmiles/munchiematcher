const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  id: Number,
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
