var Loopd = Loopd || {};

Loopd.renderAllPosts = function(posts){
  $("#posts").empty();
  if(posts.length > 0 ){
    posts.sort(function(a,b) { return (new Date(b.pub_date) - new Date(a.pub_date)) } );

    $.each(posts, function(i, post) {
      var new_post = new Loopd.Post(post);
      $("#posts").append(new_post.buildPost());
    });
  }
};

Loopd.renderFilteredPosts = function(event){
  var id = event.target.attributes['data-feed-id'].value;

  $('#feeds-section ul').children("li").removeClass('selected');
  $("li[data-feed-id='" + id +"']").addClass('selected');

  if(id === 'all'){
    Loopd.renderAllPosts(Loopd.posts);
    Loopd.hideTagForm();
  } else {
    Loopd.renderAllPosts(Loopd.filterByFeed(Loopd.posts, id));
    Loopd.showTagForm(id);
  };
};
