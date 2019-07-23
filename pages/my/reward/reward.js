// pages/my/reward/reward.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData:function(){
    let that = this;
    api.postJSON('api/order/order_list', {
      'token': app.globalData.token,
      'order_type': 0,
      'num': 200
    }, function (res) {
      if (res.data.status == 1) {
        that.setData({
          item: res.data.data
        })
      }
      console.log(res)
    })
  },


  // 确认收货
  shouhuo: function (e) {
    let that = this;
    console.log(e.target.dataset.id)
    api.postJSON('api/order/edit_status', {
      token: app.globalData.token,
      order_id: e.target.dataset.id,
      status: 2,
    }, function (res) {
      console.log(res)
    })
  },




  selectormode:function (e) {
    // console.log(e.target.dataset.id)
    var id = e.target.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '../after/SelectorMode/SelectorMode?id=' + id,
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