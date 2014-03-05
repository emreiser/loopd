var Loopd = Loopd || {};

Loopd.Post = function(post) {
	this.id = post.id;
	this.feed_id = post.feed_id;
	this.author = post.author;
	this.summary = post.summary;
	this.title = post.title;
	this.url = post.url;
	this.created_at = post.created_at
}

Loopd.Post.prototype.buildPost = function() {
	var postHTML = '<div class="post" id="post_feed_' + this.feed_id + '">';
	postHTML += "<h3><a href='" + this.url + "' target='_blank'>" + this.title + "</a></h3>";
	postHTML += '<div class="post_summary"><p>' + this.summary + '</p></div>';
	postHTML += '<div class="post_author">' + this.author + ' | Published: ' + Loopd.convertPostTime(this.created_at) + '</div>';
	return postHTML;
}

Loopd.convertPostTime = function(time) {
	var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var dateObj = new Date(time);
	var anotherDate = m_names[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear() + " at " + dateObj.getHours() + ":" + dateObj.getMinutes();
	return anotherDate
}
