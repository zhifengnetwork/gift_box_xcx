
var WxParse = require('../../../wxParse/wxParse.js');
var api = require('../../../utils/api');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_data: [], //商品数据
    currentSwiper: 0,
    indicatorColor: 'white',
    indicatorActivecolor: 'red',
    currentTab: 0,
    list: 3,
    listdata: 8,
    // 头部导航栏的高度
    bar_Height: wx.getSystemInfoSync().statusBarHeight, // 获取手机状态栏高度
    height: app.globalData.height * 2 + 25,
    attrList: [],
    goods_spec_list: [],
    goodssss: [],
    showModalStatus: false,
    pintuanArr: "",
    googsId: "",
    goods_spec: "",
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
    statussxianshi: false,
    price: "0.00",
    title: "",
    name: "",
    sku_id: 0,
    imgimg: '',
    store_count: 0,
    anniu: true,
    order_type: false,
    autoplay: true,
    name: '',
    jige: '',
    count: '',
    text: '',
    itemId: '',
    id:null,
    imgimg222:''

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
    this.setData({
      statussxianshi: true
    });
    this.setData({ anniu: true })
  },
  goBack: function () {
    this.setData({
      statussxianshi: false
    });
    wx.navigateBack({
      delta: 1,
    })
  },
  jiele: function () {
    var that=this
    this.setData({
      statussxianshi: false
    }),
      api.getJSON('/api/Cart/addCart?sku_id=' + this.data.sku_id + '&cart_number=' + this.data.productNum + "&token=" + app.globalData.token, function (res) {

        if (res.data.status < 0) {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 1500
          })
        }
        if (res.data.status == 1) {
          wx.showToast({
            icon: 'none',
            title: "加入购物车成功",
            duration: 1500
          })
          api.getJSON('/api/goods/goodsinfo?goods_id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
            if (res.data.status == 1) {
              console.log(res.data.data.goods_spec_list)
              that.setData({
                goods_spec_list: res.data.data.goods_spec_list,
                goodssss: res.data.data.spec_goods_price,
                goods_data: res.data.data
              })
            }
          })
        }

      })
  },

  /**犒劳自己 */
  kaolao: function (e) {
    app.save_form_id(e.detail.formId)

    this.setData({
      statussxianshi: true
    });
    this.setData({
      anniu: false,
      order_type: false
    })

  },
  // 轮播图图片放大
  //图片点击事件
  imgYu: function(event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
    })
    
  },

  /**赠送他人 */
  give_goods: function (e) {
    app.save_form_id(e.detail.formId)

    this.setData({
      statussxianshi: true
    })
    this.setData({
      anniu: false,
      order_type: true
    })
  },
  nextshi: function () {
    let that = this;
    this.setData({
      statussxianshi: false
    })
    console.log(this.data.sku_id)
    app.globalData.sku_id = this.data.sku_id
    app.globalData.productNum = this.data.productNum
    console.log("全局变量哦")
    console.log(app.globalData.sku_id)
    console.log(app.globalData.productNum)
    if (this.data.order_type) {
      api.postJSON('api/order/immediatelyOrder', {
        'token': app.globalData.token,
        'sku_id': that.data.sku_id,
        'cart_number': that.data.productNum
      },
        function (res) {
          if (res.data.status == 1) {
            wx.navigateTo({
              url: '../givingother/givingother?sku_id=' + app.globalData.sku_id + '&num=' + that.data.productNum
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
              duration: 2500
            })
          }
          // sss
        })
    } else {
      //犒劳自己

      api.postJSON('api/order/immediatelyOrder', {
        'token': app.globalData.token,
        'sku_id': that.data.sku_id,
        'cart_number': that.data.productNum
      },
        function (res) {
          if (res.data.status == 1) {


            wx.navigateTo({
              // url: '../detalis/payment/award/award?sku_id=' + app.globalData.sku_id + '&num=' + app.globalData.productNum
              url: '../detalis/payment/award/award?type=1'
            })

          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
              duration: 2500
            })
          }
          // sss
        })

    }
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
  preventTouchMove: function () { },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var id = options.id
    that.setData({ id: id})
    // 请求数据,渲染商品页面
    // api.getJSON('api/goods/goodsDetail?goods_id=' + id + '&token=' + app.globalData.token, function (res) {
    //   if (res.data.status == 1) {
    //     that.setData({
    //       goods_data: res.data.data
    //     })
    //     WxParse.wxParse('content', 'html', res.data.data.content, that, 5)
    //   }
    // });
    api.getJSON('/api/goods/goodsinfo?goods_id=' + that.data.id+'&token='+app.globalData.token, function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data.goods_spec_list)
        that.setData({
          goods_spec_list: res.data.data.goods_spec_list,
          goodssss: res.data.data.spec_goods_price,
          goods_data: res.data.data
        })

        var zuhe = [];
        for (var st in that.data.goodssss) {
          zuhe.push(st)
        }
        console.log(zuhe);
        // 默认取第一个的sku_id
        var xiabiao = zuhe[0];

        that.data.sku_id = res.data.data.spec_goods_price[xiabiao].sku_id
        WxParse.wxParse('content', 'html', res.data.data.content, that, 5)
        WxParse.wxParse('gift_notice', 'html', res.data.data.gift_notice, that, 5)

        // 如果它只有一种规格的话,那么规格goods_spec_list的长度是1或者小于1
        var item_id;
        if (that.data.goods_spec_list.length <= 1) {
          for (var i = 0; i < that.data.goods_spec_list[0].length; i++) {
            if (that.data.goods_spec_list[0][i].isClick === 1) {
              item_id = that.data.goods_spec_list[0][i].item_id
            }
          }
          console.log("默认的商品的id为", item_id);
          var count = that.data.goodssss[item_id].store_count;
          var name = that.data.goodssss[item_id].name;
          var price = that.data.goodssss[item_id].price;
          var imgimg = that.data.goodssss[item_id].img
          that.setData({ count: count, name: name, price: price,imgimg:imgimg });
        }
        else {
          that.checkPrice();//首次需要调用，首次的规格
        }

      }
    })
  },
  // 跳转到购物车
  tocart:function(){
    wx.switchTab({
      url: '../../cart/cart',
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
    this.setData({ autoplay: true })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ autoplay: false })
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
    var text = e.currentTarget.dataset.text;
    var itemId = e.currentTarget.dataset.itemid
    this.setData({ text: text });
    this.setData({ itemId: itemId })
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
    var that = this
    var goods = this.data.goods_spec_list;
    var spec = ""
    console.log(that.data.spec_goods_price)
    // 如果它是单规格的时候
    if (goods.length <= 1) {

      console.log(that.data.text);
      var text = that.data.text
      that.setData({ name: text });
      // for (var i = 0; i < that.data.spec_goods_price.length;i++){
      //    if([i].name===text){
      //     //  that.setData({store_count: goods[i]. })
      //    }
      //  }
      var itemId = that.data.itemId
      console.log("规格id")
      console.log(itemId)
      var store_count = that.data.goodssss[itemId].store_count
      var price = that.data.goodssss[itemId].price;
      var sku_id = that.data.goodssss[itemId].sku_id;
      var imgimg = that.data.goodssss[itemId].img
      that.setData({ count: store_count, price: price, sku_id: sku_id,imgimg: imgimg})





    }
    //如果它是多规格的时候
    else {
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
          else {
            spec = spec + "_" + specs[i];

          }
        }

        // 收藏组合
        var zuhe = [];
        var ss = 0;
        for (var st in this.data.goodssss) {
          zuhe.push(st)
        }
        console.log('-----')
        console.log(spec)
        console.log('-----')
        for (var i = 0; i < zuhe.length; i++) {
          //有该组合的时候
          if (zuhe[i] === spec) {
            var price = this.data.goodssss[spec].price;
            var name = this.data.goodssss[spec].name;
            var sku_id = this.data.goodssss[spec].sku_id;
            var imgimg = this.data.goodssss[spec].img;
            var store_count = this.data.goodssss[spec].store_count
            this.setData({
              price: price,
              name: name,
              sku_id: sku_id,
              imgimg: imgimg,
              store_count: store_count
            });
          } else {
            ss++
          }
        }
        console.log(ss)
        if (ss === zuhe.length) {
          wx.showToast({
            icon: 'none',
            title: "没有该组合",
            duration: 500
          })
        }

      }

    }



  },
  //加减商品数量
  reduceProduct: function () {
    var that = this
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
    var that = this
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





  }



})
