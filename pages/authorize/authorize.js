// pages/authorize.js
var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')//获取用户信息是否在当前版本可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 微信授权
  bindGetUserInfo: function (e) {//点击的“拒绝”或者“允许
    if (e.detail.userInfo) {//点击了“允许”按钮，
      var that = this;
      api.postJSON('api/user/edit_user',{
        'token': app.globalData.token,
        'nickname': e.detail.userInfo.nickName,
        'avatar': e.detail.userInfo.avatarUrl,
        // 'sex': e.detail.userInfo.sex
        'sex': 0
      },
      function (res) {
        console.log(res)
          app.globalData.userInfo = res.data.data;
          wx.switchTab({
            url: '../index/index',//返回首页
          })
      })
      // requestUrl.requestUrl({//将用户信息传给后台数据库
      //   url: "/QXEV/xxx/xxx",
      //   params: {
      //     openId: globalOpenId,//用户的唯一标识
      //     nickName: e.detail.userInfo.nickName,//微信昵称
      //     avatarUrl: e.detail.userInfo.avatarUrl,//微信头像
      //     province: e.detail.userInfo.province,//用户注册的省
      //     city: e.detail.userInfo.city//用户注册的市
      //   },
      //   method: "post",
      // })
      //   .then((data) => {//then接收一个参数，是函数，并且会拿到我们在requestUrl中调用resolve时传的的参数
      //     console.log("允许授权了");
      //   })
      //   .catch((errorMsg) => {
      //     console.log(errorMsg)
      //   })
      // wx.switchTab({
      //   url: '../VehicleIndex/VehicleIndex',
      // })
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