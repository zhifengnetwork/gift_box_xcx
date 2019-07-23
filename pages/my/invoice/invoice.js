// pages/my/invoice/invoice.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: 'person',
        value: '个人',
        checked: 'true'
      },
      {
        name: 'unit',
        value: '单位',
      },
    ],
    unit_show: true,
    footer_show: true
  },

  show: function () {
    this.setData({
      footer_show : !this.data.footer_show
    })
  },

  footer_hidden:function () {
    this.setData({
      footer_show: !this.data.footer_show
    })
  },

  radioChange: function(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == "unit") {
      console.log(2)
      this.setData({
        unit_show : false
      })
      console.log(this.data.unit_show)
    } else if (e.detail.value == "person"){
      console.log(1)
      this.setData({
        unit_show: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  tijiaofa:function(){
    // api.getJSON('/api/order/edit_invoice?token=' + app.globalData.token+'&', function (res) {
    //   if (res.data.status == 1) {


    //   }
    // }) 
  }
})