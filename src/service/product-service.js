'use strict';

var _cm = require('util/cm.js');

var _product = {
	//获取商品列表信息
	 getProductList : function(listParam, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
     getProuctDetail : function(productId, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/product/detail.do'),
            data    : {productId:productId },
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _product;
