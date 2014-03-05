var Loopd = Loopd || {};

Loopd.renderAllPosts = function(posts){
  $("#posts").empty();
  posts.sort(function(a,b) { return (new Date(b.created_at) - new Date(a.created_at)) } );

  $.each(posts, function(i, post) {
    var new_post = new Loopd.Post(post);
    $("#posts").append(new_post.buildPost());
  });
};
