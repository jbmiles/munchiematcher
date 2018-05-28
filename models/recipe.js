const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  name: String,
  urlName: String,
  image: String,
  prepTime: Number,
  cookTime: Number,
  numServings: Number,
  cost: Number,
  ingredients:  [{
    name: String,
    quantity: Number,
    unit: String
  }],
  method: [String],
  tags: [{
    type: String,
    required: "Please specify at least one tag"
  }]
})

module.exports = mongoose.model('Recipe', recipeSchema);
