'use strict';

var _cm = require('util/cm.js');

var _address = {
    //获取地址表信息
     getAddresstList : function(resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/shipping/list.do'),
            data: {
            	pageSize:50 //最多取出50个地址
            },
            success : resolve,
            error   : reject
        });
    },
    //新建地址并保存
    save: function(addressInfo, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success : resolve,
            error   : reject
        });
    },
    update: function(addressInfo, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success : resolve,
            error   : reject
        });
    },
   deleteAddress: function(shippingId, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/shipping/del.do'),
            data: {shippingId: shippingId},
            success : resolve,
            error   : reject
        });
    },

    getAddress: function(shippingId, resolve, reject){
        _cm.request({
            url     : _cm.getServerUrl('/shipping/select.do'),
            data: {shippingId: shippingId},
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _address;
