// pages/commodity/detalis/give/integral/integral.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    card_num: '',
    card_name:'',
    card_mobile:''
  },



  send:function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id ? options.order_id : '';
    var order_type = options.order_type ? options.order_type : '';
    this.setData({
      order_id: order_id,
      order_type: order_type
    })
    console.log('oooooooooooooo' + order_id)
  },
  /**
   * 积分支付
   */
  order_jifen_pay: function () {
    console.log('8888888888888')

    var that = this
    if (!(/^1[3456789]\d{9}$/.test(that.data.card_mobile))) {
      wx.showToast({
        title: "手机号码有误，请重填",
        icon: 'none'
      })
      return false;
    } 
    api.postJSON('api/jifen/order_jifen_pay', {
      'order_id': that.data.order_id,
      'card_num': that.data.card_num,
      'card_name': that.data.card_name,
      'card_mobile': that.data.card_mobile,
      'token': app.globalData.token
    },
      function (res) {
      
        if (res.data.status == 1) {
          console.log('55555555555555')
          wx.showToast({
            title: '提交成功,等待审核',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/index/index',
            })
          },2000)
          // if (that.data.order_type>=1){
          //   wx.navigateTo({
          //     url: '/pages/commodity/detalis/give/giftbag/giftbag?order_id=' + that.data.order_id,
          //   })
          // }else{
          //   wx.navigateTo({
          //     url: '/pages/my/giftbank/giftbank?order_id=' + that.data.order_id,
          //   })
          // }

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
  },

  /**
   * VIP卡号
   */
  card_num:function(e){
    var card_num = e.detail.value;
    this.setData({
      card_num: card_num
    });
  },
  /**
   * VIP名称
   */
  card_name:function(e){
    var card_name = e.detail.value;
    this.setData({
      card_name: card_name
    });
  },
  card_mobile:function(e){
    var card_mobile = e.detail.value;
    this.setData({
      card_mobile: card_mobile
    });
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