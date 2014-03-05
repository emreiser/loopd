var Loopd = Loopd || {};

Loopd.renderAllPosts = function(posts){
  $("#posts").empty();
  posts.sort(function(a,b) { return (new Date(b.pub_date) - new Date(a.pub_date)) } );

  $.each(posts, function(i, post) {
    var new_post = new Loopd.Post(post);
    $("#posts").append(new_post.buildPost());
  });
};

Loopd.renderFilteredPosts = function(event){
  var feed_id = event.target.className.split('feed_')[1];
  $('#feeds-section').children('ul').children('li').removeClass('selected');
  event.target.className = 'selected';

  if(feed_id === 'all'){
    Loopd.renderAllPosts(Loopd.posts);
  } else {
    Loopd.renderAllPosts(Loopd.filterByFeed(Loopd.posts, feed_id));
  };
};
