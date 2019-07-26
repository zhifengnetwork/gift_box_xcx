var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    avatar: '',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    app.getUserInfo( userinfo => {
        console.log(userinfo);
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  
    this.setData({
      'nickname': app.globalData.userInfo.nickname,
      'id': app.globalData.userInfo.id,
      'avatar': app.globalData.userInfo.avatar
    })
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

  // 跳转到个人信息
  mydetalis: function() {
    wx.navigateTo({
      url: 'mydetalis/mydetalis',
    })
  },
  // 跳转到礼品卡
  giftcard: function() {
    wx.navigateTo({
      url: 'giftcard/giftcard',
    })
  },
  // 跳转到购物卡
  shoppingcard: function() {
    wx.navigateTo({
      url: 'shoppingcard/shoppingcard',
    })
  },
  // 跳转到礼品库
  giftbank: function() {
    wx.navigateTo({
      url: 'giftbank/giftbank',
    })
  },
  // 跳转到犒劳自己
  reward: function() {
    wx.navigateTo({
      url: 'reward/reward',
    })
  },
  // 跳转到已送礼品
  sendgift: function() {
    wx.navigateTo({
      url: 'sendgift/sendgift',
    })
  },
  // 跳转到已收礼品
  collectgift: function() {
    wx.navigateTo({
      url: 'collectgift/collectgift',
    })
  },
  //跳转到电子发票
  invoice: function() {
    wx.navigateTo({
      url: 'invoice/invoice?source=my',
    })
  },
  //跳转到联系客服
  service: function() {
    wx.navigateTo({
      url: 'service/service',
    })
  },
  //跳转到常见问题
  faq: function (){
    wx.navigateTo({
      url: 'FAQ/FAQ',
    })
  },
  //跳转到退換/售後
  after: function () {
    wx.navigateTo({
      url: 'after/after',
    })
  },
})