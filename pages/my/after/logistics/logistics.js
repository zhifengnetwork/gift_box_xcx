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
    // 判断是否有填写快递公司、快递单号、手机号码
    if (!(/^1[3456789]\d{9}$/.test(that.data.haoma))) {
      wx.showToast({
        title: "手机号码有误，请重填",
        icon: 'none'
      })
      return false;
    } 
    if (that.data.ss && that.data.danhao && that.data.haoma){
      api.postJSON('api/order/set_refund_kuaidi', {
        'token': app.globalData.token,
        refund_apply_id: that.data.id,
        kuaidi_com: that.data.ss,
        kuaidi_number: that.data.danhao,
        tel: that.data.haoma,
        kuaidi_msg: that.data.shuom,
        kuaidi_pic: that.data.tupian
      }, function (res) {
        // console.log(res)
        // 当status为1的时候，显示设置成功
        if(res.data.status == 1){
          wx.showModal({
            title: '提示',
            content: '设置成功',
            showCancel: false,
            success(res) {
              // 当点击了提示框的确定之后，返回退款详情
              if (res.confirm) {
                wx.navigateTo({
                  url: '../refund/refund',
                })
                }
            }
          })
        }
        // 当status不等于1的时候，提示msg的内容
        else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      })
    }
    // 当物流公司、物流单号、手机号码没有填写的时候，提示
    else{
      wx.showModal({
        title: '提示',
        content: '请填写完整的物流信息',
        showCancel: false
      })
    }
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