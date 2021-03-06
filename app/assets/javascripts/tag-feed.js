$(document).ready(function(){
	$('#tag-feed').submit(Loopd.tagFeed);

});

var Loopd = Loopd || {};

Loopd.showTagForm = function(feed_id){
	$('#tag-feed').toggleClass('hide');
	$('#tag-feed').attr('data-feed-id', feed_id);
};

Loopd.hideTagForm = function(){
	$('#tag-feed').attr('class', 'hide');
};

// Adds a feed to a given category
Loopd.tagFeed = function(event){
	event.preventDefault();
	var $cat_name = $('#tag-feed').find('#tag_name'), feed_id;
	feed_id = $('#tag-feed').attr('data-feed-id');

	$.ajax({
		url: '/tag_feed',
		type: 'POST',
		dataType: 'json',
		data: {tag: { feed: feed_id, name: $cat_name.val()}}
	})
	.done(function(data) {
		$cat_name.val('');
		Loopd.addFeedMessage(data.message);
		Loopd.feeds = JSON.parse(data.feeds);
		Loopd.categories = JSON.parse(data.categories);
		// populates the sidebar with new relationship
		Loopd.populateSideBar();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

};
