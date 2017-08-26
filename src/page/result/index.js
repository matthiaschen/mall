'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _cm = require('util/cm.js');


$(function(){
	var type = _cm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
		if(type==='payment'){
			var orderNumber = _cm.getUrlParam('orderNumber')
			var $orderNumber = $element.find('.order-number');
			$orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
		}
		$element.show();
		
}) 