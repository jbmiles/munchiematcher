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
    enum: ["hot", "cold", "sweet", "savoury", "salty", "chocolate", "bitter",
    "spicy", "crunchy", "greasy", "creamy", "chewy", "vegetables", "meat",
    "comfort", "snack", "meal", "breakfast", "lunch", "dinner", "cake", "biscuit",
    "baked", "crispy", "bread", "dessert"],
    required: "Please specify at least one tag"
  }]
})

module.exports = mongoose.model('Recipe', recipeSchema);
