var app = getApp()
var api = require('../../../../utils/api');
// pages/my/after/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    ss: "",
    tupian: [],
    itemList: ['顺丰快递', '中通快递', '圆通快递', '申通快递'],
    goods_name: '',
    goods_num: '',
    goods_price: '',
    spec_key_name: '',
    img: '',
    kuaidi_number:'',
    danhao:'',
  },

  // 选择物流
  dianji: function () {
    var that = this
    wx.showActionSheet({
      itemList: that.data.itemList,
      success(res) {
        // console.log(res.tapIndex);
        // console.log(that.data.itemList[res.tapIndex])
        that.setData({
          ss: that.data.itemList[res.tapIndex]
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })

  },

  // 物流单号
  danhao: function (e) {
    let that = this
    that.setData({
      danhao: e.detail.value
    })
  },

  // 手机号码
  haoma: function (e) {
    let that = this
    that.setData({
      haoma: e.detail.value
    })
  },

  //退款说明
  shuom: function (e) {
    let that = this
    that.setData({
      shuom: e.detail.value
    })
  },
  // 图片
  camera: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths)
        that.setData({
          tupian: res.tempFilePaths
        })
      }
    })
  },

  // 提交
  send: function (){
    let that = this
    api.postJSON('api/order/set_refund_kuaidi', {
      'token': app.globalData.token,
      refund_apply_id: that.data.id,
      kuaidi_com: that.data.ss,
      kuaidi_number: that.data.danhao,
      tel: that.data.haoma,
      kuaidi_msg: that.data.shuom,
      kuaidi_pic: that.data.tupian
    },function (res) {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      goods_name: options.goods_name,
      goods_num: options.goods_num,
      goods_price: options.goods_price,
      spec_key_name: options.spec_key_name,
      img: options.img,
      id: options.id
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