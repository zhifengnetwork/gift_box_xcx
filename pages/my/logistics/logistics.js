// pages/my/logistics/logistics.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:'',
    over:'',
    logistics:'',
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let over = '';
    let order_id = options.order_id == undefined ? '' : options.order_id;
    api.postJSON('api/order/get_order_logistics', {
      'token': app.globalData.token,
      'order_id': order_id,
      // 'order_id': 3232,
    }, function (res) {
      if (res.data.status == 1) {
        
        if (res.data.data.length !=0){
            for (let i = 0; i < res.data.data.list.length;i++){
              over = i;
            }
            that.setData({
              item: res.data.data,
              over: over,
              logistics: res.data.data.list
            })
        }
        
      }
      console.log(res.data.data)
    })
  },
  all(){
    this.setData({
      flag:true
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
  // 跳转到客服页面
  servie:function(){
    wx.navigateTo({
      url: '../service/service'
    })
  }

})