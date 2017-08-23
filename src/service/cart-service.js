'use strict';

var _cm = require('util/cm.js');

var _cart = {
	getCartCount : function(resolve, reject){
		_cm.request({
			url     : _cm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error   : reject
		});
	},
    addToCart : function(productInfo, resolve, reject){
    	_cm.request({
    		url     : _cm.getServerUrl('/cart/add.do'),
    		data    : productInfo,
    		success : resolve,
    		error   : reject
    	});
    },
    getCartList : function(resolve, reject){
    	_cm.request({
    		url     : _cm.getServerUrl('/cart/list.do'),
    		success : resolve,
    		error   : reject
    	});
    },
    selectProduct : function(productId,resolve, reject){
        _cm.request({
            data:{
                productId: productId
            },
            url     : _cm.getServerUrl('/cart/select.do'),
            success : resolve,
            error   : reject
        });
    },
    unselectProduct : function(productId,resolve, reject){
        _cm.request({
            data:{
                productId: productId
            },
            url     : _cm.getServerUrl('/cart/un_select.do'),
            success : resolve,
            error   : reject
        });
    },
    selectAllProduct : function(resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
        unselectAllProduct : function(resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    updateProduct: function(productInfo,resolve, reject){
        _cm.request({
            data: productInfo,
            url     : _cm.getServerUrl('/cart/update.do'),
            success : resolve,
            error   : reject
        });
    },
    deleteProduct:function(productIds,resolve, reject){
        _cm.request({
            data: {productIds: productIds},
            url     : _cm.getServerUrl('/cart/delete_product.do'),
            success : resolve,
            error   : reject
        });
    },

}

module.exports = _cart;
