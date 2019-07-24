// pages/my/giftbank/giftbank.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    item:'',
    list:'',
    type:2
  },

  clickTab: function (e) {
    var that = this;
    var type = null;
    console.log(e.target.dataset.current)
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (e.target.dataset.current==0){
      this.getdata();
    } else if (e.target.dataset.current == 1){
      this.getlist()
    }
    // this.setData({
    //   type:type
    // })
    // this.getdata();
  },

  
  getdata:function(){
    let that = this;
    api.postJSON('api/order/order_list', {
      token: app.globalData.token,
      type: 7,
      num: 100,
    }, function (res) {
      if (res.data.status == 1) {
        that.setData({
          item: res.data.data
        })
      }
      console.log(res)
    })
  },

  getlist: function () {
    let that = this;
    api.postJSON('api/order/order_list', {
      token: app.globalData.token,
      type: 4,
      num: 200
    }, function (res) {
      if (res.data.status == 1) {
        that.setData({
          list: res.data.data
        })
      }
      console.log(res)
    })
  },



  // 取消订单
  quxiao: function (e) {
    console.log(e.target.dataset.id)
    let that = this;
    api.postJSON('api/order/edit_status', {
      token: app.globalData.token,
      order_id: e.target.dataset.id,
      status: 1,
    }, function (res) {
      if(res.data.status == 1){
        // wx.showToast({
        //   title: '取消订单成功',
        //   // icon: 'success',
        //   duration: 1000
        // })
        that.onLoad();
      }
    })
  },

  // // 确认收货
  // shouhuo: function (e) {
  //   let that = this;
  //   api.postJSON('api/order/edit_status', {
  //     token: app.globalData.token,
  //     order_id: e.target.dataset.id,
  //     status: 2,
  //   }, function (res) {
  //     console.log(res)
  //   })
  // },


  kaolao:function () {
    console.log(123)
  },

  // 去付款
  fukuan: function (e) {
    let that = this;
    console.log(e.target.dataset.id)
    api.postJSON('api/pay/order_wx_pay', {
      token: app.globalData.token,
      order_id: e.target.dataset.id,
    }, function (res) {
      if (res.data.status == 1){
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: 'MD5',
          paySign: res.data.data.paySign,
          success(res) {
            console.log(res);
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata();
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

  }
})