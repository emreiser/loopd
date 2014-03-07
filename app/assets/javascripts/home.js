$(document).ready(function(){
	Loopd.getHomePosts();
});

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
		Loopd.postsHome = response.posts
		Loopd.renderHomePosts(Loopd.postsHome);
	})

	.fail(function() {
		console.log("error");
	})

};
