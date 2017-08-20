
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
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:  function(){
		this.loadStepUsername();
	},
	bindEvent: function(){
		  var that = this;
		  $('#submit-username').click(function(){
		  	   var username = $.trim($('#username').val());
		  	   if(username){
		  	   	_user.getQuestion(username,function(res){
		  	   		that.data.username = username;
		  	   		that.data.question = res;
		  	   		that.loadStepQuestion();
		  	   		}, function(errMsg){
		  	   			formError.show(errMsg);
		  	   		});
		  	   }
		  	   else{
		  	   	formError.show('请输入用户名')
		  	   }
		  });
		  $('#submit-question').click(function(){
		  	var answer = $.trim($('#answer').val());
            if(answer){
                _user.checkAnswer({
                	username : that.data.username,
                	question : that.data.question,
                	answer   : answer
                }, function(res){
                	that.data.answer   = answer;
                	that.data.token    = res;
                	that.loadStepPassword();
                }, function(errMsg){
                	formError.show(errMsg);
                });
            }
            else{
            	formError.show('请输入密码提示问题答案');
            }
        });

		   $('#submit-password').click(function(){
		  	   var password = $.trim($('#password').val());
		  	   if(password && password.length >=6){
		  	   	_user.resetPassword({username: that.data.username,
		  	   		passwordNew: password, forgetToken: that.data.token},function(res){
		  	   		window.location.href = './result.html?type=pass-reset';
		  	   		}, function(errMsg){
		  	   			formError.show(errMsg);
		  	   		});
		  	   }
		  	   else{
		  	   	formError.show('请输入不小于6位的新密码')
		  	   }
		  });
	
	},

	loadStepUsername:function(){
		$('.step-username').show();

	},

	loadStepQuestion:function(){
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
	},

	loadStepPassword:function(){
			formError.hide();
		$('.step-question').hide().siblings('.step-password').show();
	},



};


$(function(){
	page.init();
});