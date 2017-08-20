'user strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js')
var navSide = require('page/common/nav-side/index.js');
var _cm = require('util/cm.js');
var templateIndex = require('./index.string');
var _user = require('service/user-service.js');



var page = {
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		 navSide.init({name:'user-center'})
		 this.loadUserInfo();
	},
	loadUserInfo: function(){
		var userHtml ='';
		_user.getUserInfo(function(res){
			userHtml = _cm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}
		, function(errMsg){
			_cm.errorTips(errMsg);
		});
	}

};


$(function(){
	page.init();
});