$(document).ready(function(){
	$('#add-category').submit(Loopd.addNewCategory);
	$('#feeds-section').click(Loopd.applyFilter);
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

};

Loopd.filterByCategory = function(category){
	var i = 0,
			feeds = category.feeds,
			length = feeds.length,
			filtered_posts = [];
	for(;i < length;){
		filtered_posts.push(Loopd.filterByFeed(Loopd.posts, feeds[i].id));
		i = i + 1;
	}

	if(filtered_posts.length > 0){
		return filtered_posts.reduce(function(a, b) {
    	return a.concat(b);
		});
	} else {
		return [];
	}
};

Loopd.getCategoryById = function(id){
	var i = 0, length = Loopd.categories.length, category;

	for(;i < length;){
		if(Loopd.categories[i].id === parseInt(id)){
			category = Loopd.categories[i];
		};
		i = i + 1;
	}
	return category;
};

Loopd.renderFilteredCategory = function(event){
  var cat_id = event.target.attributes['data-cat-id'].value;

  $('#feeds-section ul').children("li").removeClass('selected');
  $(event.target).addClass('selected');

  Loopd.renderAllPosts(Loopd.filterByCategory(Loopd.getCategoryById(cat_id)));

};

Loopd.deleteCategory = function(){
	var cat_id = event.target.parentElement.attributes['cat-feed-id'].value;

	var confirmation = confirm("Are you sure you want to delete this category?");
	if (confirmation == true) {

		$.ajax({
			url: '/categories/' + cat_id,
			type: 'DELETE',
			dataType: 'json',
			data: {id: cat_id},
		})
		.done(function(data) {
			Loopd.refreshArrays(data)
			Loopd.populateSideBar();
			Loopd.renderAllPosts(Loopd.posts);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}

}

Loopd.addCategoryMessage = function(message) {
	var message = '<div class="message">' + message + '</div>';
	$('#category-message').append(message);
}
