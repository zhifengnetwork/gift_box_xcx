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
    indicatorActivecolor: 'red',
    // 头部导航栏的高度
    // statusBarHeight: app.globalData.statusBarHeight,
    height: app.globalData.height * 2 + 25,
    navbarData: {
      name: '我是标题'
    }
    
  
  },
  onLoad: function (options) {
    this.setData({
      advimg: this.data.advImage,
    })
  },
  onShow: function () {

  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }

})
