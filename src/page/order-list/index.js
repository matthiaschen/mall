'user strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js')
var navSide = require('page/common/nav-side/index.js');
var _cm = require('util/cm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');



var page = {
	data:{
		listParam:{
			pageNum:1,
			pageSize:10
		}
	},
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		this.loadOrderList();
		 navSide.init({name:'order-list'});
	},

	loadOrderList:function(){
		var orderListHtml = '',
			that = this,
			$listCon=$('.order-list-con');
			$listCon.html('<div class = "loading"></div>');
		_order.getOrderList(this.data.listParam
			,function(res){
				//判断列表是否有内容
				orderListHtml = _cm.renderHtml(templateIndex, res);
				$listCon.html(orderListHtml);
				that.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage         : res.prePage,
				hasNextPage     : res.hasNextPage,
				nextPage        : res.nextPage,
				pageNum         : res.pageNum,
				pages           : res.pages
				});
			},function(errMsg){
				$listCon.html('<p class="err-tip">加载订单失败</p>')
			})
	},
	loadPagination:function(pageInfo){
    	var that = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage : function(pageNum){
                that.data.listParam.pageNum = pageNum;
                that.loadOrderList();
            }

        }));
	}
	

};


$(function(){
	page.init();
});