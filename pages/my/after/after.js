// pages/my/after/after.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    after:'',
    listtype:[],
  },

  refund: function (e) {
    console.log(e)
    wx.navigateTo({
      url: 'refund/refund?refund_apply_id=' + e.target.id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    api.postJSON('api/order/order_list',{
      'token': app.globalData.token,
      'type': 5,
    },function(res){
      console.log(res.data.data)
      that.setData({
        after: res.data.data,
      })
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