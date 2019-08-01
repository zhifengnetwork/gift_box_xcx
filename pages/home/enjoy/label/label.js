var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/label/label.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    currentTab: 0,
    pinpai:'',
    shangpin:'',
  },

  // 输入框显示关闭符号
  userNameInput: function(event) {
    var that = this;
    if (event.detail.value == '') {
      that.setData({
        status: false
      })
    } else {
      that.setData({
        status: true
      })
    }
  },
  // 清空input的值
  del: function() {
    this.setData({
      'inputValue': ''
    })
  },


  // tab切换
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }

    if (e.target.dataset.current == 1) {
      api.postJSON('api/sharing/brand_list', {
          page: 1,
          num: 10
        },
        function(res) {
          if (res.data.status == 1) {
            console.log(res.data)
            that.setData({
              pinpai: res.data.data
            })
          }
        })
    } else if(e.target.dataset.current == 2) {
      api.postJSON('api/sharing/goods_list', {
        page: 1,
        num: 10
      },
        function (res) {
          if (res.data.status == 1) {
            console.log(res.data)
            that.setData({
              shangpin: res.data.data
            })
          }
        })
    }


  },




  // 点击回车跟搜素图片时跳转
  huiche: function() {
    wx.navigateTo({
      url: '../labelsearch/labelsearch'
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})