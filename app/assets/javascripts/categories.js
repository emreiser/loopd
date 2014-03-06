$(document).ready(function(){
	$('#add-category').submit(Loopd.addNewCategory);

});

var Loopd = Loopd || {};

Loopd.addNewCategory = function(event){
	event.preventDefault();
	$('#category-message').empty();
	var $cat_name = $('#add-category').find('#category_name');

	$.ajax({
		url: '/categories',
		type: 'POST',
		dataType: 'json',
		data: {category: { name: $cat_name.val()}},
	})
	.done(function(data) {
		Loopd.addCategoryMessage(data.message)
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

Loopd.addCategoryMessage = function(message) {
	var message = '<div class="message">' + message + '</div>';
	$('#category-message').append(message);
}
