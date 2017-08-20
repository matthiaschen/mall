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
		this.bindEvent();
	},
	onLoad: function(){
		 navSide.init({name:'user-center'});
		 this.loadUserInfo();

	},
	//注意事件冒泡原理
	bindEvent:  function(){
		var that = this;
		$(document).on('click', '.btn-submit', function(){
			var userInfo ={
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val()),
			};
			validateResult = that.formValidate(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo, function(res, msg){
					_cm.successTips(msg);
					window.location.href = './user-center.html';
				}, function(errMsg){
					_cm.errorTips(errMsg);
				});
            }
            else{
                _cm.errorTips(validateResult.msg);
            }
		});

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
	},
	formValidate:function(formData){
		var result = {
			status: false,
			msg: ''
		}; 
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