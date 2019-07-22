// pages/commodity/detalis/give/GiveOthers/GiveOthers.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    scene: ''
  },
  plus:function (e){
    console.log(this.data.num)
    this.data.num++;
    this.setData({
      num: this.data.num
    })
    // this.data.num = this.data.num++
  },
  minus:function(){
    console.log(this.data.num)
    if (this.data.num<=1){
      wx.showToast({
        icon: 'none',
        title: "至少选择一件礼物",
        duration: 1500
      })
      return false;
    }
    this.data.num--;
    this.setData({
      num: this.data.num
    })
  },
  show: function () {
    wx.navigateTo({
      url: '../../../../card/makecard/makecard',
    })
  },
  more:function(){
    wx.navigateTo({
      url: '../scene/scene',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    api.postJSON('api/box/box_cate_list',function(res){
      console.log(res);
      that.setData({
        scene:res.data.data
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