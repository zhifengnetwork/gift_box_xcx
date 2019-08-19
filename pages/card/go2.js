// pages/card/go2.js
var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    type:'',
    order_id:'',
    pwdstr:'',
    status:false,
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id == undefined ? "" : options.id;
    var type = options.type == undefined ? "" : options.type;
    var order_id = options.order_id == undefined ? "" : options.order_id;
    var pwdstr = options.pwdstr == undefined ? "" : options.pwdstr;
    this.setData({
      id: id,
      type: type,
      order_id: order_id,
      pwdstr: pwdstr,
    })
    app.getUserInfo(userinfo => {
      //昵称、头像 不存在，跳转去授权
      if (userinfo.nickname == '' && userinfo.avatar == '') {
        wx.redirectTo({
          url: '/pages/authorize/authorize?source=go2&id=' + id + ' &type=' + type + '&order_id=' + order_id + '&pwdstr=' + pwdstr,//授权页面
        })
      }

      let that = this;
      api.postJSON('api/gift/receive_join', {
        'token': app.globalData.token,
        'order_id': order_id,
        'join_type': 2,
        'pwdstr': pwdstr
      },
        function (res) {
          if (res.data.status == 1) {

              that.setData({
                status:true,
                msg: res.data.msg
              })

            wx.showToast({
              title: '请点击继续',
              icon: 'none'
            })

          } else {
            that.setData({
              status: false,
              msg: res.data.msg
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
          console.log(res);
        })
    })


  },
  btn:function(e){
    console.log(e.detail.formId)
    if (this.data.status){
      app.save_form_id(e.detail.formId)
      wx.navigateTo({
        url: '/pages/card/go?id=' + this.data.id + '&type=' + this.data.type + '&order_id=' + this.data.order_id + '&pwdstr=' + this.data.pwdstr
      })
    }else{
      wx.showToast({
        title: this.data.msg,
        icon: 'none'
      })
    }


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