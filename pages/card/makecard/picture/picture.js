// pages/card/makecard/picture/picture.js
var api = require('../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: '',
    video:'',
    picture:''
  },
  
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var picture = options.picture == undefined ? '../../../public/images/card/picture.png' : options.picture;
    this.setData({
      imglist: picture
    })
  },

  // 点击添加按钮
  add: function() {
    var that = this;
    wx.showActionSheet({
      // itemList: ['拍照', '视频', '从手机相册选择'],
      itemList: ['拍照', '从手机相册选择'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          var type = 'camera';
        }

        if (res.tapIndex == 1) {
          var type = 'album';
        }
        
        if (res.tapIndex == 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: [type],
            success: function(res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths;
              that.upload(tempFilePaths);
              that.setData({
                imglist: tempFilePaths
              })
            }
          });
        } else
        // if (res.tapIndex == 1) {
        //   wx.chooseVideo({
        //     sourceType: [type],
        //     maxDuration: 60,
        //     camera: 'back',
        //     success(res) {
        //       var tempFilePaths = [];
        //       var tempFilePath = res.tempFilePath;
        //       tempFilePaths.push(tempFilePath)
        //       that.upload(tempFilePaths);
        //       that.setData({
        //         video: tempFilePath
        //       })
        //     }
        //   })
        // }else
        {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: [type],
            success: function (res) {
              console.log(res)
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths;
              that.upload(tempFilePaths);
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
  upload: function (tempFilePaths){
    let that = this;
    wx.uploadFile({
      url: 'https://www.9pointstars.com/api/box/upload_file',
      filePath: tempFilePaths[0],
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        'token': app.globalData.token
      },
      success: function (res) {
        let picture = JSON.parse(res.data)
        console.log(picture)
        that.setData({
          picture: picture.data
        })
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
    api.postJSON('api/box/set_box', {
      'token': app.globalData.token,
      'id': app.globalData.makecard,
      'photo_url': that.data.picture
    },
    function (res) {
      console.log(res)
      if(res.data.status==1){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];  //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            picture: that.data.picture
          })
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg
        })
      }
    })
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