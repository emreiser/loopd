$(document).ready(function(){
	$('#tag-feed').submit(Loopd.tagFeed);

});


var Loopd = Loopd || {};

Loopd.showTagForm = function(feed_id){
	$('#tag-feed').addClass('show ' + feed_id);
};

Loopd.hideTagForm = function(){
	$('#tag-feed').attr('class', 'hide');
};

Loopd.tagFeed = function(event){
	event.preventDefault();
	var $cat_name = $('#tag-feed').find('#tag_name'), feed_id;
	feed_id = $('#tag-feed').attr('class').split(' ').pop().split('feed_').pop();

	$.ajax({
		url: '/tag_feed',
		type: 'POST',
		dataType: 'json',
		data: {tag: { feed: feed_id, name: $cat_name.val()}}
	})
	.done(function(data) {
		$cat_name.val('');
		Loopd.feeds = JSON.parse(data.feeds);
		Loopd.categories = JSON.parse(data.categories);

		Loopd.populateSideBar();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

};


