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
      url: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'},
    {
      url: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    },
    {
      url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
    }
    ],
    currentSwiper: 0,
    indicatorColor: 'white',
    // indicatorActivecolor: 'red',
    // 头部导航栏的高度
    // statusBarHeight: app.globalData.statusBarHeight,
    // height: app.globalData.height * 2 + 25,
    // navbarData: {
    //   name: '我是标题'
    // }
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    imgUrlslength:'',
    swipernow:1
  
  },
  onLoad: function (options) {
    this.setData({
      advimg: this.data.advImage,
    }),
    
    // 获取第二个轮播图的长度,显示到页面
      this.setData({ imgUrlslength: this.data.imgUrls.length})
  },
  onShow: function () {

  },
  // 第一个轮播图切换调动这个函数
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  swiperChange2:function(e){
    console.log("首先"+e.detail.current)
    this.data.swipernow =e.detail.current+1
    this.setData({ swipernow: this.data.swipernow})
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  zefeng:function(){
    wx.navigateTo({
      url: '../home/integral/integral',
    })
  }

})
