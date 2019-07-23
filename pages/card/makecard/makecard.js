// pages/card/makecard.js
var api = require('../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: '1',
        url: 'music/music',
        text: '选择音乐',
        tips: '确认歌曲',
        img: '../../public/images/card/music.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '2',
        url: 'picture/picture',
        text: '选择照片/视频',
        tips: '确认照片',
        img: '../../public/images/card/picture.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '3',
        url: 'record/record',
        text: '录入语音',
        tips: '请录入',
        img: '../../public/images/card/record.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '4',
        url: 'blessing/blessing',
        text: '写下祝福',
        tips: '请填写',
        img: '../../public/images/card/blessing.png',
        icon: '../../public/images/card/revision.png'
      },
    ],
    blessing: false,
    blessText:'',
    // 子页面返回值
    music: '',
    picture: '',
    record: '',
    bless: ''
  },
  // 跳转子页面
  skip: function(e) {
    console.log(e.currentTarget.dataset.url)
    let url = e.currentTarget.dataset.url;
    if (url == 'blessing/blessing') {
      this.setData({
        blessing: true
      })
      return false;
    }
    wx.navigateTo({
      url: url
    })
  },
  // 关闭祝福弹出层
  back: function() {
    this.setData({
      blessing: false
    })
  },
  // 提交祝福
  bleSend:function(){
    let that = this;
    api.postJSON('api/box/set_box', {
      'token': app.globalData.token,
      'id': app.globalData.makecard,
      'content': that.data.blessText
    },
    function(res){
      console.log(res)
      if(res.data.status==1){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          blessing: false,
          bless: that.data.blessText,
          blessText: ''
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg
        })
      }
    })
  },
  // 监听祝福内容
  blessText: function(e) {
    this.setData({
      blessText: e.detail.value
    })
  },
  // 预览判断
  preview: function() {
    var str = '';
    if (this.data.music == '') {
      str = '音乐';
    } else if (this.data.picture == '') {
      str = '照片/视频';
    } else if (this.data.record == '') {
      str = '语音';
    } else if (this.data.bless == '') {
      str = '祝福语';
    }
    if (str != '') {
      wx.showModal({
        title: '提示',
        content: '您未添加自己专属的' + str + '，继续浏览将展示默认内容;',
        cancelText: '返回编辑',
        confirmText: '任性预览',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../go?id=' + app.globalData.makecard
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 跳转预览
      console.log('跳转')
      wx.navigateTo({
        url: '../go?id=' + app.globalData.makecard
      })
    }
  },
  succeed:function(){
    wx.navigateTo({
      url: '../../commodity/detalis/give/cashgift/cashgift'
    })
  },
  back_white:function(){
    wx.navigateBack({
      delta: 2,
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this;
    let cate_id = null;
    if (!app.globalData.makecard){
      cate_id = 1;
    }else{
      cate_id = '';
    }
    api.postJSON('api/box/get_box',{
      'token': app.globalData.token,
      'cate_id': cate_id,
      'id': app.globalData.makecard
    },
    function (res) {
      console.log(res.data)
      if (!app.globalData.makecard){
        app.globalData.makecard = res.data.data.id;
      }else{
        return false;
      }
    })
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
    console.log(this.data)
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

  }
})