var Loopd = Loopd || {};

Loopd.getHomePosts = function(){
	$.ajax({
		url: '/home',
		type: 'GET',
		dataType: 'json'
	})

	.done(function(data) {
		console.log("success");
		response = data;
		//Loopd.refreshArrays(data)

		// Loopd.populateSideBar();
		Loopd.posts = response.posts
		Loopd.renderAllPosts(Loopd.posts);
	})

	.fail(function() {
		console.log("error");
	})

};
