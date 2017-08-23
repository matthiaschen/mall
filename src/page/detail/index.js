'user strict'
require('./index.css');

require('page/common/nav/index.js');
require('page/common/header/index.js');
var _cm = require('util/cm.js');
var _product = require('service/product-service.js');
var cart = require('service/cart-service.js');
var templateIndex = require('./index.string');
var page = {
	data:{
		productId : _cm.getUrlParam('productId')   || ''
		},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		if(!this.data.productId){
			_cm.goHome;

		}
		this.loadDetail();
	},

	bindEvent: function(){

	},
	loadDetail:function(){
		var that =this;
		var html = '', $pageWrap = $('.page-wrap');
		$pageWrap.html('<div class = "loading"></div>')
		_product.getProuctDetail(this.data.productId,
			function(res){
				that.filter(res);
				html = _cm.renderHtml(templateIndex,res);
				$('.page-wrap').html(html);	
			}
			,function(errMsg){
                $('.page-wrap').html("<p class = 'err-tip'>此商品已下架<p/>")
			});
	},
	filter:function(data) {
		data.subImages = data.subImages.split(',');
	}
	

};
$(function(){
	page.init();
})

