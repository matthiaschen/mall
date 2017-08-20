
'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');
var _cm = require('util/cm.js');
var _user = require('service/user-service.js');


//表单错误信息
var formError ={
	show: function(errMsg){
		$('.error-item').show().find('.error-msg').text(errMsg);
	},
	hide: function(){
		$('.error-item').hide().find('.error-msg').text('');
	}
};


var page = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		  var that = this;
		  $('#submit').click(function(){
		  	   that.submit();
		  });
		  $('.user-content').keyup(function(e){
		  		if(e.keyCode === 13){
		  			that.submit();
		  		}
		  });
	},
	submit: function(){
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
			};
		var validateResult = this.formValidate(formData);
		if(validateResult.status){
			_user.login(formData
				, function(res){
				    window.location.href = _cm.getUrlParam('redirect') || './index.html';	
				}
				, function(errMsg){
						formError.show(errMsg);
				});
		}
		else{
			formError.show(validateResult.msg);
		} 
	},
	//表单验证
	formValidate:function(formData){
		var result = {
			status: false,
			msg: ''
		}; 
		if(!_cm.validate(formData.username, 'require')){
			result.msg = '用户名不能为空 ';
			return result;
		}
		if(!_cm.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}

		result.status = true;
		result.msg = '验证通过';
		return result;
	}


};


$(function(){
	page.init();
});