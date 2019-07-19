var WxParse = require('../../../wxParse/wxParse.js');
var api = require('../../../utils/api');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_data:[],//商品数据
    currentSwiper: 0,
    indicatorColor: 'white',
    indicatorActivecolor: 'red',
    currentTab: 0,
    list: 3,
    listdata: 8,
    // 头部导航栏的高度
    bar_Height: wx.getSystemInfoSync().statusBarHeight,		// 获取手机状态栏高度
    height: app.globalData.height * 2 + 25,
    navbarData: {
      name: '我是标题'
    },
    attrList:[],
    skuBeanList:[],
    //商品规格
    goods_spec_list:[],
    goodssss:[],
    showModalStatus: false,
    pintuanArr: "",
    googsId: "",
    goods_spec: "",
    wuliuShow: false,
    guigeShow: false,
    pinyouImg: false,
    zhiyouImg: false,
    dataArr: [],
    productNum: 1,
    wuliuType: "请选择物流方式",
    wuliuTypeId: "",
    pinyoushow: false,
    zhiyoushow: false,
    shipper: "",
    tax: "",
    spec: "",
    winHeight: 0,
    isSC: "",
    showPdbox: false,
    modePdData: [],
    order_id: "",
    pintuan_num: "",
    ptorder_id: "",
    leader: "",
    statussxianshi:false

  
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
  my_goods: function () {
    // wx.navigateTo({
    //   url: 'payment/award/award',
    // })
    this.setData({statussxianshi:true})
  },
  goBack:function(){
    this.setData({ statussxianshi: false });
    wx.navigateBack({
      delta: 1,
    })
  },
  jiele:function(){
    this.setData({ statussxianshi: false })
  },
  give_goods:function(){
    wx.navigateTo({
      url: '../givingother/givingother',
    })
  },
  cart: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  shouye: function () {
    wx.switchTab({
      url: '/pages/index/index',
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
  
    var that=this;
   
    var id = options.id
    // 请求数据,渲染商品页面
    api.getJSON('api/goods/goodsDetail?goods_id=' + id + '&token=' + app.globalData.token, function (res) {
      if (res.data.status == 1){  
        that.setData({ 
          goods_data: res.data.data
        })
          WxParse.wxParse('content', 'html', res.data.data.content, that, 5)
      
        
      }
    });
    api.getJSON('/api/goods/goodsinfo?goods_id='+id, function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data.goods_spec_list)
        that.setData({ goods_spec_list: res.data.data.goods_spec_list})
        that.setData({ goodssss: res.data.data.spec_goods_price})     
      }
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

  },
  // 选择规格
  propClick: function (e) {
    var pos = e.currentTarget.dataset.pos;
    var index = e.currentTarget.dataset.index;
    var gsl = this.data.goods_spec_list;
    if (gsl[index].length > 0) {
      for (let i = 0; i < gsl[index].length; i++) {
        if (i == pos) {
          gsl[index][pos].isClick = 1
        } else {
          gsl[index][i].isClick = 0
        }
      }
      this.setData({
        goods_spec_list: gsl
      });
      this.checkPrice();
    }
  },
  checkPrice: function () {
    var goods = this.data.goods_spec_list;
    var spec = ""
    // this.setData({
    //   price: goods.goods.shop_price
    // });

    if (goods) {
      for (var i = 0; i < goods.length; i++) {
        for (var j = 0; j < goods[i].length; j++) {
          if (goods[i][j].isClick == 1) {
            if (spec == "")
              spec = goods[i][j].item_id
            else
              spec = spec + "_" + goods[i][j].item_id
          }
        }
      }
      
      
      var specs = spec.split("_");
      for (var i = 0; i < specs.length; i++) {
        specs[i] = parseInt(specs[i])
      }
      specs.sort(function (a, b) {
        return a - b
      });
      spec = ""
      for (var i = 0; i < specs.length; i++) {
        if (spec == "")
          spec = specs[i]
        else
          spec = spec + "_" + specs[i];
        console.log("hh" + spec)
      }
      // 收藏组合
      var zuhe=[]; 
      var ss=0;
      for (var st in this.data.goodssss) {
        zuhe.push(st)
      }
      console.log(zuhe)
      for(var i=0;i<zuhe.length;i++){
        if(zuhe[i]===spec){
            var price = this.data.goodssss[spec].price;
            var sort = this.data.goodssss[spec].store_count;
            this.setData({
              price: price,
              sort: sort,
              spec: spec
            });
        }
        else{
            ss++
        }
      }
      console.log(ss)
      if (ss === zuhe.length){
          wx.showToast({
            icon:'none',
            title: "没有该组合",
            duration: 500
          })
      }
    
    }
  },
  //加减商品数量
  reduceProduct: function () {
    var proNum = this.data.productNum - 1
    if (proNum < 1) {
      this.setData({
        productNum: 1
      })
    } else {
      this.setData({
        productNum: proNum
      })
    }
  },
  addProduct: function (e) {
    var sort = e.target.dataset.sort;
    var proNum = this.data.productNum + 1
    if (proNum > sort) {
      this.setData({
        productNum: sort
      })
    } else {
      this.setData({
        productNum: proNum
      })
    }
  },

})
