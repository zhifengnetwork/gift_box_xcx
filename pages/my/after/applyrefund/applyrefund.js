// pages/my/after/applyrefund/applyrefund.js
var app = getApp()
var api = require('../../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ss:"",
    tupian: [],
    id:'',
    order_id:'',
    item:'',
    goods_num:'',
    inputValue:'',
    reason:'',
    itemList: ['7天无理由', '退运费', '少件/漏发', '质量问题', '商品信息描述不符', '包装/商品破损/污渍']
  },

  dianji: function () {
    var that=this
    wx.showActionSheet({
      itemList: that.data.itemList,
      success(res) {
        // console.log(res.tapIndex);
        // console.log(that.data.itemList[res.tapIndex])
        that.setData({
          ss : that.data.itemList[res.tapIndex],
          reason: res.tapIndex
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
    
  },


  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  send:function () {
    var that = this
    api.postJSON('api/order/refund_apply', {
      'token': app.globalData.token,
      order_id: that.data.order_id,
      type: that.data.id,
      goods_num: that.data.goods_num,
      rec_id: that.data.item.rec_id,
      msg: that.data.inputValue,
      reason: that.data.reason + 1,
      prine_way: 1,
      pic: that.data.tupian
    }, function (res) {
      console.log(res.data.data)
      // that.setData({
      //   after: res.data.data
      // })
    })
  },


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
              tupian : res.tempFilePaths
            })
          }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      order_id: options.order_id
    })
    console.log(this.data.id,this.data.order_id)

    var that = this
    api.postJSON('api/order/order_detail', {
      'token': app.globalData.token,
      order_id: that.data.order_id,
    }, function (res) {
      console.log(res.data.data)
      that.setData({
        after: res.data.data,
        item: res.data.data.goods_res[0],
        goods_num: res.data.data.goods_res[0].goods_num
      })
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