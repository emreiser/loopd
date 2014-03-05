$(document).ready(function() {
	$('#new-feed-form').submit(Loopd.createNewFeed);
});

var Loopd = Loopd || {};

Loopd.createNewFeed = function(event) {
	var $form = $(event.target),
			$url = $form.find('input[id="feed_url"]');
	event.preventDefault();
	$.ajax({
		url: '/feeds',
		type: 'POST',
		dataType: 'json',
		data: {feed: {url: $url.val()} }
	})
	.done(function(data) {
		console.log("success");
		var response = data;
		debugger

		Loopd.addMessage(data.message);

		if (data.posts){
			Loopd.addNewFeedPosts(data.posts);
			Loopd.feeds.push(data.feed);
		};

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

Loopd.addMessage = function(message){
	$('#messages').empty();
	var message = '<div class="message">' + message + '</div>';
	$('#messages').append(message);
}
