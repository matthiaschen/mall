'use strict';

var _cm  = require('util/cm.js');
var _address = require('service/address-service.js');
var _address           = require('service/address-service.js');

var templateAddressModal   = require('./address-modal.string');
var _cities  = require('util/cities/index.js');



var addressModal = {
    show: function(option){
        this.option = option;
        this.option.data = option.data||{};
        this.$modalWrap = $('.modal-wrap');
        //渲染页面
        this.loadModal();
        this.bindEvent();
    },
    hide:function(){
        this.$modalWrap.empty();
    },
    bindEvent:function(){
        var that = this;
        //省份与城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            that.loadCities(selectedProvince);
        });
        
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo = that.getReceiverInfo(),
            isUpdate = that.option.isUpdate;
            //使用新地址且验证通过
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data,function(res){
                    _cm.successTips('地址添加成功');
                    that.hide();
                    typeof  that.option.onSuccess==='function'&&  that.option.onSuccess(res);
                }
                    ,function(errMsg){
                        _cm.errorTips(errMsg);
                    })
            }
            //更新收件人，且验证通过
            else if (isUpdate && receiverInfo.status){
                 _address.update(receiverInfo.data,function(res){
                    _cm.successTips('地址更新成功');
                    that.hide();
                    typeof  that.option.onSuccess==='function'&&  that.option.onSuccess(res);
                }
                    ,function(errMsg){
                        _cm.errorTips(errMsg);
                    })
            }
            else{
                _cm.errorTips(receiverInfo.errMsg||'发生错误')
            }
        });
        //放置冒泡操作
        this.$modalWrap.find('.modal-contain').click(function(e){
            e.stopPropagation();
        });
        //点击关闭弹窗
        this.$modalWrap.find('.close').click(function(){
            that.hide();
        });
    },  
    loadModal:function(){
        var addressModalHtml = _cm.renderHtml(templateAddressModal, {isUpdate: this.option.isUpdate, data: this.option.data});
        console.log(this.option.data);
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();
        //加载城市
    },
    loadProvince:function(){
        var provinces = _cities.getProvinces()||[],
        $provinceSelect = this.$modalWrap.find('#receiver-province');
         $provinceSelect.html(this.getSelectOption(provinces));
         //回填
         if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
         }
    },
    loadCities:function(provinceName){
        var cities = _cities.getCities(provinceName)||[];
        var $citySelect = this.$modalWrap.find('#receiver-city');

         $citySelect.html(this.getSelectOption(cities));
         //回填
         if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);

        }
    },
    //获取表单里收件人信息
    getReceiverInfo: function(){
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份';
        }else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市';
        }
        else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人地址';
        }
        else if(!receiverInfo.receiverPhone){
            result.errMsg = '请输入收件人手机号';
        }
        else{
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    getSelectOption: function(optionArray){
        var html = '<option value = "">请选择</option>';
        for (var i=0, length = optionArray.length;i<length;i++){
            html+= '<option value = "' + optionArray[i] + '">'+ optionArray[i]+'</option>'
        };
        return html;

    }

};

module.exports = addressModal;
