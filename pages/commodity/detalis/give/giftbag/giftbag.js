// pages/commodity/detalis/give/giftbag/giftbag.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    type:'',
    order_id:'',
    pwdstr:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var order_id = options.order_id;
    var type = options.type == undefined ? "" :　options.type;

    this.setData({
      order_id: order_id,
      type:type
    })

    var that = this;
    if(!order_id){
      wx.showModal({
        title: '订单ID不存在',
        content: '',
      })
    }

    api.postJSON('api/gift/share_callback', {
      token: app.globalData.token,
      order_id: order_id,
      act: 0
    }, function (res) {
      if (res.data.status == 1) {
        that.setData({
          id: res.data.data.card_id,
          type:res.data.data.type,
          pwdstr: res.data.data.pwdstr
        })

        // var url = '/pages/card/go?id=' + that.data.id + '&type=' + that.data.type + '&order_id=' + that.data.order_id + '&pwdstr=' + that.data.pwdstr;
        // console.log(url)

      } else {
        wx.showModal({
          content: res.data.msg,
        })
      }
      console.log(res)
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
   
    let url = null;
    if (this.data.type == 1 || this.data.type == '1' ) {
      url = '/pages/card/go?id=' + this.data.id + '&type=' + this.data.type + '&order_id=' + this.data.order_id + '&pwdstr=' + this.data.pwdstr
    }
    
    if (this.data.type == 2 || this.data.type == '2') {
      url = '/pages/card/go2?id=' + this.data.id + '&type=' + this.data.type + '&order_id=' + this.data.order_id + '&pwdstr=' + this.data.pwdstr
    }
    
    if(url == null){
      wx.showModal({
        title: '分享出错',
        content: '订单类型错误',
      })
      return false;
    }
    console.log('分享URL：',url)
    var nickname = app.globalData.userInfo.nickname;
    nickname = nickname == undefined ? '' : nickname;
    setTimeout(function(){
      wx.switchTab({
        url: '/pages/index/index'
      })
    },2000)
    return {
      title: nickname + '为你准备了一份惊喜,请火速查收!',
      imageUrl: 'https://www.9pointstars.com/image/back.png',
      path: url,
      // success: function (res) {
      //   console.log(res, 111)
      //   wx.showModal({
      //     title: '分享成功',
      //     content: '分享成功',
      //   })
      //   // wx.redirectTo({
      //   //   url: '../../../../my/giftbank/giftbank'
      //   // })
      // },
      // fail: function (res) {
      //   console.log(res)
      //   wx.showModal({
      //     title: '分享失败',
      //     content: '分享失败',
      //   })
      // },
      // complete:function(res){
      //   console.log('complete')
      // }
    }
  }
})