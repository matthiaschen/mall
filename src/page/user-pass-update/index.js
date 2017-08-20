'user strict'
require('./index.css');

require('page/common/nav/index.js');
require('page/common/header/index.js')
var navSide = require('page/common/nav-side/index.js');
var _cm = require('util/cm.js');
var _user = require('service/user-service.js');



var page = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		 navSide.init({name:'user-pass-update'});

	},
	//注意事件冒泡原理
	bindEvent:  function(){
		var that = this;
		$(document).on('click', '.btn-submit', function(){
			var userInfo ={
				password: $.trim($('#password').val()),
				passwordNew: $.trim($('#password-new').val()),
				passwordConfirm: $.trim($('#password-confirm').val()),
			};
			validateResult = that.formValidate(userInfo);
			if(validateResult.status){
				_user.updatePassword({passwordOld: userInfo.password, passwordNew: userInfo.passwordNew}, function(res, msg){
					_cm.successTips(msg);
				}, function(errMsg){
					_cm.errorTips(errMsg);
				});
            }
            else{
                _cm.errorTips(validateResult.msg);
            }
		});

	},

	formValidate:function(formData){
		var result = {
			status: false,
			msg: ''
		}; 
		if(!_cm.validate(formData.password, 'require')){
			result.msg = '原密码不能为空';
			return result;
		};
		if(!formData.passwordNew|| formData.passwordNew.length<6)
		{
			result.msg = '密码长度不能小于6位';
			return result;
		};
		if(formData.passwordNew !== formData.passwordConfirm){
			result.msg = '两次输入密码不一致';
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