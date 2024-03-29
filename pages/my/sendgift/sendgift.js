// pages/my/sendgift/sendgift.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    item:'',
    list:'',
    flag: 0
  },

  clickTab: function (e) {
    var that = this;
    var type = null;
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (e.target.dataset.current == 0) {
      this.getdata()
    } else if (e.target.dataset.current == 1) {
      this.getlist()
    }
  },
  load: function () {
    wx.showLoading({
      title: '加载中',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata();
    if (this.data.flag == 0) {
      this.load();
    }
  },
  logistics: function (e) {
    wx.navigateTo({
      url: '../logistics/logistics?order_id=' + e.target.id,
    })
  },
  getdata:function(){
    let that = this;
    api.postJSON('api/gift/get_send_gift', {
      token: app.globalData.token,
      type: 2,
    }, function (res) {
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
      if (res.data.status == 1) {
        that.setData({
          item: res.data.data,
          flag: 1
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
  },

  getlist: function () {
    let that = this;
    api.postJSON('api/gift/get_send_gift', {
      token: app.globalData.token,
      type: 1,
    }, function (res) {
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
      if (res.data.status == 1) {
        that.setData({
          list: res.data.data,
          flag: 1
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 2500
        })
      }
      console.log(res)
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