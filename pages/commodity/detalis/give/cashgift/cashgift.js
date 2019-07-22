// pages/commodity/detalis/give/cashgift/cashgift.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true
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
    var nickname = app.globalData.userInfo.nickname;
    nickname = nickname == undefined ? '' : nickname;
    console.log(nickname)
    return {
      title: nickname + '为你准备了一份惊喜,请火速查收!',
      imageUrl: 'https://giftbox.zhifengwangluo.com/image/back.png',
      path: '/pages/turntable/turntable',
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