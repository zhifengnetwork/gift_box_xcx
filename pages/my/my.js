var app = getApp();
var api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // app.getUserInfo( userinfo => {});
  },
  getData(){
    let token = app.globalData.token
    let that = this
    api.postJSON('api/sharing/my_user', {
      token,
      user_id: that.data.user_id
    }, function (res) {
      if (res.data.status == 1) {
        that.setData({
          item: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  
    // this.setData({
    //   'nickname': app.globalData.userInfo.nickname,
    //   'id': app.globalData.userInfo.id,
    //   'avatar': app.globalData.userInfo.avatar
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getData()
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
  //更改封面
  chooseImageBg(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album','camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(that.data.item.id)
        wx.uploadFile({
          url: 'https://www.9pointstars.com/api/XS/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            'token': app.globalData.token,
            'user_id': that.data.item.id
          },
          success: function (res) {
            console.log(res.data)
            that.data.item.user_diy_background = JSON.parse(res.data).data.user_diy_background
            that.setData({
              item: that.data.item
            })
            // let avatar = JSON.parse(res.data)
            // that.setData({
            //   avatar: avatar.data
            // })
            // console.log(that.data.avatar)
            // that.setData({
            //   image: that.data.avatar
            // })
            // app.globalData.image = that.data.image
            // if (that.data.image) {
            //   wx.navigateTo({
            //     url: 'selectimg/selectimg?type=0',
            //   })
            // }
          }
        })
      }
    })
  },
  // 点击跳转到文章列表
  article:function(){
    wx.navigateTo({
      url: 'article/article',
    })
  },

  //点击跳转到关注列表
  follow:function(){
    wx.navigateTo({
      url: 'follow/follow',
    })
  },

  //点击跳转到粉丝列表
  fans:function(){
    wx.navigateTo({
      url: 'fans/fans',
    })
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

  bindGetUserInfo:function(){
    var that = this
    // 必须是在用户已经授权的情况下调用
    wx.getUserInfo({
      success: function (res) {
       
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        api.postJSON('api/login/update_userinfo', {
          token: app.globalData.token,
          nickname: nickName,
          avatar: avatarUrl,
          gender: gender,
          province: province,
          city: city

        }, function (res) {
          
          app.globalData.userInfo = res.data.data;
          that.onShow();
        })
      }
    })
  }
})