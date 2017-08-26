'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _cm             = require('util/cm.js');
var _order           = require('service/order-service.js');
var _address           = require('service/address-service.js');

var templateAddress   = require('./address-list.string');
var templateProduct   = require('./product-list.string');
 var addressModal = require('./address-modal.js');

var page = { 
    data:{
        selectedAddressId:null,

    },

    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();

    },
    bindEvent : function(){
        var that = this;
        //选择地址
        $(document).on('click', '.address-item', function(){
           $(this).addClass('active').siblings('.address-item').removeClass('active');
           that.data.selectedAddressId = $(this).data('id');
        });
        //订单提交
         $(document).on('click', '.order-submit', function(){
              var shippingId = that.data.selectedAddressId;
              if(shippingId){
                    _order.createOrder({
                        shippingId: shippingId
                    }, function(res){
                        window.location.href = './payment.html?oderNumber =' + res.orderNo;
                    }
                    ,function(errMsg){
                        _cm.errorTips(errMsg);
                    })
              }else{
                _cm.errorTips('请选择地址后再提交')
              }

        });
         //新增地址
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate:false,
                /*添加成功后回调*/
                onSuccess:function(){
                    that.loadAddressList();
                }
            });
        });
        //编辑地址
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId  = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res){
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function(){
                        that.loadAddressList();
                    }
                })
            }, function(errMsg){
                _cm.errorTips(errMsg);
            })

        });
        //地址删除
         $(document).on('click', '.address-delete', function(e){
             e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if(window.confirm('确认删除?')){
                _address.deleteAddress(id,function(res){ that.loadAddressList();

                    }
                    ,function(errMsg){
                        _cm.errorTips(errMsg);
                    })
            }
        });

        

},
loadAddressList : function(){
    var  that = this;
    $('.address-con').html('<div class = "loading"></div>');
    _address.getAddresstList(function(res){
        that.addressFilter(res);
        var addressListHtml = _cm.renderHtml(templateAddress,res);
        $('.address-con').html(addressListHtml);
    }, function(errMsg){
        $('.address-con').html('<p class="err-tip">地址加载失败</p>');
    })
},
//处理地址列表的选中状态
addressFilter:function(data){
    if(this.data.selectedAddressId){
        var selectedAddressIdFlag = false;
        for (var i = 0, length=data.list.length; i<length;i++){
            if(data.list[i].id === this.data.selectedAddressId){
                data.list[i].isActive = true;
                selectedAddressIdFlag = true;
            };
            //如果已选择列表已删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        };

    } 

},
loadProductList : function(){
    var  that = this;
    $('.product-con').html('<div class = "loading"></div>');
    _order.getProductList(function(res){
        var productListHtml = _cm.renderHtml(templateProduct,res);
        $('.product-con').html(productListHtml);
    }, function(errMsg){
        $('.product-con').html('<p class="err-tip">商品列表加载失败</p>');
    })
},

filter : function(data){
    data.notEmpty = !!data.cartProductVoList.length;
},
showCartError:function(){
    $('.page-wrap').html('<p class="err-tip">出错了</p>')
}
};

$(function(){
    page.init();
}) 