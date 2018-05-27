items = ["hot", "cold", "sweet", "savoury", "salty", "chocolate", "bitter",
"spicy", "crunchy", "greasy", "creamy", "chewy", "vegetables", "meat",
"comfort", "snack", "meal", "breakfast", "lunch", "dinner", "cake", "biscuit",
"baked", "crispy", "bread", "dessert"],

$(document).ready(() => {
  $('recipeSearch').selectize({
    delimiter: ',',
    create: true,
    items: items,
  });
})
