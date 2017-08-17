'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _cm = require('util/cm.js');


$(function(){
	var type = _cm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success').show();
}) 