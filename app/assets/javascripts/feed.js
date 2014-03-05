var Loopd = Loopd || {};

Loopd.Feed = function(feed){
	this.id = feed.id;
	this.name = feed.name;
	this.url = feed.url;
	this.categories = feed.categories;
}

Loopd.Feed.prototype = {
	renderMe: function(){
	 return $('<li />', {html: this.name, "data-feed-id": 'feed_' + this.id});
	},

	addToAllFeeds: function(){
		$('#all-feeds').append(this.renderMe());
	},

	addToCategories: function(){
		var categories = this.categories, i = 0, length = categories.length;

		for(;i < length;){
			$('#cat_' + categories[i].id).append(this.renderMe());
			i = i + 1;
		};
	}
};
