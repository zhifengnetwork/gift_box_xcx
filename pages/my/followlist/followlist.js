var api = require('../../../utils/api');
var app = getApp();
// pages/my/followlist/followlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgUrls: [
    //   'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    //   'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    //   'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    // ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentSwiper: 0,
    liang: true,
    zang: true,
    priture: [],
    detaillist: [],
    comments: [],
    status: true,
    placeholder: "選填，請先和商家協商一致",
    focus: false,
    pid: null,
    hhh: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // console.log(options.user_id)
    api.getJSON('/api/sharing/sharing_info?id=' + options.user_id + '&token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data);
        that.setData({ detaillist: res.data.data })
        that.setData({ priture: res.data.data.priture })
        that.setData({ comments: res.data.data.comment })
        console.log(that.data.comments)
      }
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

  },

  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });

  },
  zhankai: function () {
    this.setData({ liang: false })
  },
  shouqi: function () {
    this.setData({ liang: true })
  },
  dianji: function () {
    var that = this;
    if (this.data.zang == true) {
      that.setData({ zang: false })
      return
    }
    if (this.data.zang == false) {
      that.setData({ zang: true })
    }
  },
  // 文本域失去焦点
  changeContext: function (e) {
    var that = this
    console.log(e.detail.value);
    this.setData({
      context: e.detail.value
    })

    if (that.data.pid === null) {

      api.getJSON('/api/sharing/add_comment?sharing_id=1&token=' + app.globalData.token + '&content=' + that.data.context, function (res) {
        if (res.data.status == 1) {
          that.onLoad();
          that.setData({ placeholder: "選填，請先和商家協商一致" })
          that.setData({ hhh: "" })
        }
      })
    }
    else {

      api.getJSON('/api/sharing/add_comment?sharing_id=1&token=' + app.globalData.token + '&content=' + that.data.context + '&pid=' + that.data.pid, function (res) {
        if (res.data.status == 1) {
          that.onLoad()
          that.setData({ placeholder: "選填，請先和商家協商一致" })
          that.setData({ hhh: "" })
        }
      })

    }

  },
  // 显示全部评论
  quanbu: function () {
    if (this.data.status == true) {
      this.setData({ status: false })
      return;
    }
    if (this.data.status == false) {
      this.setData({ status: true })
    }
  },
  //回复别人的评论
  huifu: function (e) {
    var nickname = e.currentTarget.dataset.nickname;
    var pid = e.currentTarget.dataset.pid;
    nickname = "回复" + nickname + ":"
    console.log(nickname)
    this.setData({ placeholder: nickname });
    this.setData({ focus: true });
    this.setData({ pid: pid });
    console.log(this.data.hhh)
  }


})