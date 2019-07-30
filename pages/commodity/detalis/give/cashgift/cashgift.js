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
    wx.navigateTo({
      url: '/pages/commodity/detalis/give/integral/integral?order_id=' + this.data.order_id + '&order_type=' + this.data.order_type,
    })
  },
  invoice:function(){
    app.globalData.dingdang_id = app.globalData.give.order_id
    wx.navigateTo({
      url: '../../../../my/invoice/invoice?source=cashgift&order_type=' + this.data.order_type + '&order_id=' + this.data.order_id,
    })
  },
  wxpay:function(){
    let that = this;
    console.log(that.data.order_id)
    api.postJSON('api/pay/order_wx_pay',{
      'token': app.globalData.token,
      'order_id': app.globalData.give.order_id
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
      api.postJSON('api/order/submitOrder', {
        'token': app.globalData.token,
        'order_type': order_type,
        'box_id': app.globalData.makecard,
        'invoice_id': this.data.invoice_id
      },
        function (res) {
          that.setData({
            order_id: res.data.data,
            order_type: order_type
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