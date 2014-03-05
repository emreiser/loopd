$.ajax({

  type: 'GET',
  url: '/feeds',
  dataType: 'json'

}).done(function(data) {

  $.each(data.posts, function(i, post) {

    console.log(post);
    $("#posts").append("<h3><a href='" + post.url + "'>" + post.title + "</a></h3>");
    $("#posts").append("<p><em>" + post.author + "</em></p>");
    $("#posts").append("<p>" + post.summary + "</p>");

  });

});
