// pages/site/site.js
var app = getApp()
var api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site:'',
    award:false
  },
  // 跳转到添加地址
  newsite: function () {
    wx.navigateTo({
      url: 'newsite/newsite',
    })
  },
  award:function(e){
    let addid = e.currentTarget.dataset.address_id
    if(this.data.award){
      wx.redirectTo({
        url: '../commodity/detalis/payment/award/award?address_id=' + addid,
      })
    }
  },
  // 默认按钮


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      }
      console.log(res)
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
    wx.navigateTo({
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