// pages/my/mydetalis/mydetalis.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    avatar: '',
    nickname: '',
    sex: '',
    introduce: '',
    date: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: app.globalData.userInfo.nickname,
      avatar: app.globalData.userInfo.avatar
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  send:function(){
    let that = this;
    let sex = null;
    if (that.data.nickname==''){
      wx.showModal({
        title: '提示',
        content: '请输入昵稱',
        showCancel: false
      })
      return false;
    } else if (that.data.sex==''){
      wx.showModal({
        title: '提示',
        content: '请输入性别',
        showCancel: false
      })
      return false;
    } else if (that.data.date == '') {
      wx.showModal({
        title: '提示',
        content: '请输入生日',
        showCancel: false
      })
      return false;
    }
    if (that.data.sex=='男'){
      sex = 1;
    } else if (that.data.sex == '女'){
      sex = 2;
    }
    api.postJSON('api/user/edit_user',
    {
      'token': app.globalData.token,
      'nickname': that.data.nickname,
      'sex': sex,
      'birthday': that.data.date,
      'introduce': that.data.introduce,
      'avatar': that.data.avatar
    },
    function(res){
      if(res.data.status==1){
        app.globalData.userInfo = res.data.data;
        wx.showToast({
          title: '修改成功',  
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '../my',
          });
        },2000)
      }
      console.log(res)
    })
  },
  detalis:function(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          avatar: tempFilePaths[0]
        })
      }
    })
  },
  nickname:function(e){
    this.setData({
      nickname: e.detail.value
    })
  },
  sex: function (e) {
    let that = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex==0){
            that.setData({
              sex:'男'
            })
          }else{
            that.setData({
              sex:'女'
            })
          }
        }
      }
    })
  },
  introduce: function (e) {
    this.setData({
      introduce: e.detail.value
    })
  },
  address:function(){
    wx.navigateTo({
      url: '../../site/site',
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

  }
})