// pages/authorize.js
var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),//获取用户信息是否在当前版本可用
    id: '',
    type: '',
    order_id: '',
    pwdstr: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id == undefined ? "" : options.id;
    var type = options.type == undefined ? "" : options.type;
    var order_id = options.order_id == undefined ? "" : options.order_id;
    var pwdstr = options.pwdstr == undefined ? "" : options.pwdstr;
    var source = options.source == undefined ? "" : options.source;
    this.setData({
      id: id,
      type: type,
      order_id: order_id,
      pwdstr: pwdstr,
      source: source
    })
  },
  // 微信授权
  bindGetUserInfo: function (e) {//点击的“拒绝”或者“允许
    if (e.detail.userInfo) {//点击了“允许”按钮，
      var that = this;
      api.postJSON('api/user/edit_user',{
        'token': app.globalData.token,
        'nickname': e.detail.userInfo.nickName,
        'avatar': e.detail.userInfo.avatarUrl
      },
      function (res) {
        console.log(res)

        

        if (!that.data.source){
          app.globalData.userInfo = res.data.data;
          wx.switchTab({
            url: '../index/index',//返回首页
          })
        }else{
          wx.navigateTo({
            url: '/pages/card/go?id=' + this.data.id + '&type=' + this.data.type + '&order_id=' + this.data.order_id + '&pwdstr=' + this.data.pwdstr,
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