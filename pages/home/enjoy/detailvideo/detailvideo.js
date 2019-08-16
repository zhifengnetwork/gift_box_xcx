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
    controls: false,
    placeholder: "说点什么...",
    hhh:''
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
    // that.setData({
    //   id: options.id
    // })
    // api.getJSON('/api/sharing/sharing_info?id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
    api.getJSON('/api/sharing/sharing_info?id=97&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2NTkzNjQ3NiwiZXhwIjoxNTY1OTcyNDc2LCJ1c2VyX2lkIjo4OH0.Xgh12Dpijf2mt82vxEvWXlQMhWQEBiXITVUUatEjKVU', function (res) {
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
   * 
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

  },
  // 文本域失去焦点
  changeContext: function (e) {
    var that = this
    console.log(e.detail.value);
    this.setData({
      context: e.detail.value
    })

    if (that.data.pid === null) {

      api.getJSON('/api/sharing/add_comment?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&content=' + that.data.context, function (res) {
        if (res.data.status == 1) {
          that.setData({
            placeholder: "選填，請先和商家協商一致"
          })
          that.setData({
            hhh: ""
          })
          // 重新请求接口渲染数据
          api.getJSON('/api/sharing/sharing_comment_list?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&page=1&num=100000', function (res) {
            if (res.data.status == 1) {
              console.log(res.data.data);
              that.setData({ comments: res.data.data })
            }
          })
        }
      })
    } else {

      api.getJSON('/api/sharing/add_comment?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&content=' + that.data.context + '&pid=' + that.data.pid, function (res) {
        if (res.data.status == 1) {
          that.setData({
            placeholder: "選填，請先和商家協商一致"
          })
          that.setData({
            hhh: ""
          })
          // 重新请求接口渲染数据
          api.getJSON('/api/sharing/sharing_comment_list?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&page=1&num=100000', function (res) {
            if (res.data.status == 1) {
              console.log(res.data.data);
              that.setData({ comments: res.data.data })
            }
          })
        }
      })

    }


  
  },


  

})