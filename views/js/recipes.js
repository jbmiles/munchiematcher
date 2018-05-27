$(document).ready(() => {
  $('#recipeSearch').selectize({
    delimiter: ',',
    create: true,
    create: function(input) {
      return {
        value: input,
        text: input
      }
    }
  });
})
