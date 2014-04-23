$(document).ready(function(){
	$('#nav-bar-toggle-button').click(Loopd.toggleSideBar);
});

var Loopd = Loopd || {};

// Toggles the sidebar
Loopd.toggleSideBar = function(){
	$('#nav-bar-content').toggleClass('show');
	$('#nav-bar-header').toggleClass('show');
	$('#page').toggleClass('side-bar-open');
};

// Appends each feed to the sidebar
Loopd.renderFeed = function(feed){
	var new_feed = new Loopd.Feed(feed);
	new_feed.addToAllFeeds();
	new_feed.addToCategories();
};

// calls renderFeed function on every feed
Loopd.renderAllFeeds = function(feeds){
	var i = 0, length = feeds.length;

	for(;i < length;){
		Loopd.renderFeed(feeds[i]);
		i = i + 1;
	}
};

// Appends each individual category to the sidebar
Loopd.renderCategory = function(category){
	var cat = new Loopd.Category(category);
	$('#all-categories').append(cat.renderMe());
};

// Calls each category to be rendered. Adds category name to available tags array for autocomplete
Loopd.renderAllCategories = function(categories){
	var i = 0, length = categories.length;
	Loopd.availableTags = [];

	for(;i < length;){
		Loopd.renderCategory(categories[i]);
		Loopd.availableTags.push(categories[i].name);
		i = i + 1;
	}
};

// Populates the sidebar with data from Category and Feed arrays
Loopd.populateSideBar = function(){
	$('#all-feeds').empty();
	$('#all-categories').empty();
	// Sorts all categories and then renders them
	Loopd.renderAllCategories(Loopd.sortByField(Loopd.categories, 'name'));
	// Sorts all feeds and then renders them
	Loopd.renderAllFeeds(Loopd.sortByField(Loopd.feeds, 'name'));
	// Add buttons to delete feeds and categories
	$('#all-feeds .delete-button').click(Loopd.deleteFeed);
	$('#all-categories .delete-button').click(Loopd.removeFeedFromCategory);
	$('#all-categories .delete-cat-button').click(Loopd.deleteCategory);
	$('#feeds-section .delete-button, .delete-cat-button').closest('li').mouseenter(Loopd.toggleDelete);
	$('#feeds-section .delete-button, .delete-cat-button').closest('li').mouseleave(Loopd.toggleDelete);
	// Adds each available tag (category) to the autocomplete form
	$(function() {
    $( "#tag_name" ).autocomplete({
      source: Loopd.availableTags,
      messages: {
      	noResults: '',
      	results: function() {}
      }
    });
	});
};
