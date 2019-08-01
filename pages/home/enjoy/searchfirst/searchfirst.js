var api = require('../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    inputValue: null,
    hot:[],
    history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    api.getJSON('/api/Category/hot_search?token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data)
        that.setData({ hot: res.data.data.hot})
        that.setData({ history: res.data.data.history})
      }
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
  userNameInput: function (event) {
    var that = this;
    if (event.detail.value == '') {
      that.setData({ status: false })
    } else {
      that.setData({ status: true })
    }
  },
  del: function () {
    this.setData({ 'inputValue': '' })
  },
})