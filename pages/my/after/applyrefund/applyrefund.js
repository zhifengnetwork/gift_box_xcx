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
    itemList: ['七天無理由退換貨', '退運費', '少件/漏發', '質量問題', '商品信息描述不符', '包裝/商品破損/汙漬']
  },

  dianji: function () {
    var that=this
    wx.showActionSheet({
      itemList: that.data.itemList,
      success(res) {
        // console.log(res.tapIndex);
        // console.log(that.data.itemList[res.tapIndex])
        that.setData({
          ss : that.data.itemList[res.tapIndex]
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
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