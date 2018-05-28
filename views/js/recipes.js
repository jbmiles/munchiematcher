$(document).ready(function() {
  $('select').formSelect();
  $('.tabs').tabs();
  $('.collapsible').collapsible();

//Only fix I could think of, having a maximum 50 tags
  let options = {
    valueNames: ["card-title", "cookTime", "numServings", "recipeCost",
  "tags0", "tags1", "tags2", "tags3", "tags4", "tags5", "tags6", "tags7", "tags8", "tags9", "tags10", "tags11", "tags12", "tags13", "tags14", "tags15",
 "tags16", "tags17", "tags18", "tags19", "tags20", "tags21", "tags22", "tags23", "tags24", "tags25", "tags26", "tags27", "tags28", "tags29", "tags30",
 "tags31", "tags32", "tags33", "tags34", "tags35", "tags36", "tags37", "tags38", "tags39", "tags40", "tags41", "tags42", "tags43", "tags44", "tags45",
 "tags46", "tags47", "tags48", "tags49"]
  }

  let recipeList = new List('recipeList', options);

  let timeSlider = document.getElementById('timeSlider');
  noUiSlider.create(timeSlider, {
    start: [0, 180],
    connect: true,
    step: 1,
    orientation: "horizontal",
    range: {
      min: 0,
      max: 180,
    },
    tooltips: true
  })

  let costSlider = document.getElementById('costSlider');
  noUiSlider.create(costSlider, {
    start: [0, 50],
    connect: true,
    step: 1,
    orientation: "horizontal",
    range: {
      min: 0,
      max: 50,
    },
    tooltips: true
  })

  let servingsSlider = document.getElementById('servingsSlider');
  noUiSlider.create(servingsSlider, {
    start: [0, 25],
    connect: true,
    step: 1,
    orientation: "horizontal",
    range: {
      min: 0,
      max: 25,
    },
    tooltips: true
  })

  let filter = function(item) {
    let passTime = false;
    let passCost = false;
    let passServings = false;
    let passTags = true;

    let timeValue = item.values().cookTime;
    let timeBounds = timeSlider.noUiSlider.get().map(e => parseInt(e));

    let costValue = item.values().recipeCost;
    let costBounds = costSlider.noUiSlider.get().map(e => parseInt(e));

    let servingsValue = item.values().numServings;
    let servingsBounds = servingsSlider.noUiSlider.get().map(e => parseInt(e));
    let chipInstance = M.Chips.getInstance($(".tagSearchChips"));
    let recipeTagSet = Object.values(item.values());
    chipInstance.chipsData.forEach(tag => {
      if (recipeTagSet.indexOf(tag.tag) < 0) {
        passTags = false;
      }
    });

    if (timeValue >= timeBounds[0] && timeValue <= timeBounds[1]) {
      passTime = true;
    }
    if (costValue >= costBounds[0] && costValue <= costBounds[1]) {
      passCost = true;
    }
    if (servingsValue >= servingsBounds[0] && servingsValue <= servingsBounds[1]) {
      passServings = true;
    }
    return passTime && passCost && passServings && passTags;
  }

  let chipInstance = M.Chips.getInstance($(".tagSearchChips"));
  chipInstance.options.onChipAdd = function() {
    recipeList.filter(filter);
  };
  chipInstance.options.onChipDelete = function() {
    recipeList.filter(filter);
  };


  costSlider.noUiSlider.on('update', function() {
    recipeList.filter(filter);
  })

  timeSlider.noUiSlider.on('update', function() {
    recipeList.filter(filter);
  })

  servingsSlider.noUiSlider.on('update', function() {
    recipeList.filter(filter);
  })




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
    var chipInstance = M.Chips.getInstance($(".recipeSubmitChips"));
    chipInstance.chipsData.forEach((tag, index) => {
      $('<input />').attr('type', 'hidden')
          .attr(`name`, `tags[${index}]`)
          .attr('value', `${tag.tag}`)
          .appendTo('#addRecipe');
    })
    return true;
  })
});


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
                  <optgroup label="Other">
                    <option value="count">Count</option>
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
