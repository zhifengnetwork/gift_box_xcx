// pages/card/makecard/picture/picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: '',
    video:''
  },
  // 点击添加按钮
  add: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['拍照', '视频', '从手机相册选择'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex != 2) {
          var type = 'camera';
        } else {
          var type = 'album';
        }
        if (res.tapIndex == 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: [type],
            success: function(res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              that.setData({
                imglist: tempFilePaths
              })
            }
          });
        } else if (res.tapIndex == 1) {
          wx.chooseVideo({
            sourceType: [type],
            maxDuration: 60,
            camera: 'back',
            success(res) {
              console.log(res.tempFilePath)
              that.setData({
                video: res.tempFilePath
              })
            }
          })
        }else{
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: [type],
            success: function (res) {
              console.log(res)
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              that.setData({
                imglist: tempFilePaths
              })
            }
          });
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  // 删除
  delete: function() {
    this.setData({
      imglist: '',
      video: '',
    })
  },
  // 提交
  send: function() {
    if (!this.data.imglist&&!this.data.video){
      wx.showModal({
        title: '提示',
        content: '请添加图片或视频',
        showCancel: false
      })
      return false;
    }
    var that = this
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function () {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      var value = '';
      if (that.data.imglist==''){
        value = that.data.video;
      }else{
        value = that.data.imglist;
      }
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        picture: value
      })
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