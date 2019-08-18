var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/ issue/ issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight, // 获取手机状态栏高度
    images: [],
    status: true,
    address: "",
    xianshi: false,
    xianshi2: false,
    topic: '',
    lat: '',
    lon: '',
    inputValue: '',
    content: '',
    biaoqing: '',
    biaoqian: '',
    tupian: '',
    pageid:'',
    music_id:'',
    type:'',
  },

  // 点击跳转到话题页面
  topic: function() {
    wx.navigateTo({
      url: '../topic/topic',
    })
  },

  // 获取标题
  userNameInput: function(event) {
    var that = this;
    that.setData({
      inputValue: event.detail.value
    })
  },

  // 获取内容
  content: function(event) {
    var that = this;
    that.setData({
      content: event.detail.value
    })
  },


  fabu: function() {
    let that = this
    console.log(that.data.biaoqian)
    // 判断图片
    if (that.data.images) {
      // 判断标题
      if (that.data.inputValue) {
        console.log(234)
        // 判断内容
        if (that.data.content) {
          console.log(345)
          // 判断话题
          if (that.data.topic) {
            console.log(456)
            // 判断地点
            if (that.data.lat || that.data.lon) {
              // console.log(567)
              // 万事俱备，请求接口
              // let txet = JSON.parse(that.data.biaoqian)
              // let text2 = JSON.parse(that.data.biaoqing)
              api.postJSON('api/sharing/add_Sharing', {
                token: app.globalData.token,
                priture: that.data.images.join(','),
                title: that.data.inputValue,
                content: that.data.content,
                topic_name: that.data.topic,
                lat: that.data.lat,
                lon: that.data.lon,
                text: JSON.stringify(that.data.biaoqian),
                text2: JSON.stringify(that.data.biaoqing),
                music_id: that.data.music_id,
                type: that.data.type
              }, function(res) {
                if (res.data.status == 1) {
                  console.log(res)
                  wx.showToast({
                    title: '發布成功',
                    icon: 'none',
                    duration: 1000,
                    success: function(res) {
                      setTimeout(function () {
                        wx.hideToast();
                        wx.reLaunch({
                          url: '../enjoy',
                        })
                        
                      }, 1000);
                    }
                  })
                }
              })
            } else {
              wx.showToast({
                title: '請填寫正確的地址',
                icon: 'none',
                duration: 1000
              })
            }
          } else {
            wx.showToast({
              title: '請參與話題',
              icon: 'none',
              duration: 1000
            })
          }
        } else {
          wx.showToast({
            title: '請填寫內容',
            icon: 'none',
            duration: 1000
          })
        }
      } else {
        wx.showToast({
          title: '請填寫標題',
          icon: 'none',
          duration: 1000
        })
      }
    } else {
      wx.showToast({
        title: '請添加圖片',
        icon: 'none',
        duration: 1000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(app.globalData.type)
    if (app.globalData.type){
      that.setData({
        type: app.globalData.type
      })
    }
    // if (options.topic) {
    //   that.setData({
    //     topic: options.topic,
    //   })
    // }
    // console.log(app.globalData.music_id)
    if (app.globalData.music_id){
      that.setData({
        music_id: app.globalData.music_id
      })
      
    }
    if (app.globalData.a){
      that.setData({
        biaoqian: app.globalData.a
      })
      console.log(typeof (JSON.stringify(that.data.biaoqian)))
    }

    if (app.globalData.biaoqing){
      that.setData({
        biaoqing: app.globalData.biaoqing
      })
    }
    if (app.globalData.image) {
      let image = []
      image = image.concat(app.globalData.image)
      that.setData({
        images: image,
        tupian: image
      })
    }

    // 如果是有草稿箱的情况
    if (app.globalData.caogao){
      api.postJSON('api/sharing/sharing_info', {
        token: app.globalData.token,
      }, function (res) {
        if (res.data.status == 1) {
          console.log(res)
          that.setData({
            images: res.data.data.priture,
            inputValue: res.data.data.title,
            content: res.data.data.content,
            type: res.data.data.type,
            biaoqian: res.data.data.text,
            biaoqing: res.data.data.text,
            music_id: res.data.data.music_id,
            lat: res.data.data.lat,
            lon: res.data.data.lon,
            // topic: res.data.data.topic_id
          })
        }
      })
    }
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

  },
  // chooseImage(e) {
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
  //     sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
  //     success: res => {
  //       const images = this.data.images.concat(res.tempFilePaths)
  //       // 限制最多只能留下3张照片
  //       const images1 = images.length <= 9 ? images : images.slice(0, 9)
  //       this.setData({
  //         images: images1
  //       })
  //     }
  //   })
  // },

  chooseImage:function(e){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://giftbox.zhifengwangluo.com/api/Sharing/upload_file',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            'token': app.globalData.token,
          },
          success: function (res) {
            let avatar = JSON.parse(res.data)
            that.setData({
              avatar: avatar.data
            })
            console.log(that.data.avatar)
            // that.setData({
            //   image: that.data.avatar
            // })
            // let image = []
            const images1 = that.data.images.concat(that.data.avatar)
            const images2 = images1.length <= 3 ? images1 : images1.slice(0, 3)
            that.setData({
              images: images2
            })
            // if (that.data.image) {
            //   wx.navigateTo({
            //     url: '../selectimg/selectimg',
            //   })
            // }
          }
        })
      }
    })
  },




  removeImage(e) {
    var that = this;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx, 1)
    this.setData({
      images: images
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  dingwei: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        // success
        console.log(res, "location")
        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          address: res.name,
          lat: res.latitude,
          lon: res.longitude,
          status: false
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    console.log("666")
  },
  chumask1: function() {
    this.setData({
      xianshi: true
    })
  },
  quxiao: function() {
    this.setData({
      xianshi: false
    })
  },
  sure: function() {
    let that = this
    that.setData({
      xianshi: false
    })
    console.log(that.data.biaoqian)
    console.log(that.data.biaoqing)
    api.postJSON('api/sharing/add_Sharing', {
      token: app.globalData.token,
      priture: that.data.images.join(','),
      title: that.data.inputValue,
      content: that.data.content,
      topic_name: that.data.topic,
      lat: that.data.lat,
      lon: that.data.lon,
      txet: JSON.stringify(that.data.biaoqian),
      text2: JSON.stringify(that.data.biaoqing),
      music_id: that.data.music_id,
      status: 1,
      type: that.data.pageid
    }, function(res) {
      if (res.data.status == 1) {
        console.log(res)
        wx.showToast({
          title: '保存草稿成功',
          duration: 1000,
          success: function (res) {
            setTimeout(function () {
              wx.hideToast();
              wx.navigateBack({
                url: '../enjoy',
              })
            }, 1000);
          }
        })
      }
    })
  },
  selectfengmian:function(){
   var that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://giftbox.zhifengwangluo.com/api/Sharing/upload_file',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            'token': app.globalData.token,
          },
          success: function (res) {
            let avatar = JSON.parse(res.data)
            that.setData({
              avatar: avatar.data
            })
            console.log(that.data.avatar)
            // that.setData({
            //   image: that.data.avatar
            // })
            // let image = []
            // const images1 = that.data.images.concat(that.data.avatar)
            // const images2 = images1.length <= 3 ? images1 : images1.slice(0, 3)
            // that.setData({
            //   images: images2
            // })
            // if (that.data.image) {
            //   wx.navigateTo({
            //     url: '../selectimg/selectimg',
            //   })
            // }
          }
        })
      }
    })  

  },
  goBack: function() {
    this.setData({
      xianshi2: true
    })
  },
  quxiao2: function() {
    this.setData({
      xianshi2: false
    })
    wx.navigateBack({
      url: '../enjoy',
    })
  },
  sure2: function() {
    let that = this
    that.setData({
      xianshi2: false
    })
    api.postJSON('api/sharing/add_Sharing', {
      token: app.globalData.token,
      priture: that.data.images.join(','),
      title: that.data.inputValue,
      content: that.data.content,
      topic_name: that.data.topic,
      lat: that.data.lat,
      lon: that.data.lon,
      txet: JSON.stringify(that.data.biaoqian),
      text2: JSON.stringify(that.data.biaoqing),
      status: 1,
      type: that.data.pageid,
      music_id: that.data.music_id
    }, function(res) {
      if (res.data.status == 1) {
        console.log(res)
        wx.showToast({
          title: '保存草稿成功',
          duration: 1000,
          success: function(res) {
            setTimeout(function() {　　　　
              wx.hideToast();
              wx.navigateBack({
                url: '../enjoy',
              })　　
            }, 1000);
          }
        })
      }
    })
  }
})