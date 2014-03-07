var Loopd = Loopd || {};

Loopd.Post = function(post) {
	this.id = post.id;
	this.feed_id = post.feed_id;
	this.author = post.author;
	this.summary = post.summary.substring(0, 400).replace(/<img[^>]*>/g,"").replace(/<br[^>]*>/g,"");
	this.title = post.title;
	this.url = post.url;
	this.pub_date = post.pub_date
	this.content = post.content || [];
}

Loopd.Post.prototype.buildPost = function() {
	var postHTML = '<div class="post" id="post_feed_' + this.feed_id + '">';
	postHTML += "<h3><a href='" + this.url + "' target='_blank'>" + this.title + "</a></h3>";
	if (this.author == null) {
		postHTML += '<div class="post-author"> Published: ' + Loopd.convertPostTime(this.pub_date) + '</div>';
	} else {
		postHTML += '<div class="post-author">' + this.author + ' | ';
		postHTML += ' Published: ' + Loopd.convertPostTime(this.pub_date) + '</div>';
	}
	postHTML += '<div class="post-summary"><p>' + this.summary + ' [...]</p></div>';
	if(!($.isEmptyObject(this.content))) {
		postHTML += '<div id="post_toggle_' + this.id + '" class="post-toggle">Click to toggle post</div>';
		postHTML += '<div class="post_content" id="post_content_' + this.id + '">' + this.content + '</div>';
	};
	return postHTML;
};

Loopd.convertPostTime = function(time) {
	var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var dateObj = new Date(time);
	var anotherDate = m_names[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear() + " at " + dateObj.getHours() + ":" + dateObj.getMinutes();
	return anotherDate
}
