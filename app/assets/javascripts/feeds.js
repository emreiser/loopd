$(document).ready(function() {
	Loopd.getPosts();
	$('#new-feed-form').submit(Loopd.createNewFeed(event));
});

var Loopd = Loopd || {};

Loopd.getPosts = function() {
	$.ajax({
		url: '/feeds',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		response = data;

		Loopd.posts = response.posts;
		Loopd.posts.sort(function(a,b) { return (new Date(b.created_at) - new Date(a.created_at)) } );
		Loopd.renderAllPosts(response.posts);

		alert('gotcha')
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}

Loopd.renderAllPosts = function(posts) {
	var posts = posts;
	$('#posts').empty();

	for(var i = 0; i < posts.length; i++){
		// create new object for each post
	  	var post = new Loopd.Post(posts[i]);
	  	// append the post to the page
	  	$('#posts').append(post.buildPost());
	  };
};

Loopd.createNewFeed = function(event) {
	alert('clicked');
	event.preventDefault();

}
