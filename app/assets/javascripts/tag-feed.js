$(document).ready(function(){
	$('#tag-feed').submit(Loopd.addNewCategory);
});


var Loopd = Loopd || {};

Loopd.showTagForm = function(feed_id){
	$('#tag-feed').addClass('show ' + feed_id);
};

Loopd.hideTagForm = function(){
	$('#tag-feed').attr('class', 'hide');
};