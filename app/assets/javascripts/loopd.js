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
		Loopd.categories = JSON.parse(data.categories);
		Loopd.posts = data.posts;

		Loopd.populateSideBar();
		Loopd.renderAllPosts(Loopd.posts);
	})

	.fail(function() {
		console.log("error");
	})

};

Loopd.sortByField = function(array, field) {
  return array.sort(
    function (a, b) {
      if (a[field] < b[field]){
        return -1;
      } else if (a[field] > b[field]){
        return 1;
      } else {
        return 0;
      }
    }
  );
};

Loopd.applyFilter = function(event){
	$('#feeds-section').find("p").removeClass('selected');
	$('#feeds-section').find("li").removeClass('selected');

	if($(event.target).hasClass('feed')){
		Loopd.renderFilteredPosts(event);
	} else if($(event.target).hasClass('category')){
		Loopd.renderFilteredCategory(event);
	} else {
		Loopd.renderAllPosts(Loopd.posts);
	}
};

