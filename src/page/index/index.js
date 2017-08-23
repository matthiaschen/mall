'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js')
var navSide = require('page/common/nav-side/index.js')
var templateBanner = require('./banner.string')

require('util/slider/index.js')

var _cm = require('util/cm.js');

$(function() {
    // 渲染banner的html
    var bannerHtml  = _cm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider({dots:true});

   $('.banner-con .banner-arrow').click(function(){
   		var forward = $(this).hasClass('prev')? 'prev':'next';
   		$slider.data('unslider')[forward]();
   })
});