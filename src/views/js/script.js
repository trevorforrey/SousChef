$(document).ready(function(){

	$("#ingredient").click(function(){
		//$.getElementById('responce').innerHTML+='<br/><input type="text"/><br/>';

		var ingredient_field = $(document.createElement('input'))
	         .attr("type", "text")
	         .attr("class", "ingredient_field");
	         
	         $(".ingredient-fields li").append(ingredient_field).append("<br />");
	         
	    console.log(1);
	});
		
});