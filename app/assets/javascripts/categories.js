$(document).ready(function(){
	$('#add-category').submit(Loopd.addNewCategory);

});

var Loopd = Loopd || {};

Loopd.addNewCategory = function(event){
	event.preventDefault();
	var $cat_name = $('#add-category').find('#category_name');

	$.ajax({
		url: '/categories',
		type: 'POST',
		dataType: 'json',
		data: {category: { name: $cat_name.val()}},
	})
	.done(function(data) {
		$cat_name.val('');
		if(data.category){ Loopd.categories.push(data.category) };
		Loopd.populateSideBar();

	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

}
