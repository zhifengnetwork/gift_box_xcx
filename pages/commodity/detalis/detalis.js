// pages/commodity/detalis/detalis.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advImage: [{
      url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
    },
    {
      url: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'
    },
    {
      url: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    },
    {
      url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
    }
    ],
    currentSwiper: 0,
    indicatorColor: 'white',
    indicatorActivecolor: 'red',
    currentTab: 0,
    list: 3,
    listdata: 8,
    // 头部导航栏的高度
    // statusBarHeight: app.globalData.statusBarHeight,
    height: app.globalData.height * 2 + 25,
    navbarData: {
      name: '我是标题'
    }
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  // 犒劳自己的商品选择事件
  my_goods:function(){
    wx.navigateTo({
      url: 'payment/award/award',
    })

  },
  GiveOthers: function () {
    wx.navigateTo({
      url: 'give/GiveOthers/GiveOthers',
    })
  },
  preventTouchMove: function () {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      advimg: this.data.advImage,
    })
  },

  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
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