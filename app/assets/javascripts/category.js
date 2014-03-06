var Loopd = Loopd || {};

Loopd.Category = function(category){
	this.id = category.id;
	this.name = category.name;
};

Loopd.Category.prototype = {
	renderMe: function(){
		var cat_li, cat_ul, name, del_button;
		cat_li = $('<li />', {class: 'category', 'data-cat-id': this.id});
		name = $('<p />', {html: this.name, class: 'inline category', "data-cat-id": this.id});
		cat_ul = $('<ul />', {id: 'cat_' + this.id});
		del_button = $('<div />', {class: 'hide delete-cat-button glyphicon glyphicon-remove-sign inline'});

	 cat_li.append(name);
	 cat_li.append(del_button);
	 cat_li.append(cat_ul);
	 return cat_li;
	}
};
