var Loopd = Loopd || {};

Loopd.Post = function(post) {
	this.id = post.id;
	this.feed_id = post.feed_id;
	this.author = post.author;
	this.summary = post.summary;
	this.title = post.title;
	this.url = post.url;
}

Loopd.Post.prototype.buildPost = function() {
	var postHTML = '<div class="post" id="post_feed_' + this.feed_id + '">';
	postHTML += '<h2>' + this.title + '</h2>';
	postHTML += '<div class="post_summary">' + this.summary + '</div>';
	postHTML += '<div class="post_author">' + this.author + '</div>';
	postHTML += '<a href="' + this.url + '" target="blank">Link to article</a>'
	return postHTML;
}
