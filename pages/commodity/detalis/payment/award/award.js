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
    dingdang_id:''
  },

  show: function() {
    this.setData({
      flag: false
    })
  },
  hide: function() {
    console.log(666)
    this.setData({
      flag: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var sku_id = options.sku_id;
    var productNum = options.num
    console.log(sku_id, productNum)


    // 该商品加入购物车
    api.getJSON('/api/order/immediatelyOrder?sku_id=' + sku_id + '&cart_number=' + productNum + '&token=' + app.globalData.token, function(res) {
      if (res.data.status == 1) {

        console.log("加入购物车成功啦")
        console.log(res.data.data);
        that.setData({
          order_id: res.data.data
        })
        // 请求接口,获取order_id
        api.getJSON('/api/order/submitOrder?token='+app.globalData.token,
          function(res) {
            if (res.data.status == 1) {
              console.log("生成订单成功了")
              console.log(res.data.data);
              that.setData({dingdang_id: res.data.data}) 
              //渲染页面数据






            }
          })





      }
    })





    var address_id = options.address_id;
    console.log(options.address_id);
    var dizhi = ""
    var sheng = ""
    var shi = ""
    var qu = ""
    api.getJSON('/api/user/get_address_info?address_id=' + address_id, function(res) {
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
  site: function() {
    wx.navigateTo({
      url: '../../../../site/site?award=true',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tiaofapiao: function() {
    wx.navigateTo({
      url: '../../../../my/invoice/invoice',
    });
  }
})