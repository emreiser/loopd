$(document).ready(function(){
	$('#nav-bar-toggle-button').click(Loopd.toggleSideBar);

})

var Loopd = {};

Loopd.toggleSideBar = function(){
	$('#nav-bar-content').toggleClass('show');
	$('#page').toggleClass('side-bar-open');
}