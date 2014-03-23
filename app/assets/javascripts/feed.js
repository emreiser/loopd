var Loopd = Loopd || {};

Loopd.Feed = function(feed){
	this.id = feed.id;
	this.name = feed.name;
	this.url = feed.url;
	this.categories = feed.categories || [];
};

Loopd.Feed.prototype = {
	// Creates the HTML to display each feed nested under a category in sidebar
	renderMe: function(){
		var li, name, del_button;
		li = $('<li />', {class: 'feed', "data-feed-id": this.id});
		name = $('<p />', {html: this.name, class: 'inline feed', "data-feed-id": this.id});
		del_button = $('<div />', {class: 'hide delete-button glyphicon glyphicon-remove-sign inline'});
		li.append(name);
		li.append(del_button);
		return li;
	},

	// Adds feed to all feeds div
	addToAllFeeds: function(){
		$('#all-feeds').append(this.renderMe());
	},

	// Adds a feed under each category that it belongs to
	addToCategories: function(){
		var categories = this.categories, i = 0, length = categories.length;

		for(;i < length;){
			$('#cat_' + categories[i].id).append(this.renderMe());
			i = i + 1;
		}
	}
};
