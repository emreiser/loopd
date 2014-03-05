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
	})

	.fail(function() {
		console.log("error");
	});

};

