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

Loopd.addCategory = function(category){
	var cat_li, cat_ul;
	cat_li = $('<li />', {html: category.name});
	cat_ul = $('<ul />', {id: 'cat_' + category.id});
	cat_li.append(cat_ul);

	$('#all-categories').append(cat_li);
};

Loopd.addAllCategories = function(categories){
	var i = 0, length = categories.length;

	for(;i < length;){
		Loopd.addCategory(categories[i]);
		i = i + 1;
	};
};

Loopd.populateSideBar = function(){
	$('#all-feeds').empty()
	$('#all-categories').empty()
	Loopd.addAllCategories(Loopd.categories);
	Loopd.renderAllFeeds(Loopd.feeds);
};
