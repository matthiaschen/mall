
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _cm             = require('util/cm.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');
var _nav            = require('page/common/nav/index.js');

var page = {
    data:{

    },
   
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var that = this;
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
            productId = $this.parents('.cart-table').data('product-id');
            if($this.is(':checked')){
                _cart.selectProduct(productId,function(res){
                    that.renderCart(res);
                },function(errMsg){
                    that.showCartError();
                })
            }
            else{
                _cart.unselectProduct(productId,function(res){
                    that.renderCart(res);
                },function(errMsg){
                    that.showCartError();
                })
            }

        });
         $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    that.renderCart(res);
                },function(errMsg){
                    that.showCartError();
                })
            }
            else{
                _cart.unselectAllProduct(function(res){
                    that.renderCart(res);
                },function(errMsg){
                    that.showCartError();
                })
            }

        });
        $(document).on('click', '.count-btn', function(){
            var $this = $(this),
            $pCount = $this.siblings('.count-input'),
            type = $this.hasClass('plus')? 'plus': 'minus',
            productId = $this.parents('.cart-table').data('product-id'),
            currCount = parseInt($pCount.val()),
            minCount = 1,
            maxCount = parseInt($pCount.data('max')),
            newCount =0; 
            if( type === 'plus'){
                if(currCount >= maxCount){
                    _cm.errorTips('该商品数量达到上限');
                    return;
                }
                newCount = currCount+1;
            };
            if (type === 'minus'){
             if(currCount <= minCount){
                return;
                }
                newCount = currCount-1;
            };
            _cart.updateProduct({productId:productId,
                count: newCount},function(res){
                    that.renderCart(res);
                },function(errMsg){
                    that.showCartError();
                });
        });
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认删除?')){
                var productId = $(this).parents('.cart-table').data('product-id');
                that.deleteCartProduct(productId);
            }
        });
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认删除?')){
                var $selectedItem = $('.cart-select:checked'),
                arrProductIds = [];
                for(var i = 0 ,iLength = $selectedItem.length; i<iLength; i++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                };
                if(arrProductIds.length){
                that.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _cm.errorTips('您未选择需要删除的商品')
                }
            }
        });
        $(document).on('click', '.btn-submit', function(){
            if(that.data.cartInfo && that.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html'
            }
            else{
                _cm.errorTips('请选择商品后再提交')
            }
        })



    },
    loadCart : function(){
        var that = this;
        _cart.getCartList(function(res){
            that.renderCart(res);
        }, function(errMsg){
            $('.page-wrap').html('<p class="err-tip">出错了</p>')
        })
    },
    renderCart: function(data){
        this.filter(data);
        this.data.cartInfo = data;
        var cartHtml = _cm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        _nav.loadCartCount();
        
    },
    //支持批量 批量时productID用逗号分隔
    deleteCartProduct: function(productIds){
        var that = this;
        _cart.deleteProduct(productIds,function(res){
                    that.renderCart(res);
                },function(errMsg){
                    that.showCartError();
                });

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