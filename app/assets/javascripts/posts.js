var Loopd = Loopd || {};

Loopd.renderAllPosts = function(posts){
  $("#posts").empty();
  posts.sort(function(a,b) { return (new Date(b.created_at) - new Date(a.created_at)) } );

  $.each(posts, function(i, post) {
    var new_post = new Loopd.Post(post);
    $("#posts").append(new_post.buildPost());
  });
};

Loopd.renderFilteredPosts = function(event){
  debugger
  var feed_id = event.target.className.split('feed_')[1];
  Loopd.renderAllPosts(Loopd.filterByFeed(Loopd.posts, feed_id));

};
