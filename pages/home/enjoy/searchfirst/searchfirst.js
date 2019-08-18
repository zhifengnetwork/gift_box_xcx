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
    history:[],
    keyword:''
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
    that.setData({keyword: event.detail.value})
  },
  del: function () {
    this.setData({ 'inputValue': '' })
  },
  // 清理垃圾桶
  qingchu:function(){
    var that=this
    api.getJSON('/api/sharing/empty_search?token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
        console.log("清除成功!");
        that.onLoad()
      }
    })
  },
  hissdd:function(e){
    var that=this
    console.log(e.currentTarget.dataset.guanjian)
    var guanjian = e.currentTarget.dataset.guanjian
    that.setData({keyword: guanjian})
    wx.navigateTo({
      url: '../../enjoy/searchdetail/searchdetail?keyword=' + this.data.keyword
    })
  },
  // 搜索内容
  huiche:function(){
    wx.navigateTo({
      url: '../../enjoy/searchdetail/searchdetail?keyword=' +this.data.keyword
    })
    console.log(this.data.keyword)
  }
})