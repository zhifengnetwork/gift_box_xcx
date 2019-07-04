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
    },
    sort:0,   //商品的库存
    spec_dss:'',
    	// 01.规格选择
				selectArr: [], //存放被选中的值
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
				// 02.规格显示
				skuShow: null,
				guigedata: {},

    // 商品规格选择数据结构
    result: {
      "goods": {
        "goods_spec_list": [
          [
            {
              "spec_name": "男女",
              "item_id": "143",
              "item": "男",
              "src": "",
              "isClick": 1
            },
            {
              "spec_name": "男女",
              "item_id": "144",
              "item": "女",
              "src": "",
              "isClick": 0
            }
          ],
          [
            {
              "spec_name": "颜色",
              "item_id": "136",
              "item": "果绿",
              "src": "http://www.wanshan.com/Public/upload/goods/2018/06-04/5b14e0129bc9d.jpg",
              "isClick": 1
            },
            {
              "spec_name": "颜色",
              "item_id": "140",
              "item": "橘红",
              "src": "",
              "isClick": 0
            },
            {
              "spec_name": "颜色",
              "item_id": "134",
              "item": "白色",
              "src": "http://www.wanshan.com/Public/upload/goods/2018/06-04/5b14dff965903.jpg",
              "isClick": 0
            },
            {
              "spec_name": "颜色",
              "item_id": "142",
              "item": "紫色",
              "src": "",
              "isClick": 0
            },
            {
              "spec_name": "颜色",
              "item_id": "137",
              "item": "黑色",
              "src": "",
              "isClick": 0
            },
            {
              "spec_name": "颜色",
              "item_id": "139",
              "item": "黄色",
              "src": "",
              "isClick": 0
            },
            {
              "spec_name": "颜色",
              "item_id": "141",
              "item": "孔蓝",
              "src": "",
              "isClick": 0
            },
            {
              "spec_name": "颜色",
              "item_id": "135",
              "item": "彩蓝",
              "src": "http://www.wanshan.com/Public/upload/goods/2018/06-04/5b14e0088a33d.jpg",
              "isClick": 0
            },
            {
              "spec_name": "颜色",
              "item_id": "138",
              "item": "红色",
              "src": "",
              "isClick": 0
            }
          ],
        ]
      },
      "spec_goods_price": {
        "142_144": {
          "key": "142_144",
          "price": "10.00",
          "store_count": "0",
          "price_rmb": 8.67
        },
        "141_144": {
          "key": "141_144",
          "price": "10.00",
          "store_count": "0",
          "price_rmb": 8.67
        },
        "140_144": {
          "key": "140_144",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "139_144": {
          "key": "139_144",
          "price": "10.00",
          "store_count": "0",
          "price_rmb": 8.67
        },
        "138_144": {
          "key": "138_144",
          "price": "10.00",
          "store_count": "99",
          "price_rmb": 8.67
        },
        "137_144": {
          "key": "137_144",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "136_144": {
          "key": "136_144",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "135_144": {
          "key": "135_144",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "134_144": {
          "key": "134_144",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "142_143": {
          "key": "142_143",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "141_143": {
          "key": "141_143",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "140_143": {
          "key": "140_143",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "139_143": {
          "key": "139_143",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "138_143": {
          "key": "138_143",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "137_143": {
          "key": "137_143",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "136_143": {
          "key": "136_143",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "135_143": {
          "key": "135_143",
          "price": "10.00",
          "store_count": "100",
          "price_rmb": 8.67
        },
        "134_143": {
          "key": "134_143",
          "price": "10.00",
          "store_count": "99",
          "price_rmb": 8.67
        }
      }

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

  },
  // 选择规格
  propClick: function (e) {
    var pos = e.currentTarget.dataset.pos;
    var index = e.currentTarget.dataset.index;
    var gsl = this.data.result;
    if (gsl.goods.goods_spec_list[index].length > 0) {
      for (let i = 0; i < gsl.goods.goods_spec_list[index].length; i++) {
        if (i == pos) {
          gsl.goods.goods_spec_list[index][pos].isClick = 1
        } else {
          gsl.goods.goods_spec_list[index][i].isClick = 0
        }
      }
      this.setData({
        result: gsl
      });
      this.checkPrice();
    }

  },
  
  checkPrice: function () {
    var goods = this.data.result;
    var spec = ""
    // this.setData({
    //   price: goods.goods.shop_price
    // });

    if (goods.goods.goods_spec_list) {
      for (var i = 0; i < goods.goods.goods_spec_list.length; i++) {
        for (var j = 0; j < goods.goods.goods_spec_list[i].length; j++) {
          if (goods.goods.goods_spec_list[i][j].isClick == 1) {
            if (spec == "")
              spec = goods.goods.goods_spec_list[i][j].item_id
            else
              spec = spec + "_" + goods.goods.goods_spec_list[i][j].item_id
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
          console.log("hh" + spec);
          this.setData({ spec_dss:spec})
        
      }
      var price = goods['spec_goods_price'][spec].price;
      var sort = goods['spec_goods_price'][spec].store_count;
      console.log("sort"+sort);
      // this.setData({sort:sort})
      this.setData({
        price: price,
        sort: sort,
        spec: spec
      });
      console.log(sort)
    }

  },
  jiaoyan:function(){
    this.checkPrice()
  }

})