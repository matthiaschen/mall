'use strict';

var _cm = require('util/cm.js');

var _payment = {
     getPaymentInfo : function(orderNumber,resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/order/pay.do'),
            data:{orderNo: orderNumber},
            success : resolve,
            error   : reject
        });
    },
    getPaymentStatus : function(orderNumber,resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/order/query_order_pay_status.do'),
            data:{orderNo: orderNumber},
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _payment;
