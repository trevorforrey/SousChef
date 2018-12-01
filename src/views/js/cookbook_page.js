var recipesDoc = null;
var currentRecipe = null;

let numberOfIngredients = 0;
let numberOfSteps = 0;
var old_recipename={};
var flag=0

function oopsie(){
    $("#Message").text("Oopsie woopsie! uwu We made a messy wessy! Our code mookeys are working VEWY HAWD to fix this!");
}

function unoopsie(){
    $("#Message").text("Your Cookbook");
}

function populate(recipe){
    console.log(recipe);

    // Empty previous ingredients and steps before populating the page
    $("#ingredients").empty();
    $("#steps").empty();
    
    if(recipe.name != undefined && recipe.name != null){
            $("#recipe_name_edit").val(recipe.name);
    }else{
            $("#recipe_name_edit").val("not listed");
    }
    //serving_size_edit 
     /*if(recipe.name != undefined && recipe.name !=- null){
            $("#recipe_name_edit").html(recipe.name);
    }else{
            $("#recipe_name_edit").html("not listed");
    } */
    if (recipe.prep_time != undefined && recipe.prep_time != null){
        $("#prep_time_edit").val(recipe.prep_time);
    } else {
        $("#prep_time_edit").val("not listed");
    }

    if (recipe.cook_time != undefined && recipe.cook_time != null) {
        $("#cook_time_edit").val(recipe.cook_time);
    } else {
        $("#cook_time_edit").val("not listed");
    }
    /*var ingreds = recipe.ingredients;
    for (var i in ingreds){
        console.log(ingreds[i]);
        $("#ingredients").append('<li>'+ingreds[i].quantity+" "+ingreds[i].unit+" of "+ingreds[i].name+"</li>");
    }
    var steps = recipe.directions
    for (var i in steps){
        $("#steps").append("<li>"+steps[i]+"</li>");
    } */
}

function renderIngredientsAndSteps(recipe){
    var buildHtml = "";
    var ingredients = recipe.ingredients;
    var steps = recipe.directions;
    var length = ingredients.length;
    numberOfIngredients = length;
    var steps_field = null;

    //Dynamically creating ingredients as a table (Ingredient Name, Quantity , Unit)
    for(var i=0; i<length ;i++){
        if(ingredients[i] != null){
            buildHtml += "<div class=\"row-upload row\"><tr class=\"col-md-12\" style='border:1px solid #dddddd;'><td class='tdid' style='padding-left:10px;'></td><td class='tdid' style='padding-left:10px;'><textarea id='ingname"+(i+1)+"' name='ingname"+(i+1)+"' class=\"input-edit\" maxlength='252' value=\"dummy\" style='width: 250px;color: rgb(119, 119, 119);margin-left: 50px;'>"+ingredients[i].name+"</textarea></td><td class='tdid' style='padding-left:10px;'><textarea id='quantity"+(i+1)+"' name='quantity"+(i+1)+"' class=\"input-edit\" maxlength='252' style='width: 250px;'>"+ingredients[i].quantity+"</textarea></td><td class='tdid' style='padding-left:10px;'><textarea id='unit"+(i+1)+"' name='unit"+(i+1)+"' class=\"input-edit\" maxlength='252' style='width: 250px;'>"+ingredients[i].unit+"</textarea></td></tr></div>";
        }
    }
    document.getElementById('stepsAndIngredientsDiv').innerHTML = buildHtml;
    length = steps.length;
    numberOfSteps = length;
    
    //Dynamically creating steps as a list of textboxes
    for(var j=0;j<length;j++){
        steps_field = $(document.createElement('input'))
	         .attr("type", "text")
			 .attr("class", "input-edit")
			 .attr("id", "step"+(j+1))
             .attr("value", steps[j]);
        $(".steps-field li").append(steps_field).append("<br />");

    }	         
    
}

function updateRecipe(){
    
        if(!validateRecipe("update-modal-content",".input-edit","updateDialog")){
            return;
        }
        
		// Create an empty recipe object which will be populated with recipe information
        let recipe_container={}
        recipe_container.old_name={};
		recipe_container.recipe = {};
		recipe_container.recipe.ingredients = [];
		recipe_container.recipe.directions = [];

		// Grab recipe name and prepTime TODO get cook time and number of servings
		recipe_container.recipe.name = $("#recipe_name_edit").val();
		recipe_container.recipe.prep_time = $("#prep_time_edit").val();
        recipe_container.recipe.cook_time = $("#cook_time_edit").val();
        recipe_container.recipe.serving_size = $("#serving_size_edit").val();


		// Grab all ingredient information
		for (let i = 1; i <= numberOfIngredients; i++) {
			// Create empty object to fill individual ingredient information into
			let ingredient = {};
			let ingredientId = '#ingname' + i;

			// Get all info for the ingredient
			let ingredientName = $('#ingname'+i).val();
			let ingredientAmount = $('#quantity'+i).val();
			let ingredientUnits = $('#unit'+i).val();

			console.log(ingredientName);
			console.log(ingredientAmount);
			console.log(ingredientUnits);

			// Set ingredient object params to proper values
			ingredient.name = ingredientName;
			ingredient.quantity = ingredientAmount;
			ingredient.unit = ingredientUnits;

			// Push ingredient object to the main recipe object
			recipe_container.recipe.ingredients.push(ingredient);
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
			recipe_container.recipe.directions.push(currentStep);
		}

        recipe_container.old_name=old_recipename;
        if(compare(currentRecipe,recipe_container.recipe)){
            popUpMessage("update-modal-content","Recipe is already up to date!",true,'updateDialog');
            return;
        }

		let url;
		if (window.location.href.includes('localhost')) {
			url = 'http://localhost:5000/update';
		} else if (window.location.href.includes('https://sous-chef-assistant.herokuapp.com/')) {
			url = 'https://sous-chef-assistant.herokuapp.com/update';
		} else if (window.location.href.includes('http://sous-chef-assistant.herokuapp.com/')) {
			url = 'http://sous-chef-assistant.herokuapp.com/update';
		} else if (window.location.href.includes('https://master-heroku-souchef.herokuapp.com/')) {
			url = 'https://master-heroku-souchef.herokuapp.com//update';
		} else if (window.location.href.includes('http://master-heroku-souchef.herokuapp.com/')) {
			url = 'http://master-heroku-souchef.herokuapp.com/';
		} else{
            url = 'https://session-management-souchef.herokuapp.com/update';
        }

		// Make an ajax call to post the data to the database
		$.ajax({
			contentType: 'application/json',
			url : url,
			type : 'POST',
			data : JSON.stringify(recipe_container),
			dataType:'text',
			success : function(data) {
				console.log('post was successful!');
                currentRecipe = recipe_container.recipe;
                //function popUpMessage(divID,message,isError,id)
                popUpMessage("update-modal-content","Your recipe was updated successfully!",false,'updateDialog');
                $("#form-area_edit :input").prop("disabled", true);
                $('.input-edit').css("color","#777");
			},
			// Let user know of failure
			error : function(request,error)
			{
				console.log('post failed!');
				// Create failure elements
                popUpMessage("update-modal-content","Failed to update the recipe, try after sometime!",true,'updateDialog');
                $("#form-area_edit :input").prop("disabled", true);
                $('.input-edit').css("color","#777");
			}
		});
	 // end of button upload handler
	}

function deleteRecipe(recipe) {
  let request_doc = {};
  request_doc.recipeName = recipe.name

  let url;
  if (window.location.href.includes('localhost')) {
    url = 'http://localhost:5000/delete';
  } else if (window.location.href.includes('https://sous-chef-assistant.herokuapp.com/')) {
    url = 'https://sous-chef-assistant.herokuapp.com/delete';
  } else if (window.location.href.includes('http://sous-chef-assistant.herokuapp.com/')) {
    url = 'https://sous-chef-assistant.herokuapp.com/delete';
  } else if (window.location.href.includes('https://master-heroku-souchef.herokuapp.com/')) {
    url = 'https://master-heroku-souchef.herokuapp.com/delete';
  } else if (window.location.href.includes('http://master-heroku-souchef.herokuapp.com/')) {
    url = 'http://master-heroku-souchef.herokuapp.com/delete';
  }

  $.ajax({
		contentType: 'application/json',
		url : url,
		type : 'DELETE',
		data : JSON.stringify(request_doc),
		dataType:'text',

		// Let user know of success
		success : function(data) {
			console.log('post was successful!');
			// Create success element
              document.getElementById("responseTxt").innerHTML = "Your recipe was deleted successfully!";
			// Append to container div on page
			//$("#form-area").append(success_text).append("<br />");
		},

		// Let user know of failure
		error : function(request,error)
		{
			console.log('post failed!');
			// Create failure elements
              document.getElementById("responseTxt").innerHTML = "Failed to delete the recipe, try after some time";
			/*let failure_text = document.createElement('h3');
			failure_text.innerHTML = "Your recipe was not uploaded!";

			let failure_desc_text = document.createElement('p');
			failure_desc_text.innerHTML = "Please recheck your form data and try again";

			// Append to container div on page
			$("#form-area").append(failure_text).append("<br />").append(failure_desc_text); */
		}
	});
}

$(document).ready(function() {

    /*updateTemplate = $.ajax({
                    url: "update_template.html",
                    method: "GET",
                });
    console.log("AJAX call result:"+updateTemplate); */
    
    let url;
    if (window.location.href.includes('localhost')) {
        url = 'http://localhost:5000/cookbook';
    } else if (window.location.href.includes('https://sous-chef-assistant.herokuapp.com/')) {
        url = 'https://sous-chef-assistant.herokuapp.com/cookbook';
    } else if (window.location.href.includes('http://sous-chef-assistant.herokuapp.com/')) {
        url = 'http://sous-chef-assistant.herokuapp.com/cookbook';
    } else if (window.location.href.includes('https://master-heroku-souchef.herokuapp.com/')) {
        url = 'https://master-heroku-souchef.herokuapp.com/cookbook';
    } else if (window.location.href.includes('http://master-heroku-souchef.herokuapp.com/')) {
        url = 'http://master-heroku-souchef.herokuapp.com/cookbook';
    } else{
            url = 'https://session-management-souchef.herokuapp.com/cookbook';
    }


    //jquery }getJSON() isn't working for me, trying code from
    //if (window.location.href.includes('https://master-heroku-souchef.herokuapp.com/'))
    // https://stackoverflow.com/questions/47523265/jquery-ajax-no-access-control-allow-origin-header-is-present-on-the-requested instead
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        url: url,
        success: function(result){
            console.log("hello");
            console.log(result);
            recipesDoc = result;
            //console.log("Here is the recipe json :"+recipesDoc.recipes.getJSON().toString());
            $.each(recipesDoc.recipes, function(index, value) {
                $("#recipeList").append($("<option></option>").attr("value",index)
                .text(value.name));
            });
            if (recipesDoc.recipes.length > 0){
                var defaultRecipe = recipesDoc.recipes[0];
                currentRecipe = defaultRecipe;
                 $.when(renderIngredientsAndSteps(defaultRecipe)).done(function(){
                        populate(defaultRecipe);
                        $("#form-area_edit :input").prop("disabled", true);
                 });
            }
            $("#recipeList").change(function() {
                var selected = $(this).val();
                console.log("input: " + selected);
                var  recipe = recipesDoc.recipes[parseInt(selected)];
                currentRecipe = recipe;
                document.getElementById('stepsList').innerHTML = "";
                document.getElementById('stepsAndIngredientsDiv').innerHTML = "";
                 $.when(renderIngredientsAndSteps(recipe)).done(function(){
                        populate(recipe);
                        $("#form-area_edit :input").prop("disabled", true);
                 });
            });

            $("#enableEdit").on("click",function(){
                $("#form-area_edit :input").prop("disabled", false);
                //ajax call to /update_recipe ,send data contains name of the recipe
                //obtained from text field. received data has the id field
                //{id: id ,body: recipe}
                 old_recipename.name=$("#recipeList option:selected").text()
                //var id=$("recipeList").val()
                console.log(old_recipename)
                flag=1
                $('.input-edit').css("color","#eee");
            });
            
            $("#cancel").on("click",function(){
                document.getElementById('stepsList').innerHTML = "";
                document.getElementById('stepsAndIngredientsDiv').innerHTML = "";
                $.when(renderIngredientsAndSteps(currentRecipe)).done(function(){
                        populate(currentRecipe);
                        $("#form-area_edit :input").prop("disabled", true);
                 }); 
                $("#form-area_edit :input").prop("disabled", true);
                $('.input-edit').css("color","#777");

            });
            
            $('.input-edit').css("color","#777");
        }
        
    });

            $("#update").on("click",function(){
                if(flag===1){
                  updateRecipe();
                  console.log("Upto update click")
                }
                else{
                    alert("Nothing is changed!")
                }

            });

            $("#delete").on("click",function(){
              console.log(currentRecipe);
              deleteRecipe(currentRecipe);
              window.location.reload();
            });
});

function jsonCallback(jsonObject){
    console.log(jsonObject);
    recipesDoc = jsonObject;
}
