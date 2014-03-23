$(document).ready(function(){
	$('#add-category').submit(Loopd.addNewCategory);
	$('#feeds-section').click(Loopd.applyFilter);
});

var Loopd = Loopd || {};

// Adds a new category based on form entry in sidebar
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
		// Let's add the response message
		Loopd.addCategoryMessage(data.message);
		$cat_name.val('');
		// If we get a new category in our response, push that to the category array
		if(data.category){ Loopd.categories.push(data.category) }
		// Repopulate the sidebar with new category included
		Loopd.populateSideBar();

	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

};

// Filters posts by category
Loopd.filterByCategory = function(category){
	var i = 0,
			feeds = category.feeds,
			length = feeds.length,
			filtered_posts = [];
	// For each feed in a category, add posts to a new 'filtered posts' array
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

// Returns the categort for a given id
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

// Renders posts for a given category
Loopd.renderFilteredCategory = function(event){
  var cat_id = event.target.attributes['data-cat-id'].value;
  $(event.target).addClass('selected');
  Loopd.renderAllPosts(Loopd.filterByCategory(Loopd.getCategoryById(cat_id)));

};

// Deletes a category
Loopd.deleteCategory = function(){
	var cat_id = event.target.parentElement.attributes['data-cat-id'].value;

	var confirmation = confirm("Are you sure you want to delete this category?");
	if (confirmation === true) {

		$.ajax({
			url: '/categories/' + cat_id,
			type: 'DELETE',
			dataType: 'json',
			data: {id: cat_id},
		})
		.done(function(data) {
			Loopd.refreshArrays(data);
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
	$('#category-message').empty();
	$('#category-message').append(message);
	$('#category-message').animate({ opacity: 100 });
	$('#category-message').delay(2000).animate({ opacity: 0 });
}
