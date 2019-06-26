
var app = getApp();
Page({
  data: {
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
          "store_count": "99",
          "price_rmb": 8.67
        },
        "141_144": {
          "key": "141_144",
          "price": "10.00",
          "store_count": "99",
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
          "store_count": "99",
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
  onLoad: function (options) {
  
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
          console.log("hh"+spec)
      }
      var price = goods['spec_goods_price'][spec].price;
      var sort = goods['spec_goods_price'][spec].store_count;
      this.setData({
        price: price,
        sort: sort,
        spec: spec
      });

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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function () {
  
  }
})