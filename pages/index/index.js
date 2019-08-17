var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advImage: [],
    jiali: [],
    //guess_like:[],
    currentSwiper: 0,
    indicatorColor: 'white',
    hot_category: [],
    shishangdapai: [],
    shishangzhinan: [],
    xingxuanyoupin: [],
    guess_like: [],
    chaoliudaogou: [],
    // indicatorActivecolor: 'red',
    // 头部导航栏的高度
    // statusBarHeight: app.globalData.statusBarHeight,
    // height: app.globalData.height * 2 + 25,
    // navbarData: {
    //   name: '我是标题'
    // 嘻嘻嘻
    // }
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    // autoplay: false,
    interval: 5000,
    duration: 1000,
    imgUrlslength: '',
    swipernow: 1,
    imgs: [

      // 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      // 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      // 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'

    ],
    // currentSwiper: 0,
    autoplay: true

  },


  // 点击跳转到享物圈页面
    xwq: function () {
      wx.navigateTo({
        url: '../home/enjoy/enjoy',
      })
      // wx.navigateTo({
      //   url: '../home/enjoy/selectimg/selectimg',
      // })
    },



  onLoad: function (options) {
    var that = this;
    app.getUserInfo(userinfo => {
    
      //昵称、头像 不存在，跳转去授权
      if (userinfo.nickname == '' && userinfo.avatar == '') {
        wx.redirectTo({
          url: '../authorize/authorize',//授权页面
        })
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
          guess_like: res.data.data.cainixihuan,
          chaoliudaogou: res.data.data.chaoliudaogou,
          imgs: res.data.data.banner,
        })
      }
    })
  },
  onShow: function () {
    // 显示底部滚动条
    // wx.showTabBar();
    // this.setData({
    //   currentSwiper: 0
    // })
    this.setData({ autoplay: true})
  },
  // 第一个轮播图切换调动这个函数
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
   
  },
  swiperChange2: function (e) {
    console.log("首先" + e.detail.current)
    this.data.swipernow = e.detail.current + 1
    this.setData({ swipernow: this.data.swipernow })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
 
  zefeng: function () {
    wx.navigateTo({
      url: '../home/integral/integral',
    })
  },
  xingxuan: function (e) {
     var id=e.currentTarget.dataset.id;
    //  if(id==19){
    //       wx.navigateTo({
    //       url: '../home/xingxuan/xingxuan?id='+id,
    //     })
    //  }
    // if (id == 22) {
      wx.navigateTo({
          url: '../home/boss/boss?id='+id
        })
    // }

  },
  boss: function () {
    wx.navigateTo({
      url: '../home/boss/boss',
    })
  },
  details: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log('商品'+id)
    wx.navigateTo({
      url: '../commodity/detalis/detalis?id=' + id,
    })
  },
  onShareAppMessage: function () {
    console.log('share')
    var nickname = app.globalData.userInfo.nickname;
    nickname = nickname == undefined ? '' : nickname;
    console.log(nickname)
    return {
      title: nickname + '为你准备了一份惊喜,请火速查收!',
      imageUrl:'https://giftbox.zhifengwangluo.com/image/back.png',
      path: '/pages/card/go',
      success:function(res){
        console.log(res)
        wx.showModal({
          title: '分享成功',
          content: '分享成功',
        })
      },
      fail:function(res){
        console.log(res)
        wx.showModal({
          title: '分享失败',
          content: '分享失败',
        })
      }
    }
  },
  // 轮播图卡死问题
  changeGoodsSwip: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },
  onHide:function(){
    this.setData({autoplay:false})
  }

})
