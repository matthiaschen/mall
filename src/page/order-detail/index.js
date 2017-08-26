'user strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js')
var navSide = require('page/common/nav-side/index.js');
var _cm = require('util/cm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');



var page = {
	data:{
	    orderNumber: _cm.getUrlParam('orderNumber')	
	},
	init: function(){
		this.onLoad();
		this.bindEvent();

	},
	bindEvent:function(){
		var that =this;
		$(document).on('click', '.order-cancel',function(){
			if(window.confirm('确定取消订单?')){
			 _order.cancelOrder(that.data.orderNumber, function(res){
			 		_cm.successTips("订单取消成功");
			 		that.loadOrderDetail();
			 	}, function(errMsg){
			 		_cm.errorTips(errMsg);
			 	})
			 }
		});
	},

	onLoad: function(){
		this.loadOrderDetail();
		 navSide.init({name:'order-list'});
	},

	loadOrderDetail:function(){
		var orderDetailHtml = '',
			that = this,
			$content=$('.content');
			$content.html('<div class = "loading"></div>');
		_order.getOrderDetail(this.data.orderNumber
			,function(res){
				that.dataFilter(res);
				//判断列表是否有内容
				orderDetailHtml = _cm.renderHtml(templateIndex, res);
				$content.html(orderDetailHtml);
			},function(errMsg){
				$content.html('<p class="err-tip">' +errMsg + '</p>')
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
	},
	dataFilter: function(data){
		data.needPay = data.status===10;
		data.isCancelable = data.status===10;

	}
	

};


$(function(){
	page.init();
});