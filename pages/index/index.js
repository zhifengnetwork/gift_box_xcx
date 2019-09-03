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
    sharing_name:[],
    sharing:[],
    yuan:false,
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
    autoplay: true,
    goods_list:[],
    page:2,
    bujia:true

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
    // 滚动条触碰到底部
    // 获取容器高度，使页面滚动到容器底部
  

  onLoad: function () {
    
  },
  onShow: function () {
    
    app.globalData.give.order_id = '';
    var that = this;
    that.setData({bujia:true,page:2})
    app.getUserInfo(userinfo => {

      //昵称、头像 不存在，跳转去授权
      if (userinfo.nickname == '' && userinfo.avatar == '') {
        wx.redirectTo({
          url: '../authorize/authorize',//授权页面
        })
      }else{

        api.getJSON('api/index/index', function (res) {
          if (res.data.status == 1) {

            that.setData({
              advimg: res.data.data.banner,
              hot_category: res.data.data.hot_category,
              jiali: res.data.data.jializhixuan,
              shishangdapai: res.data.data.shishangdapai,
              shishangzhinan: res.data.data.shishangzhinan,
              guess_like: res.data.data.guess_like,
              imgUrlslength: res.data.data.shishangzhinan.goods_list.length,
              xinpinshangshi: res.data.data.xinpinshangshi,
              xingxuanyoupin: res.data.data.xingxuanyoupin,
              guess_like: res.data.data.cainixihuan,
              chaoliudaogou: res.data.data.chaoliudaogou,
              imgs: res.data.data.banner,
              sharing_name: res.data.data.sharing_name,
              sharing: res.data.data.sharing,
              goods_list: res.data.data.cainixihuan.goods_list
            })
          }
        })
        
      }
    })

   

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
  // 微信自定义的函数,如果滚动条滚动到底部,会自动触发该函数
  onReachBottom: function () {
    var that=this
    that.setData({yuan:true}) 
    if(that.data.bujia===true){
      console.log(that.data.page)
      api.getJSON('/api/index/getBrandGoods?page=' + that.data.page, function (res) {
        if (res.data.status == 1) {
          that.setData({yuan:false}) 
          var noteafter = that.data.goods_list
          if (res.data.data.length > 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              noteafter.push(res.data.data[i])
            }
            console.log(noteafter)
            that.setData({goods_list: noteafter})
            that.data.page++
          }else{
            that.setData({bujia:false}) 
            that.setData({yuan:false})  
          }
        }
      })


    }else{
      that.setData({ yuan: false }) 
    }
    


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
  brand: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log('商品' + id)
    wx.navigateTo({
      url: '../classify/shop/shop?id=' + id,
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
