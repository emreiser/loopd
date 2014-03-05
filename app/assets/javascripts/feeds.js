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
		Loopd.feeds = JSON.parse(data.feeds);
		Loopd.categories = data.categories;
		Loopd.posts = data.posts;

		Loopd.populateSideBar();
		Loopd.renderAllPosts(Loopd.posts);
	})

	.fail(function() {
		console.log("error");
	});

};

