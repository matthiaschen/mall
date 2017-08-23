
'use strict';
//设计成资源的应用，不是作为独立插件封装
require('./index.css');
var _cm = require('util/cm.js');

var templatePagination = require('./index.string');


var Pagination = function(){
	var that =this;
	this.defaultOption = {
		container: null,
		pageNum: 1,
		pageRange: 3,
		onSelectPage: null
	};

$(document).on('click', '.pg-item', function(){
	var $this = $(this);
	if($this.hasClass('active')||$this.hasClass('disabled')){
		return;
	};
	typeof that.option.onSelectPage ==='function'? that.option.onSelectPage($this.data('value')) : null;
})
};
//渲染分页组件
Pagination.prototype.render = function(userOption){
	this.option = $.extend({}, this.defaultOption, userOption);
	if (!(this.option.container instanceof jQuery)) {
		return;
	}; 
	//判断是否只有一页
	if(this.option.pages <=1){
		return;
	}
	this.option.container.html(this.getPaginationHtml());
};
Pagination.prototype.getPaginationHtml = function(){
	/*|上一页|12345|下一页| 1/2*/
	var option = this.option,
		html = '', 
		pageArray = [], 
		pages = this.option.pages,
		start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
		end = option.pageNum + option.pageRange < pages ? option.pageNum + option.pageRange : pages;
	//上一页按钮处理
	pageArray.push({
		name:'上一页',
		value: this.option.prePage,
		disabled: !this.option.hasPreviousPage
	});
	//数字按钮
	for (var i = start; i<=end;i++){
		pageArray.push({
			name: i ,
		value: i,
		active: (i===option.pageNum)
		})
	};
	pageArray.push({
		name:'下一页',
		value: this.option.nextPage,
		disabled: !this.option.hasNextPage
	});
	html = _cm.renderHtml(templatePagination, {
		pageArray: pageArray,
		pageNum: option.pageNum,
		pages: option.pages
	});
	console.log("html");
	return html;

};
module.exports = Pagination;