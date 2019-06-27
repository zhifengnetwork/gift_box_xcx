// pages/card/makecard/picture/picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: ''
  },
  add: function() {
    var _this = this;
    wx.showActionSheet({
      itemList: ['拍照/视频', '从手机相册选择'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex==0){
          var type = 'camera';
        }else{
          var type = 'album';
        }
        wx.chooseImage({
          count: 1, 
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: [type], 
          success: function(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            _this.setData({
              imglist: tempFilePaths
            })
          }
        });
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  delete: function() {
    this.setData({
      imglist: ''
    })
  },
  send: function() {
    var that = this
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function() {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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