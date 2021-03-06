$(document).ready(function() {
	$('#new-feed-form').submit(Loopd.createNewFeed);
});

var Loopd = Loopd || {};

Loopd.alert = function(){
	alert('clicked');
};

// Response is all of the user's posts, with new feed's posts included
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
		$url.val('');
		console.log("success");
		var response = data;

		// Add message data
		Loopd.addFeedMessage(data.message);

		// If new posts are returned, add new posts and new feed to respective arrays
		if(data.posts) {
			Loopd.addNewFeedPosts(data.posts);
			Loopd.feeds.push(data.feed);
		}

		// Populate the side bar
		Loopd.populateSideBar();
		// Render all of the posts in the posts array
		Loopd.renderAllPosts(Loopd.posts);
	})

	.fail(function() {
		console.log("error");
	});

};

Loopd.deleteFeed = function(event){
	var feed_id = event.target.parentElement.attributes['data-feed-id'].value;

	var confirmation = confirm("Are you sure you want to delete this feed?");
	if (confirmation === true) {

		$.ajax({
			url: '/feeds/' + feed_id,
			type: 'DELETE',
			dataType: 'json',
			data: {id: feed_id},
		})
		.done(function(data) {
			// reset feed, category, and post arrays
			Loopd.refreshArrays(data);
			// populate the sidebar
			Loopd.populateSideBar();
			// render all of the posts
			Loopd.renderAllPosts(Loopd.posts);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}

};

// Adds the new feed's posts to the posts array
Loopd.addNewFeedPosts = function(post_array) {
	for (i = 0; i < post_array.length; i++) {
		Loopd.posts.push(post_array[i]);
	}
};

// Adds the HTML for the message that is returned from the AJAX request
Loopd.addFeedMessage = function(message){
	$('#messages').empty();
	$('#messages').append(message);
	$('#messages').animate({ opacity: 100 });
	$('#messages').delay(2000).animate({ opacity: 0 });
};

// Filters posts from posts array by a given feed id
Loopd.filterByFeed = function(posts_array, feed_id){
	var i = 0, length = posts_array.length, filtered_posts = [];

	for(;i < length;){
		// If the post id from the posts array matches the given feed id, push it to new array
		if(posts_array[i].feed_id === parseInt(feed_id)){
			filtered_posts.push(posts_array[i]);
		}
		i = i + 1;
	}
	return filtered_posts;
};

Loopd.getFeedById = function(id){
	var i = 0, length = Loopd.feeds.length, feed;

	for(;i < length;){
		if(Loopd.feeds[i].id === parseInt(id)){
			feed = Loopd.feeds[i];
		}
		i = i + 1;
	}
	return feed;
};

// Removes a feed from it's parent category
Loopd.removeFeedFromCategory = function(){
	var feed_id = event.target.parentElement.attributes['data-feed-id'].value, category_id;
	category_id = $(event.target).closest('.category').attr('data-cat-id');

	var confirmation = confirm("Remove feed from this category?");
	if (confirmation === true) {

		$.ajax({
			url: '/tag_feed/',
			type: 'DELETE',
			dataType: 'json',
			data: {feed_id: feed_id, cat_id: category_id},
		})
		.done(function(data) {
			Loopd.refreshArrays(data);
			Loopd.populateSideBar();
			Loopd.renderAllPosts(Loopd.posts);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}

};
