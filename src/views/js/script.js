$(document).ready(function(){

	let numberOfIngredients = 0;
	let numberOfSteps = 0;
	let count=0;

	// Add ingredient button handler
	$("#ingredient").click(function(){

		numberOfIngredients++;
		count++;

		let nameId = "ingredient" + numberOfIngredients + "name";
		let amountId = "ingredient" + numberOfIngredients + "amount";
		let unitId = "ingredient" + numberOfIngredients + "units";

		var ingredient_field = $(document.createElement('input'))
	         .attr("type", "text")
	         .attr("placeholder", "name")
			 .attr("class", "input-1")
			 .attr("id", nameId);

	    var amount_field = $(document.createElement('input'))
	         .attr("type", "text")
	         .attr("placeholder", "amount")
			 .attr("class", "input-1")
			 .attr("id", amountId);
	    
	    var unit_field = $(document.createElement('select'))
	         .attr("name", " ")
			 .attr("class", "input-1")
			 .attr("id", unitId)
			 .append("<option>Select...</option>")
			 .append("<option>unit</option>")
			 .append("<option>teaspoon</option>")
			 .append("<option>tablespoon</option>")
			 .append("<option>ounce</option>")
			 .append("<option>cup</option>")
			 .append("<option>gill</option>")
			 .append("<option>gram</option>")
			 .append("<option>pound</option>")
			 .append("<option>gallon</option>")
			 .append("<option>ml</option>")
			 .append("<option>liter</option>")
	    

	    		
	    var ing_li=$(document.createElement('li'))
	    	.append("<span class='remove-upload-ing'>remove</span>")
			.append(ingredient_field)
			.append(amount_field)
			.append(unit_field)
			.append("<br><br>");
					
			
		$(".ingredient-fields").append(ing_li);	 
	    console.log(1);
	    $(".remove-upload-ing").click(function(){
	    	$(this).parent().remove();
	    })
	});

    $(".deleteIngredient").on('click',function(){
        console.log("Value="+this.attr("value"));
        
    });
	// Add step button handler

	$("#steps").click(function(){


		var steps_field = $(document.createElement('textarea'))
	         //.attr("type", "text")
			 .attr("rows", "4")
			 .attr("class", "input-1");
			 
	         
	    var step_li=$(document.createElement('li'))
	    	.append("<span class='remove-upload-step'>remove</span>")
			.append(steps_field)
			.append("<br><br>");
					
		$(".steps-field").append(step_li);
		

		 $(".remove-upload-step").click(function(){
	    	$(this).parent().remove();
	    })
	 
	});

	

	$("#upload-recipe-form").on("keydown", function(e){
    	if (e.which===13) e.preventDefault();
	});


	// Upload recipe button handler
	$("#upload").click(function() {
		postForm();
		
	})
    
	function postForm(){
		console.log('there are ' + numberOfIngredients + ' ingredients');
        
         if(!validateRecipe("upload-modal-content",".input-1","uploadDialog")){
            return;
        }

		// Create an empty recipe object which will be populated with recipe information
		let recipe = {};
		recipe.ingredients = [];
		recipe.directions = [];

		// Grab recipe name and prepTime TODO get cook time and number of servings
		recipe.name = $("#recipeName").val();
		if(recipe.name===null||recipe.name===""){
			alert("Please give a name to your recipe.")
			return;
		}
		recipe.prep_time = $("#prepTime").val();
		recipe.num_servings = $("#servingSize").val();
		recipe.cook_time = $("#cookTime").val();

		// Grab all ingredient information
		var ing_count = $('.ingredient-fields li').length;
		for (let i = 1; i <= ing_count; i++) {
			// Create empty object to fill individual ingredient information into
			let ingredient = {};
			
			// Get all info for the ingredient
			let ingredientName = $('.ingredient-fields li:nth-of-type('+ i +') input:nth-of-type(1)').val();
			let ingredientAmount = $('.ingredient-fields li:nth-of-type('+ i +') input:nth-of-type(2)').val();
			let ingredientUnits = $('.ingredient-fields li:nth-of-type('+ i +') select:nth-of-type(1)').val();

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
		steps_count=$('.steps-field li').length;
		let currentStep="";
		for (let i = 1; i <= steps_count; i++) {
			
			// Get info for the step
			let currentStep = $('.steps-field li:nth-of-type('+ i +') textarea').val();

			console.log(currentStep);

			// Push ingredient object to the main recipe object
			recipe.directions.push(currentStep);
		}

		console.log(recipe);

		let url;
		if (window.location.href.includes('localhost')) {
			url = 'http://localhost:5000/postRecipe';
		} else if (window.location.href.includes('https://sous-chef-assistant.herokuapp.com/')) {
			url = 'https://sous-chef-assistant.herokuapp.com/postRecipe';
		} else if (window.location.href.includes('http://sous-chef-assistant.herokuapp.com/')) {
			url = 'http://sous-chef-assistant.herokuapp.com/postRecipe';
		} else if (window.location.href.includes('https://master-heroku-souchef.herokuapp.com/')) {
			url = 'https://master-heroku-souchef.herokuapp.com/postRecipe';
		} else if (window.location.href.includes('http://master-heroku-souchef.herokuapp.com/')) {
			url = 'http://master-heroku-souchef.herokuapp.com/postRecipe';
		} else{
            url = 'https://session-management-souchef.herokuapp.com/postRecipe';
        }
		console.log('url to post to');
		console.log(url);

		// Make an ajax call to post the data to the database
		$.ajax({
			contentType: 'application/json',
			url : url,
			type : 'POST',
			data : JSON.stringify(recipe),
			dataType:'text',

			// Let user know of success
			success : function(data) {
				console.log('post was successful!');
				// Create success element
                popUpMessage("upload-modal-content","Your recipe was uploaded successfully!",false,'uploadDialog');
                //$(".input-1").val("");
				/*let success_text = document.createElement('h3');
				success_text.innerHTML = "Your recipe was uploaded!"; */
				// Append to container div on page
				$("#form-area").append(success_text).append("<br />");
			},

			// Let user know of failure
			error : function(request,error)
			{
				console.log('post failed!');
				// Create failure elements
				/*let failure_text = document.createElement('h3');
				failure_text.innerHTML = "Your recipe was not uploaded!"; */
                popUpMessage("upload-modal-content","Failed to uploaded recipe! Try after sometime",true,'uploadDialog');

				/*let failure_desc_text = document.createElement('p');
				failure_desc_text.innerHTML = "Please recheck your form data and try again"; */

				// Append to container div on page
				$("#form-area").append(failure_text).append("<br />").append(failure_desc_text);
			}
		});
	 // end of button upload handler
	}

			
});