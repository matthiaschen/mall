'use strict';

require('./index.css');
var _cm = require('util/cm.js');
var templateIndex = require('./index.string');

var navSide = {
	option: {
		name: '',
		navList: [
				{name: 'user-center',desc:'个人中心', href: './user-center.html'},
				{name: 'order-list',desc:'我的订单', href: './order-list.html'},
				{name: 'pass-update',desc:'修改密码', href: './pass-update.html'},
				{name: 'about',desc:'关于CMALL', href: './about.html'}
				]
	},
	init: function(opiton){
		$.extend(this.option, opiton);
		this.renderNav();
	},
	//渲染导航菜单
	renderNav: function(){
		for(var i =0, iLength = this.option.navList.length; i < iLength; i++){
			if (this.option.navList[i].name === this.option.name ){
				this.option.navList[i].isActive = true;
			}
		};
		var navHtml = _cm.renderHtml(templateIndex, {navList:this.option.navList});
		$('.nav-side').html(navHtml);
	}

};

module.exports = navSide;