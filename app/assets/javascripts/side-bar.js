$(document).ready(function(){
	$('#nav-bar-toggle-button').click(Loopd.toggleSideBar);
});

var Loopd = Loopd || {};

Loopd.toggleSideBar = function(){
	$('#nav-bar-content').toggleClass('show');
	$('#page').toggleClass('side-bar-open');
};

Loopd.renderFeed = function(feed){
	var new_feed = new Loopd.Feed(feed);
	new_feed.addToAllFeeds();
	new_feed.addToCategories();
};

Loopd.renderAllFeeds = function(feeds){
	var i = 0, length = feeds.length;

	for(;i < length;){
		Loopd.renderFeed(feeds[i]);
		i = i + 1;
	};
};

Loopd.renderCategory = function(category){
	var category = new Loopd.Category(category);
	$('#all-categories').append(category.renderMe());
};

Loopd.renderAllCategories = function(categories){
	var i = 0, length = categories.length;
	availableTags = [];

	for(;i < length;){
		Loopd.renderCategory(categories[i]);
		availableTags.push(categories[i].name)
		i = i + 1;
	};
};

Loopd.populateSideBar = function(){
	$('#all-feeds').empty();
	$('#all-categories').empty();
	Loopd.renderAllCategories(Loopd.sortByField(Loopd.categories, 'name'));
	Loopd.renderAllFeeds(Loopd.sortByField(Loopd.feeds, 'name'));

	$('#all-feeds .delete-button').click(Loopd.deleteFeed);
	$('#all-categories .delete-button').click(Loopd.removeFeedFromCategory);
	$('#all-categories .delete-cat-button').click(Loopd.deleteCategory);

	$(function() {
    $( "#tag_name" ).autocomplete({
      source: availableTags,
      messages: {
              noResults: '',
              results: function() {}
          }
    });
	});
};
