
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
		  //验证username
		  $("#username").blur(function(){
		  	var username =  $.trim($(this).val());
		  	//异步验证用户名是否存在
		  	if(!username){
                return;
            };
		  	_user.checkUsername(username
		  		, function(res){
		  			formError.hide();
		  			}   
		  	    , function(errMsg){
		  	    	formError.show(errMsg);
		  	    });
		  });
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
			passwordConfirm: $.trim($('#passwordConfirm').val()),
			phone: $.trim($('#phone').val()),
			email: $.trim($('#email').val()),
			question: $.trim($('#question').val()),
			answer: $.trim($('#answer').val())
			};
		var validateResult = this.formValidate(formData);
		if(validateResult.status){
			_user.register(formData
				, function(res){
				    window.location.href ='./result.html?type=register';	
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
		};
		if(!_cm.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		};
		if( formData.password.length <6 ){
			result.msg = '密码长度不能小于6位';
			return result;};
		if( formData.password !== formData.passwordConfirm ){
			result.msg = '两次输入密码不一致';
			return result;};
		if(!_cm.validate(formData.phone, 'phone')){
			result.msg = '手机号格式不正确';
			return result;
		};
		if(!_cm.validate(formData.email, 'email')){
			result.msg = '邮箱格式不正确';
			return result;
		};
		if(!_cm.validate(formData.question, 'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		};
		if(!_cm.validate(formData.answer, 'require')){
			result.msg = '提示问题答案不能为空';
			return result;
		};
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};


$(function(){
	page.init();
});