$(document).ready(function() {
	$('#new-feed-form').submit(Loopd.createNewFeed);
	$('#feeds-section').click(Loopd.renderFilteredPosts);
});

var Loopd = Loopd || {};

Loopd.createNewFeed = function(event) {
	event.preventDefault();
	alert('clicked');
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
