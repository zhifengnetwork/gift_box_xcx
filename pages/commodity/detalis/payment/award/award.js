// pages/commodity/detalis/payment/award/award.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    dizhi: "",
    order_id: '',
    dingdang_id: '',
    order_detail:[],
    goods:[],
    sku_id:0,
    productNum:0,
    context:"",
    addrid:'',
    buyao:5
   
  },

  show: function () {
    this.setData({
      flag: false
    });
    api.getJSON('/api/order/submitOrder?token=' + app.globalData.token +'&order_type=0', function (res) {
      if (res.data.status == 1) {
        console.log("已经生成订单了")
      }
    })

  
  },
  hide: function () {
    console.log(666)
    this.setData({
      flag: true
    })
  },
  integral:function(){
    wx.showToast({
      icon: 'none',
      title: "暂未开通",
      duration: 2500
    })
  },
  wxpay: function () {
    let that = this;
    console.log(app.globalData.give)
    api.postJSON('api/pay/order_wx_pay', {
      'token': app.globalData.token,
      'order_id': app.globalData.dingdang_id
    },
    function (res) {
      console.log(res)
      if (res.data.status == 1) {
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: 'MD5',
          paySign: res.data.data.paySign,
          success(res) {
            wx.showToast({
              icon: 'none',
              title: "支付成功",
              duration: 2500
            })
            app.globalData.dingdang_id = '';
            wx.redirectTo({
              url: '../../../../my/reward/reward'
            })
          },
          fail(res) {
            wx.showToast({
              icon: 'none',
              title: "支付失败",
              duration: 2500
            })
          }
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 2500
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var sku_id = options.sku_id;
    // var productNum = options.num;
    // app.globalData.sku_id = sku_id;
    // app.globalData.productNum = productNum;
    console.log("ffffffff");
    console.log(that.data.goods)
    console.log(options.type);
    that.setData({buyao: options.buyao})
   if(options.type==="1"){
     // 该商品加入购物车
     api.getJSON('/api/order/immediatelyOrder?sku_id=' + app.globalData.sku_id + '&cart_number=' + app.globalData.productNum + '&token=' + app.globalData.token, function (res) {
       if (res.data.status == 1) {
         console.log("加入购物车成功啦")
         console.log(res.data.data);
         that.setData({
           order_id: res.data.data
         })
         // 请求接口,获取order_id
         api.getJSON('/api/order/submitOrder?token=' + app.globalData.token,
           function (res) {
             if (res.data.status == 1) {
               console.log("生成订单成功了")
               console.log(res.data.data);
               app.globalData.dingdang_id = res.data.data;
               console.log("订单id为", app.globalData.dingdang_id)
               // that.setData({ dingdang_id: res.data.data })
               //渲染页面数据
               api.getJSON('/api/order/order_detail?order_id=' + app.globalData.dingdang_id + "&token=" + app.globalData.token, function (res) {

                 if (res.data.status == 1) {
                   console.log("订单列表")
                   console.log(res.data.data)
                   that.setData({ order_detail: res.data.data })
                   that.setData({ goods: res.data.data.goods_res})
                   console.log(that.data.goods)
                 }
               })
             }
           })
       }
     })
   }else{

     api.getJSON('/api/order/order_detail&token='+ app.globalData.token, function (res) {
        
       if (res.data.status == 1) {
         console.log("订单列表")
         console.log(res.data.data)
         that.setData({ order_detail: res.data.data })
         that.setData({ goods: res.data.data.goods_res })
         console.log(that.data.goods)
       }
     })

   }

    var address_id = options.address_id;
    // that.setData({addrid:address_id})
    console.log("地址id为:"+options.address_id);
    var dizhi = ""
    var sheng = ""
    var shi = ""
    var qu = ""
    api.getJSON('/api/user/get_address_info?address_id=' + address_id, function (res) {
      if (res.data.status == 1) {

        console.log(res.data.data)
        sheng = res.data.data.province
        shi = res.data.data.city;
        qu = res.data.data.district;
      }
      dizhi = sheng + shi + qu
      console.log("地址为")
      console.log(dizhi)
      that.setData({
        dizhi: dizhi
      })
    })
  },
  site: function () {
    wx.navigateTo({
      url: '../../../../site/site?award=true',
    });
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
    // var that=this;

    // console.log("that.data.dingdang_id")
    // console.log(that.data.dingdang_id)

    //   api.getJSON('/api/order/order_detail?order_id=' + that.data.dingdang_id + "&token=" + app.globalData.token, function (res) {

    //     if (res.data.status == 1) {
    //       console.log("订单列表")
    //       console.log(res.data.data)
    //       that.setData({ order_detail: res.data.data })
    //       that.setData({ goods: res.data.data.goods_res })
    //       console.log("ffffffffsssssssssss");
    //       console.log(that.data.goods)
    //     }
    //   })

    
    

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
  tiaofapiao: function () {
    var that=this
    wx.navigateTo({
      url: '../../../../my/invoice/invoice'
    });
  },
  // 文本域失去焦点
  changeContext:function(e){
   console.log(e.detail.value);
    this.setData({context: e.detail.value})
  },
  jifen:function(){
    this.setData({
      flag: true
    });
    wx.showToast({
      title: '暂时不能用积分支付',
      icon: 'none',
      duration: 2000
    })
  },
  weixin:function(){
    this.setData({
      flag: true
    });
    api.getJSON('/api/pay/order_wx_pay?order_id=' + app.globalData.dingdang_id + '&user_note=' + this.data.context + '&token=' + app.globalData.token, function (res) {

      if (res.data.status == 1) {
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: 'MD5',
          paySign: res.data.data.paySign,
          success(res) {
            console.log(res);
            // order_type为0的时候，跳转到犒劳自己页面，否则切换到已付款页面
            // if (e.target.id == 0) {
            //   wx.navigateTo({
            //     url: '../reward/reward',
            //   })
            // } else {
            //   that.setData({
            //     currentTab: 1,
            //   })
            // }
          },
          fail(res) {
            console.log(res)
          }
        })

       
      }



    })






  }
})