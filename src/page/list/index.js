'user strict'
require('./index.css');

require('page/common/nav/index.js');
require('page/common/header/index.js');
var _cm = require('util/cm.js');
var Pagination = require('util/pagination/index.js');

var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
	data:{
		listParam : {
			keyword         : _cm.getUrlParam('keyword')    || '',
			categoryId      : _cm.getUrlParam('categoryId') || '',
			orderBy         : _cm.getUrlParam('orderBy')    || 'default',
			pageNum         : _cm.getUrlParam('pageNum')    || 1,
			pageSize        : _cm.getUrlParam('pageSize')   || 10
		}
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadList();
	},
	bindEvent: function(){

	},
	//加载list数据
	loadList: function(){
		var listHtml = '',
		that = this,
		listParam = this.data.listParam;
		_product.getProductList(listParam, function(res){
			listHtml = _cm.renderHtml(templateIndex, {
                list :  res.list
            });
			$('.p-list-con').html(listHtml);
			that.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage         : res.prePage,
				hasNextPage     : res.hasNextPage,
				nextPage        : res.nextPage,
				pageNum         : res.pageNum,
				pages           : res.pages
			});
		}, function(errMsg){
			_cm.errorTips(errMsg);

		});
	},
	// 加载分页信息
    loadPagination:function(pageInfo){
    	var that = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage : function(pageNum){
                that.data.listParam.pageNum = pageNum;
                that.loadList();
            }

        }));
	}

};
$(function(){
	page.init();
})


