$.ajax({

  type: 'GET',
  url: '/feeds',
  dataType: 'json'

}).done(function(data) {

  $.each(data.posts, function(i, post) {

    console.log(post);
    var postData = "<div class='post'><h3><a href='" + post.url + "'>" + post.title + "</a></h3>"
        postData += "<p><em>" + post.author + "</em></p>"
        postData += "<p>" + post.summary + "</p></div>"

    $("#posts").append(postData);

  });

});
