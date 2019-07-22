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
    goods_res:''
  },
  show: function () {
    this.setData({ flag: false })
  },
  hide: function () {
    console.log(666)
    this.setData({ flag: true })
  },
  integral: function () {
    // wx.navigateTo({
    //   url: '../integral/integral',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    api.postJSON('api/order/submitOrder',{
      'token': app.globalData.token,
      'order_type': app.globalData.give.order_type,
      'box_id': options.box_id
    },
    function(res){
      if(res.data.status==1){
        api.postJSON('api/order/order_detail',{
          'token': app.globalData.token,
          'order_id':res.data.data
        },
        function(res){
          console.log(res)
          if(res.data.status==1){
            that.setData({
              order: res.data.data,
              goods_res: res.data.data.goods_res
            })
            console.log(that.data.goods_res)
          }
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
    let url = null;
    if (app.globalData.give.order_type==1){
      url = '/pages/card/go';
    }else{
      url = '/pages/turntable/turntable';
    }
    var nickname = app.globalData.userInfo.nickname;
    nickname = nickname == undefined ? '' : nickname;
    console.log(nickname)
    return {
      title: nickname + '为你准备了一份惊喜,请火速查收!',
      imageUrl: 'https://giftbox.zhifengwangluo.com/image/back.png',
      path: url,
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '分享成功',
          content: '分享成功',
        })
      },
      fail: function (res) {
        console.log(res)
        wx.showModal({
          title: '分享失败',
          content: '分享失败',
        })
      }
    }
  }
})