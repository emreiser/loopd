var Loopd = Loopd || {};

Loopd.renderAllPosts = function(posts){
  $("#posts").empty();
  if(posts.length > 0 ){
    posts.sort(function(a,b) { return (new Date(b.pub_date) - new Date(a.pub_date)) } );
  };

  $.each(posts, function(i, post) {
    var new_post = new Loopd.Post(post);
    $("#posts").append(new_post.buildPost());

    // If the post has content, allow user to toggle show
    if ($('#post_content_' + new_post.id).length > 0) {
      $('#post_toggle_' + new_post.id).click(function() {
        $('#post_content_' + new_post.id).toggle()
      });
      $('#post_content_' + new_post.id).hide()
    }
  });
};

Loopd.renderHomePosts = function(posts){
  $("#posts .home-page").empty();
  if(posts.length > 0 ){
    posts.sort(function(a,b) { return (new Date(b.pub_date) - new Date(a.pub_date)) } );
  };

  $.each(posts, function(i, post) {
    var new_post = new Loopd.Post(post);
    $("#posts .home-page").append(new_post.buildPost());

    // If the post has content, allow user to toggle show
    if ($('#post_content_' + new_post.id).length > 0) {
      $('#post_toggle_' + new_post.id).click(function() {
        $('#post_content_' + new_post.id).toggle()
      });
      $('#post_content_' + new_post.id).hide()
    }
  });
};

Loopd.renderFilteredPosts = function(event){
  var feed_id = event.target.attributes['data-feed-id'].value, id = feed_id.split('feed_').pop();
  $("li[data-feed-id='" + id +"']").addClass('selected');

  if(id === 'all'){
    Loopd.renderAllPosts(Loopd.posts);
    Loopd.hideTagForm();
  } else {
    Loopd.renderAllPosts(Loopd.filterByFeed(Loopd.posts, id));
    Loopd.showTagForm(id);
  };
};
