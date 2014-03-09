var Loopd = Loopd || {};

Loopd.getHomePosts = function(){
	$.ajax({
		url: '/home',
		type: 'GET',
		dataType: 'json'
	})

	.done(function(data) {
		console.log("success");
		Loopd.posts = data.posts;
		Loopd.renderAllPosts(Loopd.posts);
	})

	.fail(function() {
		console.log("error");
	});

};
