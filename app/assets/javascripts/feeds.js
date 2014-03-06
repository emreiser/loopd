$(document).ready(function() {
	$('#new-feed-form').submit(Loopd.createNewFeed);
});

var Loopd = Loopd || {};

Loopd.createNewFeed = function(event) {
	event.preventDefault();
	$('#messages').empty();
	var $form = $(event.target),
			$url = $form.find('input[id="feed_url"]');


	$.ajax({
		url: '/feeds',
		type: 'POST',
		dataType: 'json',
		data: {feed: {url: $url.val()} }
	})
	.done(function(data) {
		debugger
		$url.val('');
		console.log("success");
		var response = data;

		// Add message data
		Loopd.addFeedMessage(data.message);

		if(data.posts) {
			Loopd.addNewFeedPosts(data.posts);
			Loopd.feeds.push(data.feed);
		}

		Loopd.populateSideBar();
		Loopd.renderAllPosts(Loopd.posts);
	})

	.fail(function() {
		console.log("error");
	});

};

Loopd.addNewFeedPosts = function(post_array) {
	for (i = 0; i < post_array.length; i++) {
		Loopd.posts.push(post_array[i]);
	}
};

Loopd.addFeedMessage = function(message){
	var message = '<div class="message">' + message + '</div>';
	$('#messages').append(message);
};

Loopd.filterByFeed = function(posts_array, feed_id){
	var i = 0, length = posts_array.length, filtered_posts = [];

	for(;i < length;){
		if(posts_array[i].feed_id === parseInt(feed_id)){
			filtered_posts.push(posts_array[i]);
		};
		i = i + 1;
	};
	return filtered_posts;
};

