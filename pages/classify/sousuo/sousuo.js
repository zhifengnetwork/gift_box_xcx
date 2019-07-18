var api = require('../../../utils/api')
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[],
    hot:[],
    key:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    var that = this;
    // 获取热门搜索关键字

    api.getJSON('/api/Category/hot_search?token=' + app.globalData.userInfo.token, function (res) {
    
      that.setData({ 
        hot: res.data.data.hot ,
        history: res.data.data.history
      })

    }) 
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
  //获取搜索的文本内容,携带到另外一个页面,并且在别的页面的onload方法中的options获取到该值
  huiche:function(){
    wx.navigateTo({
      url: '../sousuoxiang/sousuoxiang?keywords=' + this.data.key
   });
  },
  search: function (e) {
    var keyword = e.currentTarget.dataset.keyword; 
    wx.navigateTo({
      url: '../sousuoxiang/sousuoxiang?keywords=' + keyword
    });
  },
  // 实时获取input框的值
  userNameInput:function(e){
    console.log("sssss")
    console.log(e.detail.value)
    this.setData({key: e.detail.value})
  },
  dianji:function(e){
    var xixi = e.currentTarget.dataset.xixi;
    // 获取点击的文本
    console.log(xixi);
    wx.navigateTo({
      url: '../sousuoxiang/sousuoxiang?keywords=' + xixi
    });
  }
  
})