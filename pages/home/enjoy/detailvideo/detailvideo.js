var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/detailvideo/detailvideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    item:'',
    priture:'',
    music:'',
    biaoqing:'',
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    avatar:'',
    nickname:'',
    title:'',
    content:'',
  },

  // 返回按钮
  return:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
    })
    api.getJSON('/api/sharing/sharing_info?id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
    // api.getJSON('/api/sharing/sharing_info?id=97&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2NTg3Mzg3NCwiZXhwIjoxNTY1OTA5ODc0LCJ1c2VyX2lkIjo5MH0.Uh9-LpLXY4be2afjzKvvalVHNZzGDY70DPpqbTXILyI', function (res) {
      if (res.data.status == 1) {
        that.setData({
          item: res.data.data,
          priture: res.data.data.priture,
          music: res.data.data.music,
          biaoqing: JSON.parse(res.data.data.text2),
          avatar: res.data.data.avatar,
          nickname: res.data.data.nickname,
          title: res.data.data.title,
          content: res.data.data.content,
        })
        console.log(that.data.item)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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