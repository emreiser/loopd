$(document).ready(function() {
	Loopd.getPosts();
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
