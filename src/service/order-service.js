'use strict';

var _cm = require('util/cm.js');

var _order = {
    //获取商品列表信息
     getProductList : function(resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    createOrder: function(orderInfo, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/order/create.do'),
            data: orderInfo,
            success : resolve,
            error   : reject
        });
    },
    //订单列表
    getOrderList: function(listParam, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/order/list.do'),
            data: listParam,
            success : resolve,
            error   : reject
        });
    },
    //获取订单详情
    getOrderDetail: function(orderNumber, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNumber},
            success : resolve,
            error   : reject
        });
    },
    cancelOrder: function(orderNumber, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNumber},
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _order;
