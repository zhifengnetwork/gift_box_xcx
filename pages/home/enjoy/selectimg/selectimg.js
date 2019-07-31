var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/selectimg/selectimg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popup: false,
    face:'',
    xuanzhong:[],
    x: 0,
    y: 0,
    xx:[100,200],
    yy: [100, 200]
  },

  // 点击跳转到标签页
  label:function(){
    wx.navigateTo({
      url: '../label/label',
    })
  },


  // 点击贴纸出现遮罩表情包
  biaoqing:function () {
    let that = this
    that.setData({
      popup: true
    })

  },

  
  tuozhuai:function(e) {
  let that = this
  //  event.detail = { x, y, source }
    console.log(e)
  //   // yy: that.data.yy.concat(that.data.yyy)
   console.log(that.data.x)
  //   // console.log(that.data.yyy)
  },

  // 点击遮罩上方关闭遮罩
  guanbi:function (){
    let that = this
    that.setData({
      popup: false
    })
  },


  // 点击表情
  popup:function (e){
    let that = this
    console.log(e.currentTarget.dataset.index)
    console.log(that.data.face[e.currentTarget.dataset.index])
    // 选取了表情之后关闭表情包
    that.setData({
      popup: false,
      xuanzhong: that.data.xuanzhong.concat(that.data.face[e.currentTarget.dataset.index]),
      // xx: that.data.xx.concat([e.currentTarget.dataset.index]),
      // yy: that.data.yy.concat(that.data.yyy)
    })
    // console.log(that.data.yy)
    console.log(that.data.xuanzhong)
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
    // 进入页面请求表情包
    let that = this
    api.getJSON('/api/sharing/emojis', function (res) {
      if (res.data.status == 1) {
        console.log(res.data)
        that.setData({
          face: res.data.data
        })
      }
    })
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