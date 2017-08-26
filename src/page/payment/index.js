'user strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js')
var _cm = require('util/cm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');



var page = {
	data:{
	    orderNumber: _cm.getUrlParam('orderNumber')	
	},
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		this.loadPaymentInfo();
	},

	loadPaymentInfo:function(){
		var paymentHtml = '',
			that = this,
			$pageWrap=$('.page-wrap');
			$pageWrap.html('<div class = "loading"></div>');
			_payment.getPaymentInfo(this.data.orderNumber
			,function(res){
				paymentHtml = _cm.renderHtml(templateIndex, res);
				$pageWrap.html(paymentHtml);
				that.listenOrderStatus();
			},function(errMsg){
				$pageWrap.html('<p class="err-tip">' +errMsg + '</p>')
			})
	},
	//监听订单状态
	listenOrderStatus:function() {
		var that = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(that.data.orderNumber, function(res){
				if(res == true){
					window.location.href = './result.html?type=payment&oderNumber' + that.data.orderNumber;
				}
				});

		},5000)
	}
	

};


$(function(){
	page.init();
});