'use strict';

require('./index.css');

var _cm = require('util/cm.js');

var header = {
	init: function(){
		this.bindEvent();
		this.onLoad();
	},
	onLoad: function () {
		 var keyword = _cm.getUrlParam('keyword');
		 if (keyword){
		 	$('#search-input').val(keyword);
		 }
	},
	bindEvent: function(){
		var that  =  this;
		// 点击提交
		$('#search-btn').click(function(){
				that.searchSubmit();
		});
		//回车提交
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				that.searchSubmit();
			}
		})


	},
    //搜索提交
    searchSubmit: function(){
    	var keyword = $.trim($('#search-input').val());
    	if(keyword){
    		window.location.href =  './list.html?keyword=' + keyword;
    	}
    	else{
    		_cm.goHome();
    	}
    }

}


header.init();