// pages/my/after/refund/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  logistics: function (){
    wx.navigateTo({
      url: '../logistics/logistics',
    })
  },


// 撤销申请
  chexiao: function () {
    wx.showModal({
      title: '提示',
      content: '您將撤銷本次申請，如果問題未解決，您還可以再次發起。確定繼續嗎？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

// 客服介入
  kefu: function () {
    wx.showModal({
      title: '提示',
      content: '親，商家需要壹定的時間處理您的申請，若未協商壹致，您可以在商家拒絕後申請客服介入處理。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.refund_apply_id)
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