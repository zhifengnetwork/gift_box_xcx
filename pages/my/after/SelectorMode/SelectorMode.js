// pages/my/after/SelectorMode/SelectorMode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    order_id:'',
    items: [
      { name: '1', value: '僅退款', text: '（未收到貨，或賣家協商同意前提下）'},
      { name: '2', value: '退貨退款', text: '（已收到貨，需要退換已收到的貨物）'},
      { name: '3', value: '換貨', text: '（已收到貨，需要更換已收到的貨物）' },
    ],
    value_index: '',
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      value_index : e.detail.value
    })
  },

  dianji: function () {
    console.log(this.data.value_index)
    if (this.data.value_index){
      wx.navigateTo({
        url: '../applyrefund/applyrefund?id=' + this.data.value_index + '&order_id=' + this.data.order_id,
      })
    }else{

      wx.showModal({
        title: '提示',
        content: '请输入服务类型',
        showCancel: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.id
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