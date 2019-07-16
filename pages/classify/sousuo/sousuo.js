var api = require('../../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      url: '../shop/shop?keywords=' + this.data.key
   });
  },
  // 实时获取input框的值
  userNameInput:function(e){
    console.log("sssss")
    console.log(e.detail.value)
    this.setData({key: e.detail.value})
  }
})