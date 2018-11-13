
QUnit.test('test', function(assert){
	assert.equal(1, 1, 'One is one');
});
QUnit.test('button test',function(assert){
	$("#upload").triggerHandler("click");
	var done=assert.async();
	var xhr = $.ajax({
    type: 'POST',
    url:    'http://localhost:5000/postRecipe'
	}).done(function(data){
		console.log("Response: "+data);
        assert.equal(data, 'success', 'Response text should be success');
        done();
	 
    });

})



