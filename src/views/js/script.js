$(document).ready(function(){

	let numberOfIngredients = 0;
	let numberOfSteps = 0;

	// Add ingredient button handler
	$("#ingredient").click(function(){

		numberOfIngredients++;

		let nameId = "ingredient" + numberOfIngredients + "name";
		let amountId = "ingredient" + numberOfIngredients + "amount";
		let unitId = "ingredient" + numberOfIngredients + "units";

		var ingredient_field = $(document.createElement('input'))
	         .attr("type", "text")
			 .attr("class", "input-1")
			 .attr("id", nameId);

	    var amount_field = $(document.createElement('input'))
	         .attr("type", "text")
			 .attr("class", "input-1")
			 .attr("id", amountId);
	    
	    var unit_field = $(document.createElement('input'))
	         .attr("type", "text")
			 .attr("class", "input-1")
			 .attr("id", unitId);
	    
		$(".ingredient-fields li")
			.append(ingredient_field)
			.append(amount_field)
			.append(unit_field)
			.append("<br />");
	         
	    console.log(1);
	});


	// Add step button handler

	$("#steps").click(function(){

		numberOfSteps++;
		let stepId = 'step' + numberOfSteps;

		var steps_field = $(document.createElement('input'))
	         .attr("type", "text")
			 .attr("class", "input-1")
			 .attr("id", stepId);
	         
		$(".steps-field li").append(steps_field).append("<br />");
	 
	});

	

	$("#upload-recipe-form").on("keydown", function(e){
    	if (e.which===13) e.preventDefault();
	});


	// Upload recipe button handler
	$("#upload").click(function() {
		console.log('there are ' + numberOfIngredients + ' ingredients');

		// Create an empty recipe object which will be populated with recipe information
		let recipe = {};
		recipe.ingredients = [];
		recipe.directions = [];

		// Grab recipe name and prepTime TODO get cook time and number of servings
		recipe.name = $("#recipeName").val();
		recipe.prep_time = $("#prepTime").val();

		// Grab all ingredient information
		for (let i = 1; i <= numberOfIngredients; i++) {
			// Create empty object to fill individual ingredient information into
			let ingredient = {};
			let ingredientId = '#ingredient' + i;

			// Get all info for the ingredient
			let ingredientName = $(ingredientId + 'name').val();
			let ingredientAmount = $(ingredientId + 'amount').val();
			let ingredientUnits = $(ingredientId + 'units').val();

			console.log(ingredientName);
			console.log(ingredientAmount);
			console.log(ingredientUnits);

			// Set ingredient object params to proper values
			ingredient.name = ingredientName;
			ingredient.quantity = ingredientAmount;
			ingredient.unit = ingredientUnits;

			// Push ingredient object to the main recipe object
			recipe.ingredients.push(ingredient);
		}

		// Grab all step information
		for (let i = 1; i <= numberOfSteps; i++) {
			// Create empty object to fill individual ingredient information into
			let step = {};
			let stepId = '#step' + i;

			// Get info for the step
			let currentStep = $(stepId).val();

			console.log(currentStep);

			// Push ingredient object to the main recipe object
			recipe.directions.push(currentStep);
		}

		console.log(recipe);

		// Make an ajax call to post the data to the database
		$.ajax({
			contentType: 'application/json',
			url : 'http://localhost:5000/postRecipe', //TODO Remove hardcoded url
			type : 'POST',
			data : JSON.stringify(recipe),
			dataType:'text',

			// Let user know of success
			success : function(data) {
				console.log('post was successful!');
				// Create success element
				let success_text = document.createElement('h3');
				success_text.innerHTML = "Your recipe was uploaded!";
				// Append to container div on page
				$("#form-area").append(success_text).append("<br />");
			},

			// Let user know of failure
			error : function(request,error)
			{
				console.log('post failed!');
				// Create failure elements
				let failure_text = document.createElement('h3');
				failure_text.innerHTML = "Your recipe was not uploaded!";

				let failure_desc_text = document.createElement('p');
				failure_desc_text.innerHTML = "Please recheck your form data and try again";

				// Append to container div on page
				$("#form-area").append(failure_text).append("<br />").append(failure_desc_text);
			}
		});
	}); // end of button upload handler

		
});