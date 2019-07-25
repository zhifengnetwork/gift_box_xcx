// pages/my/shoppingcard/recharge/recharge.js
var app = getApp()
var api = require('../../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },
  value:function(e){
    this.setData({
      value: e.detail.value
    })
  },
  send:function(){
    let that = this;
    if(this.data.value>=0.01){
      api.postJSON('api/pay/shopping_pay',{
        'token': app.globalData.token,
        'money': that.data.value
      },function(res){
        if(res.data.status==1){
          console.log(666)
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.paySign,
            success(res) {
              console.log(res);
            },
            fail(res) {
              console.log(res)
            }
          })
        }else{
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 2500
          })
        }
        console.log(res)
      })
    } else if (0<this.data.value && this.data.value<0.01){
      wx.showModal({
        title: '提示',
        content: '充值金额不能小于0.01',
        showCancel: false
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入充值金额',
        showCancel: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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