// pages/my/mydetalis/mydetalis.js
var app = getApp()
var api = require('../../../utils/api');
var util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickname: '',
    sex: '',
    introduce: '',
    date: '',
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = new Date();
    var a = "-";
    var e = t.getFullYear();
    var i = t.getMonth() + 1;
    var s = t.getDate();
    if (i >= 1 && i <= 9) {
      i = "0" + i;
    }
    if (s >= 0 && s <= 9) {
      s = "0" + s;
    }
    var n = e + a + i + a + s;
    let sex = null;
    if (app.globalData.userInfo.sex == 1){
      sex = '男';
    } else if (app.globalData.userInfo.sex == 2){
      sex = '女';
    }
    this.setData({
      nickname: app.globalData.userInfo.nickname,
      avatar: app.globalData.userInfo.avatar,
      sex:sex,
      date: app.globalData.userInfo.birthday,
      introduce: app.globalData.userInfo.introduce,
      time: n
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
    } else if (that.data.sex==null){
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
        console.log(res.data.data)
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
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://giftbox.zhifengwangluo.com/api/box/upload_file',
          filePath: tempFilePaths[0],
          name: 'file',
          header:{
            'content-type':'multipart/form-data'
          },
          formData:{
            'token' : app.globalData.token
          },
          success: function (res) {
            let avatar = JSON.parse(res.data)
            that.setData({
              avatar: avatar.data
            })
            console.log(that.data.avatar)
          }
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