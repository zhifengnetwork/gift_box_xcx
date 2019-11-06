// pages/commodity/detalis/give/cashgift/cashgift.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    order:'',
    goods_res:'',
    order_id:'',
    order_type:''
  },
  show: function () {
    this.setData({ flag: false })
  },
  hide: function () {
    this.setData({ flag: true })
  },
  integral: function () {
    // wx.showToast({
    //   icon: 'none',
    //   title: "暂未开通",
    //   duration: 2500
    // })
    let that = this;
    api.postJSON('api/order/submitOrder', {
      'token': app.globalData.token,
      'order_type': that.data.order_type,
      'box_id': app.globalData.makecard,
      'invoice_id': that.data.invoice_id,
      'isDeleteCard': 1
    },
    function (res) {
      that.setData({
        order_id: res.data.data,
        order_type: that.data.order_type
      })
      if (res.data.status == 1) {
        wx.navigateTo({
          url: '/pages/commodity/detalis/give/integral/integral?order_id=' + that.data.order_id + '&order_type=' + that.data.order_type,
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 2500
        })
      }
    })
  },
  invoice:function(){
    app.globalData.dingdang_id = app.globalData.give.order_id
    wx.navigateTo({
      url: '../../../../my/invoice/invoice?source=cashgift&order_type=' + this.data.order_type + '&order_id=' + this.data.order_id,
    })
  },
  weixin:function(){
    let that = this;
    if (app.globalData.give.order_id){
      that.wxpay(app.globalData.give.order_id);
      return false;
    }
    api.postJSON('api/order/submitOrder', {
      'token': app.globalData.token,
      'order_type': that.data.order_type,
      'box_id': app.globalData.makecard,
      'invoice_id': that.data.invoice_id,
      'isDeleteCard': 1
    },
    function (res) {

      that.setData({
        order_id: res.data.data,
        order_type: that.data.order_type
      })
      if (res.data.status == 1) {
        app.globalData.give.order_id = res.data.data
        that.wxpay(res.data.data);
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 2500
        })
      }
    })
  },
  wxpay: function (order_id){
    let that = this;
    console.log(that.data.order_id)
    api.postJSON('api/pay/order_wx_pay',{
      'token': app.globalData.token,
      'order_id': order_id
    },
    function(res){
      console.log(res)
      // wx.redirectTo({
      //   url: '../giftbag/giftbag?order_id=' + that.data.order_id + '&type=' + that.data.order_type
      // })
      if(res.data.status==1){
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: 'MD5',
          paySign: res.data.data.paySign,
          success(res) {
            wx.showToast({
              icon: 'none',
              title: "支付成功",
              duration: 2500
            })
            wx.redirectTo({
              url: '../giftbag/giftbag?order_id=' + that.data.order_id + '&type=' + that.data.order_type
            })
          },
          fail(res) {
            wx.showToast({
              icon: 'none',
              title: "支付失败,请重新购买!",
              duration: 2500
             })
            
            // console.log(getCurrentPages())
            // setTimeout(()=>{
            //   wx.navigateBack({
            //     delta: getCurrentPages().length - 2
            //   })
            // },1000)
          }
        })
      }else{
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 2500
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    let order_type = options.order_type == undefined ? '' : options.order_type;
    let order_id = options.order_id == undefined ? '' : options.order_id;
    //有发票ID
    this.setData({
      order_type: order_type,
      order_id: order_id,
      invoice_id: options.invoice_id == undefined ? "" : options.invoice_id
    });
    if (!app.globalData.give.order_id){
      api.postJSON('api/order/temporary',{
        'token': app.globalData.token
      },function(res){
        console.log(res)
        if (res.data.status == 1) {
          console.log(res.data.data,66)
          that.setData({
            order: res.data.data,
            goods_res: res.data.data.goods
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 2500
          })
        }
      })
    }else{
      api.postJSON('api/order/order_detail', {
        'token': app.globalData.token,
        'order_id': app.globalData.give.order_id
      }, function (res) {
        console.log(res)
        if (res.data.status == 1) {
          that.setData({
            order: res.data.data,
            goods_res: res.data.data.goods_res
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 2500
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})