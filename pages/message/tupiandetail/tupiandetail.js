var WxParse = require('../../../wxParse/wxParse.js');
var api = require('../../../utils/api')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentSwiper: 0,
    priture:[],
    content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    api.getJSON('/api/sharing/article_info?article_id=' + options.id+'&num=1000', function (res) {
      if (res.data.status == 1) {
       console.log(res.data.data)
        that.setData({priture: res.data.data.cover})
        that.setData({content:res.data.data})
        WxParse.wxParse('content', 'html', res.data.data.content, that, 5)
      }
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
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
    this.setData({ autoplay: true })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({autoplay:false})
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