// pages/site/site.js
var app = getApp()
var api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site:[],
    award:false,
    bar_Height: wx.getSystemInfoSync().statusBarHeight,		// 获取手机状态栏高度
  },
  // 跳转到添加地址
  newsite: function () {
    if (this.data.award) {
      wx.redirectTo({
        url: 'newsite/newsite?award='+true,
      })
    }else{
      wx.redirectTo({
        url: 'newsite/newsite',
      })
    }
  },
  award:function(e){
    var that=this
    let addid = e.currentTarget.dataset.address_id
    console.log("全局")
    console.log(app.globalData.productNum)
    console.log(app.globalData.sku_id)
    if(this.data.award){
      wx.redirectTo({
        url: '../commodity/detalis/payment/award/award?address_id=' + addid + "&sku_id=" + app.globalData.sku_id + '&productNum=' + app.globalData.productNum,
      })
    }
  },
  // 默认按钮


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    api.postJSON('api/user/address_list',
    {
      token: app.globalData.token
    },
    function(res){
      if(res.data.status==1){
        that.setData({
          site:res.data.data
        })
        console.log(that.data.site)
      }
     
    })
    if (options.award){
      this.setData({
        award:true
      })
    }
  },
  remove: function (e){
    let that = this;
    api.postJSON('api/user/del_address',
    {
      token: app.globalData.token,
      address_id: e.currentTarget.dataset.address_id
    },
    function (res) {
      if (res.data.status == 1) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          that.onLoad()
        }, 2000)
      }
      console.log(res)
    })
  },
  redact: function (e){
    let item = e.currentTarget.dataset.item;
    wx.redirectTo({
      url: 'newsite/newsite?item=' + JSON.stringify(item),
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