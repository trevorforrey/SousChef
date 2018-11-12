var recipesDoc = null;

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
    
    if (recipe.prep_time != undefined && recipe.prep_time != null){
        $("#prep_time").html(recipe.prep_time);
    } else {
        $("#prep_time").html("not listed");
    }
    if (recipe.cook_time != undefined && recipe.cook_time != null) {
        $("#cook_time").html(recipe.cook_time);
    } else {
        $("#cook_time").html("not listed");
    }
    var ingreds = recipe.ingredients;
    for (var i in ingreds){
        console.log(ingreds[i]);
        $("#ingredients").append('<li>'+ingreds[i].quantity+" "+ingreds[i].unit+" of "+ingreds[i].name+"</li>");
    }
    var steps = recipe.directions
    for (var i in steps){
        $("#steps").append("<li>"+steps[i]+"</li>");
    }
}

$(document).ready(function() {

    let url;
    if (window.location.href.includes('localhost')) {
        url = 'http://localhost:5000/cookbook';
    } else if (window.location.href.includes('https://sous-chef-assistant.herokuapp.com/')) {
        url = 'https://sous-chef-assistant.herokuapp.com/cookbook';
    } else if (window.location.href.includes('https://master-heroku-souchef.herokuapp.com/')) {
        url = 'https://master-heroku-souchef.herokuapp.com/cookbook';
    } else if (window.location.href.includes('http://sous-chef-assistant.herokuapp.com/')) {
        url = 'http://sous-chef-assistant.herokuapp.com/cookbook';
    } else if (window.location.href.includes('http://master-heroku-souchef.herokuapp.com/')) {
        url = 'http://master-heroku-souchef.herokuapp.com/cookbook';
    }

    //jquery getJSON() isn't working for me, trying code from 
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
            $.each(recipesDoc.recipes, function(index, value) {
                $("#recipeList").append($("<option></option>").attr("value",index)
                .text(value.name));
            });
            if (recipesDoc.recipes.length > 0){
                var defaultRecipe = recipesDoc.recipes[0];
                populate(defaultRecipe);
            }
            $("#recipeList").change(function() {
                var selected = $(this).val();
                console.log("input: " + selected);
                var  recipe = recipesDoc.recipes[parseInt(selected)];
                populate(recipe);
        
            });
        }
        
    });

    
    /*
    $.getJSON("http://localhost:5000/:userid/cookbook?callback=?", success=function(rawRecipes, status, xhr){
        //Used https://stackoverflow.com/questions/22743287/uncaught-syntax-error-unexpected-token-getjson as reference
        console.log ("success begun");

        result = PJSON.parse(rawRecipes);
        result.recipes.map(function(i, recipe) {
            $("recipeList").append($("<option></option>").attr("value",i).text(recipe.name));
        });
    
        $("selectRecipe").submit(function() {
            var $inputs = $('#selectRecipe :input');
    
            var  recipe = result.recipes[$inputs[0]];
    
            if (recipe.prep_time != undefined && recipe.prep_time != null){
                $("#prep_time").html(recipe.prep_time);
            }
            if (recipe.make_time != undefined && recipe.make_time != null) {
                $("#make_time").html(recipe);
            }
            for (ingredient in recipe.ingredients){
                $("ingredients").append('<li>'+ingredient.quantity+" "+ingredient.name+"</li>");
            }
            for (step in recipe.directions){
                $("steps").append("<li>"+step+"</li>");
            }
    
        });
    });
    */
    /*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://localhost:5000/:userid/cookbook?callback=?", true);
    
    

    xhr.send();
    xhr.onload = function() {
        console.log (xhr);

        result = JSON.parse(rawRecipes);
        result.recipes.map(function(i, recipe) {
            $("recipeList").append($("<option></option>").attr("value",i).text(recipe.name));
        });
    
        $("selectRecipe").submit(function() {
            var $inputs = $('#selectRecipe :input');
    
            var  recipe = result.recipes[$inputs[0]];
    
            if (recipe.prep_time != undefined && recipe.prep_time != null){
                $("#prep_time").html(recipe.prep_time);
            }
            if (recipe.make_time != undefined && recipe.make_time != null) {
                $("#make_time").html(recipe);
            }
            for (ingredient in recipe.ingredients){
                $("ingredients").append('<li>'+ingredient.quantity+" "+ingredient.name+"</li>");
            }
            for (step in recipe.directions){
                $("steps").append("<li>"+step+"</li>");
            }
    
        });
    }
    */
});

function jsonCallback(jsonObject){
    console.log(jsonObject);
    recipesDoc = jsonObject;
}