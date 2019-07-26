// pages/commodity/detalis/give/GetTheGift/GetTheGift.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    goods:'',
    address:'',
    active:true
  },
  show: function () {
    if (!this.data.active){
      wx.showToast({
        icon: 'none',
        title: '该订单已经领取过啦!',
        duration: 2500
      })
      return false;
    }
    this.setData({ flag: false })
  },
  hide: function () {
    this.setData({ flag: true })
  },
  again:function(){
    wx.navigateTo({
      url: '../../../../site/site?again='+true,
    })
  },
  tiaozhuan: function () {
    wx.navigateTo({
      url: '../GetTheSuccess/success',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.getUserInfo(userinfo => {
      //昵称、头像 不存在，跳转去授权
      if (userinfo.nickname == '' && userinfo.avatar == '') {
        wx.redirectTo({
          url: '../authorize/authorize',//授权页面
        })
      }
    })
    let address_id = options.address_id == undefined ? '' : options.address_id;
    let order_id = options.order_id == undefined ? '' : options.order_id;
    if(order_id == "" || order_id == undefined){
      wx.showModal({
        title: 'order_id不能为空',
        content: '',
      })
    }
    let pwdstr = options.pwdstr == undefined ? '' : options.pwdstr;
    if (pwdstr == "" || pwdstr == undefined) {
      wx.showModal({
        title: 'pwdstr不能为空',
        content: '',
      })
    }
   
    console.log(options)
    if (address_id){
      address_id = options.address_id;
      api.postJSON('api/gift/set_address',{
        'token': app.globalData.token,
        'addressid': address_id,
        'joinid': pwdstr
      },
      function(res){

      })
    }
    api.postJSON('api/gift/share_callback',{
      'token': app.globalData.token,
      'order_id': order_id,
    },
    function(res){
      if(res.data.status==1){
        that.setData({
          goods: res.data.data.goods,
          address: res.data.data.address
        })
      }else{
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 2500
        })
        that.setData({
          active:false
        })
      }
      console.log(res.data)
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