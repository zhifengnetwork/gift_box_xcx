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
    order_id:''
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
    wx.navigateTo({
      url: '/pages/commodity/detalis/give/integral/integral?order_id=' + this.data.order_id,
    })
  },
  invoice:function(){
    app.globalData.dingdang_id = app.globalData.give.order_id
    wx.navigateTo({
      url: '../../../../my/invoice/invoice?source=cashgift',
    })
  },
  wxpay:function(){
    let that = this;
    console.log(app.globalData.give)
    api.postJSON('api/pay/order_wx_pay',{
      'token': app.globalData.token,
      'order_id': app.globalData.give.order_id
    },
    function(res){
      console.log(res)
      if(res.data.status==1){
        // wx.redirectTo({
        //   url: '../giftbag/giftbag?order_id=' + app.globalData.give.order_id
        // })
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
              url: '../giftbag/giftbag?order_id=' + app.globalData.give.order_id
            })
          },
          fail(res) {
            wx.showToast({
              icon: 'none',
              title: "支付失败",
              duration: 2500
            })
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
    let that = this;

    //有发票ID
    this.setData({
      invoice_id: options.invoice_id == undefined ? "" : options.invoice_id
    });

    if (!app.globalData.give.order_id){
      api.postJSON('api/order/submitOrder', {
        'token': app.globalData.token,
        'order_type': app.globalData.give.order_type,
        'box_id': app.globalData.makecard,
        'invoice_id': this.data.invoice_id
      },
        function (res) {
          that.setData({
            order_id: res.data.data
          })
          if (res.data.status == 1) {
            app.globalData.give.order_id = res.data.data;
            that.order_detail(res.data.data);
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
              duration: 2500
            })
          }
        })
    }else{
      that.order_detail(app.globalData.give.order_id);
    }
  },
  order_detail: function (order_id){
    let that = this;
    api.postJSON('api/order/order_detail', {
      'token': app.globalData.token,
      'order_id': order_id
    },
      function (res) {
        console.log(res)
        if (res.data.status == 1) {
          that.setData({
            order: res.data.data,
            goods_res: res.data.data.goods_res
          })
          console.log(that.data.goods_res)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 2500
          })
        }
      })
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