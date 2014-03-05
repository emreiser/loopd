$(document).ready(function(){
	Loopd.getData();
});

var Loopd = Loopd || {};

Loopd.getData = function(){
	$.ajax({
		url: '/feeds',
		type: 'GET',
		dataType: 'json'
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
	})

};
