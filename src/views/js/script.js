$(document).ready(function(){

	$("#ingredient").click(function(){

		var ingredient_field = $(document.createElement('input'))
	         .attr("type", "text")
	         .attr("class", "input-1");

	    var amount_field = $(document.createElement('input'))
	         .attr("type", "text")
	         .attr("class", "input-1");
	    
	    var unit_field = $(document.createElement('input'))
	         .attr("type", "text")
	         .attr("class", "input-1");
	    
	         $(".ingredient-fields li")
	         	.append(ingredient_field)
	         	.append(amount_field)
	         	.append(unit_field)
	         	.append("<br />");
	         
	    console.log(1);
	});

	$("#steps").click(function(){

		var steps_field = $(document.createElement('input'))
	         .attr("type", "text")
	         .attr("class", "input-1");
	         
	         $(".steps-field li").append(steps_field).append("<br />");
	 
	});
	$("submit-button").click(function(){

		$('#upload-recipe-form').submit();

	});

	$("#upload-recipe-form").on("keydown", function(e){
    if (e.which===13) e.preventDefault();
});
		
});