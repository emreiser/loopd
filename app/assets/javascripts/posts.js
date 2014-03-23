var Loopd = Loopd || {};

// Sorts all of the posts by date and appends them to "posts" div
Loopd.renderAllPosts = function(posts){
  $("#posts").empty();
  // Sorts the post array
  if(posts.length > 0 ){
    posts.sort(function(a,b) { return (new Date(b.pub_date) - new Date(a.pub_date)); } );
  }
  // For each post, builds the post and appends it
  $.each(posts, function(i, post) {
    var new_post = new Loopd.Post(post);
    $("#posts").append(new_post.buildPost());

    // If the post has content, adds functionality to allow for toggle show
    if ($('#post_content_' + new_post.id).length > 0) {
      $('#post_toggle_' + new_post.id).click(function() {
        $('#post_content_' + new_post.id).toggle();
      });
      $('#post_content_' + new_post.id).hide();
    }
  });
};

// Filters for posts based on a given feed and renders them
Loopd.renderFilteredPosts = function(event){
  var feed_id = event.target.attributes['data-feed-id'].value, id = feed_id.split('feed_').pop();
  $("li[data-feed-id='" + id +"']").addClass('selected');

  // Display all posts
  if(id === 'all'){
    Loopd.renderAllPosts(Loopd.posts);
    Loopd.hideTagForm();
  } else {
  // Display just the posts for the given feed
    Loopd.renderAllPosts(Loopd.filterByFeed(Loopd.posts, id));
    Loopd.showTagForm(id);
  }
};
