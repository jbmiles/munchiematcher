$(document).ready(function() {
  $('select').formSelect();

  $('#addIngredient').click(function() {
    let numIngredients = $('.ingredientRow').length
    $('#ingredients').append(createIngredientRow(numIngredients));
    $('select').formSelect();
  })

  $('#addMethod').click(function() {
    let numSteps = $('.methodRow').length
    $('#method').append(createMethodRow(numSteps));
  })

  $("#addRecipe").submit(function() {
    var chipInstance = M.Chips.getInstance($(".chips"));
    chipInstance.chipsData.forEach((tag, index) => {
      $('<input />').attr('type', 'hidden')
          .attr(`name`, `tags[${index}]`)
          .attr('value', `${tag.tag}`)
          .appendTo('#addRecipe');
    })
    return true;
  })
})

function createMethodRow(num) {
  let outerdiv = $('<div />', {
    class: "row methodRow"
  });
  outerdiv.append(createMethodDiv(num));
  return outerdiv;
}

function createMethodDiv(num) {
  let outerdiv = $('<div />', {
    class:'input-field col s12'
  });
  let textarea = $('<textarea />', {
    id: `method{num}`,
    name: `method[${num}]`,
    class: "materialize-textarea"
  })
  let label = $('<label />', {
    for: `method{num}`
  }).text(`Step ${num+1}`);
  outerdiv.append(textarea);
  outerdiv.append(label);
  return outerdiv;
}

function createIngredientRow(num) {
  let outerdiv = $('<div />', {
    class: "row ingredientRow"
  });
  outerdiv.append(createQtyDiv(num));
  outerdiv.append(createUnitDiv(num));
  outerdiv.append(createIngredientDiv(num));
  return outerdiv;
}

function createQtyDiv(num) {
  let outerdiv = $('<div />', {
    class:'input-field col s2'
  });
  let input = $('<input >', {
    id: `qty${num}`,
    type: "number",
    name: `ingredients[${num}][quantity]`,
    class: "validate"
  })
  let label = $('<label />', {
    for: `qty${num}`
  }).text("Quantity");
  outerdiv.append(input);
  outerdiv.append(label);
  return outerdiv;
}


function createUnitDiv(num) {
  let outerdiv = $('<div />', {
    class:'input-field col s2'
  });
  outerdiv.append(`<select id="unit${num}" name="ingredients[${num}][unit]">
                  <optgroup label="Weight">
                    <option value="mg">Milligram</option>
                    <option value="g">Grams</option>
                    <option value="Kg">Kilograms</option>
                  </optgroup>
                  <optgroup label="Volume">
                    <option value="ml">Millilitre</option>
                    <option value="l">Litre</option>
                    <option value="tbsp">Tablespoon</option>
                    <option value="tsp">Teaspoon</option>
                    <option valuie="cup">Cup</option>
                  </optgroup>
                  <label for="unit${num}">Unit</label>
                </select>`);
  return outerdiv;
}

function createIngredientDiv(num) {
  let outerdiv = $('<div />', {
    class:'input-field col s8'
  });
  let input = $('<input >', {
    id: `ingredient${num}`,
    type: "text",
    name: `ingredients[${num}][name]`,
    class: "validate"
  })
  let label = $('<label />', {
    for: `ingredient${num}`
  }).text("Ingredient");
  outerdiv.append(input);
  outerdiv.append(label);
  return outerdiv;
}
