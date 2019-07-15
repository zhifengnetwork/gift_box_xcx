var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advImage: [],
    jiali:[],
    //guess_like:[],
    currentSwiper: 0,
    indicatorColor: 'white',
    hot_category:[],
    shishangdapai:[],
    shishangzhinan:[],
    xingxuanyoupin:[],
    guess_like:[],
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
    var that = this;
    // 判断是否已经授权
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
            }
          })
        } else {//未授权，跳到授权页面
          wx.redirectTo({
            url: '../authorize/authorize',//授权页面
          })
        }
      }
    })
    api.getJSON('api/index/index', function (res) {
      if (res.data.status == 1) {
          
         
          that.setData({
            advimg: res.data.data.banner,
            hot_category: res.data.data.hot_category,
            jiali: res.data.data.jializhixuan,
            shishangdapai: res.data.data.shishangdapai,
            shishangzhinan: res.data.data.shishangzhinan,
            // guess_like: res.data.data.guess_like,
            imgUrlslength: res.data.data.shishangzhinan.goods_list.length,
            xinpinshangshi: res.data.data.xinpinshangshi,
            xingxuanyoupin: res.data.data.xingxuanyoupin,
            guess_like: res.data.data.cainixihuan
          })
      }
    })
   
   
   
   
  },
  onShow: function () {

    console.log(app.globalData.token);

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
  },
  xingxuan: function () {
    wx.navigateTo({
      url: '../home/xingxuan/xingxuan',
    })
  },
  boss: function () {
    wx.navigateTo({
      url: '../home/boss/boss',
    })
  },
  detalis: function () {
    wx.navigateTo({
      url: '../commodity/detalis/detalis',
    })
  }

})
