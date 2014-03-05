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
  var feed_id = event.target.className, id = feed_id.split('feed_')[1];
  // debugger

  $('#feeds-section').children('ul').children('li').removeClass('selected');
  $(event.target).addClass = 'selected';

  if(id === 'all'){
    Loopd.renderAllPosts(Loopd.posts);
    Loopd.hideTagForm();
  } else {
    Loopd.renderAllPosts(Loopd.filterByFeed(Loopd.posts, id));
    Loopd.showTagForm(feed_id);
  };
};
