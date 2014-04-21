$(document).ready(function(){
	Loopd.getData();
	$('#alerts').delay(3000).animate({opacity: 0});
  $('#all-categories #all-feeds').on("mouseover", Loopd.toggleDelete);
});

var Loopd = Loopd || {};

// Gets all of the data on page load
Loopd.getData = function(){
	$.ajax({
		url: '/feeds',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		console.log("success");
		Loopd.refreshArrays(data);
		// populate the sidebar w/ feeds, categories
		Loopd.populateSideBar();
		// and let's render all of the user's posts
		Loopd.renderAllPosts(Loopd.posts);
	})

	.fail(function() {
		console.log("error");
	});

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

// Handles sorting for categories and feeds
Loopd.applyFilter = function(event){
	$('#feeds-section').find("p").removeClass('selected');
	$('#feeds-section').find("li").removeClass('selected');
	$('#tag-feed').attr('class', 'hide');

	// Filter based on class of clicked object
	if($(event.target).hasClass('feed')){
		Loopd.renderFilteredPosts(event);
	} else if($(event.target).hasClass('category')){
		Loopd.renderFilteredCategory(event);
	} else {
		Loopd.renderAllPosts(Loopd.posts);
	}
};

// Resets feeds, categories, and posts after a deletion
Loopd.refreshArrays = function(data){
	Loopd.feeds = JSON.parse(data.feeds);
	Loopd.categories = JSON.parse(data.categories);
	Loopd.posts = data.posts;
};

Loopd.toggleDelete = function(event){
  console.log(event.currentTarget);
	$(event.currentTarget).children('.delete-button, .delete-cat-button').toggleClass('hide');
};
