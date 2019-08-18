var api = require('../../../utils/api');
var app = getApp();
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight, // 获取手机状态栏高度
    imgWidth: 0,
    imgHeight: 0,
    scroll_height: 0,
    currentTab: 0,
    note: [],
    nav_title: [],
    list: [],
    bujia: true,
    goodslist: [],
    topic_id: 0,
    page: 2,
    image: [],
    type:'',
    dianzang:[],
    draft:'',
    draglist:[]
  },

  // 上传图片或视频按钮
  upimg: function() {
    let that = this

    console.log("================")
    console.log(that.data.draft)
    console.log("================")

    if(that.data.draft){
    
      wx.navigateTo({
        url: 'issue/issue?caogao=1',
      })
    }else{
      wx.showActionSheet({
        itemList: ['拍照', '選擇圖片', '選擇視頻', '拍視頻'],
        success(res) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            wx.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['camera'],
              success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths)
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
                    that.setData({
                      image: that.data.avatar
                    })
                    app.globalData.image = that.data.image
                    if (that.data.image) {
                      wx.navigateTo({
                        url: 'selectimg/selectimg',
                      })
                    }
                  }
                })
              }
            })
          } else if (res.tapIndex == 1) {
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
                    that.setData({
                      image: that.data.avatar
                    })
                    app.globalData.image = that.data.image
                    if (that.data.image) {
                      wx.navigateTo({
                        url: 'selectimg/selectimg',
                      })
                    }
                  }
                })
              }
            })

          } else if (res.tapIndex == 2) {
            wx.chooseVideo({
              sourceType: ['album'],
              maxDuration: 60,
              camera: 'back',
              success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePath = res.tempFilePath
                console.log(tempFilePath)
                wx.uploadFile({
                  url: 'https://giftbox.zhifengwangluo.com/api/Sharing/upload_file',
                  filePath: tempFilePath,
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
                    that.setData({
                      image: that.data.avatar
                    })
                    app.globalData.image = that.data.image
                    if (that.data.image) {
                      wx.navigateTo({
                        url: 'select/select',
                      })
                    }
                  }
                })
              }
            })
          } else if (res.tapIndex == 3) {
            wx.chooseVideo({
              sourceType: ['camera'],
              maxDuration: 60,
              camera: 'back',
              success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePath = res.tempFilePath
                console.log(tempFilePath)
                wx.uploadFile({
                  url: 'https://giftbox.zhifengwangluo.com/api/Sharing/upload_file',
                  filePath: tempFilePath,
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
                    that.setData({
                      image: that.data.avatar
                    })
                    app.globalData.image = that.data.image
                    if (that.data.image) {
                      wx.navigateTo({
                        url: 'select/select',
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.GetList(this);
    this.loadData()
  },

  /**
   * 加载数据
   */
  loadData: function () {

    var that = this;
    //缓冲提醒
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading',
    //   duration: 400
    // })
    //分页代码:获取系统的参数，scrollHeight数值,微信必须要设置style:height才能监听滚动事件
    wx.getSystemInfo({
      success: function(res) { 
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    });
    //tab切换标题
    api.getJSON('/api/Sharing/get_sharing_topic', function(res) {
      if (res.data.status == 1) {
        that.setData({
          nav_title: res.data.data
        });
      }
    })

    //储存草稿
    api.postJSON('api/sharing/sharing_info', {
      token: app.globalData.token,
    },function (res) {
      if (res.data.status == 1) {
        that.setData({
          draft: res.data.data
        })
      }
    }),

    // 请求tab切换下面那一块的数据
      api.getJSON('/api/sharing/sharing_list?num=8' + '&topic_id=' + that.data.topic_id + '&page=1&token=' + app.globalData.token, function (res) {
        if (res.data.status == 1) {
          that.setData({draglist: res.data.data})
        }
      })

  },

 

  GetList: function(that) {
   
    api.getJSON('/api/sharing/sharing_list?num=10' + '&topic_id=' + that.data.topic_id + '&page=' + that.data.page + '&token=' + app.globalData.token, function(res) {
      if (res.data.status == 1) {
        if (res.data.data.length > 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.goodslist.push(res.data.data[i])
          }
          that.setData({
            note: that.data.goodslist
          })
          console.log(that.data.note)
          that.data.page++;
        } else {
          that.setData({
            bujia: false
          })
        }
       
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


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
  // tab切换
  //点击切换
  clickTab: function(e) {
    var that = this;
    var arr = [];
    that.setData({
      goodslist: arr
    });
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    that.setData({
      topic_id: e.target.dataset.id
    });
    that.setData({
      bujia: true,
      page: 2
    })
    console.log(e.target.dataset.id)
    // 如果点击的是附近的话,就不分页了,点击其他的滚动条滚动到底部加载下一页
    console.log(that.data.nav_title[1].id)
    if (e.target.dataset.id === that.data.nav_title[1].id){
      api.getJSON('/api/sharing/sharing_list?topic_id=' + that.data.topic_id + '&token=' + app.globalData.token, function (res) {
        if (res.data.status == 1) { 
          console.log(res.data.data);
          that.setData({ note: res.data.data, bujia: false})
        
        }
      })
    }else{
      api.getJSON('/api/sharing/sharing_list?num=10' + '&topic_id=' + that.data.topic_id + '&page=1&token=' + app.globalData.token, function (res) {
        if (res.data.status == 1) {

          if (res.data.data.length > 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              that.data.goodslist.push(res.data.data[i])
            }
            that.setData({
              note: that.data.goodslist
            })
            that.data.page++;
          } else {
            var kong = []
            that.setData({
              bujia: false
            })
            that.setData({
              note: kong
            })
          }

        }
      })
    }
   
    
   


  },
  // dianji: function(e) {
  //   var that = this;
  //   var id = e.target.dataset.id;
  //   var index = e.target.dataset.index;
  //   console.log(index)
  //   console.log("-------")
  //   console.log(that.data.note)
  //   console.log("-------")
  //   //count	0未点赞 1已点赞
  //   if (that.data.note[index].count === 1) {
     
  //     api.getJSON('/api/sharing/add_point?token=' + app.globalData.token + '&sharing_id=' + id, function(res) {
  //       if (res.data.status == 1) {
  //         console.log("取消点赞");
  //         console.log(res.data);
  //         that.GetList(that);
  
  //       }
  //     })
  //     return;
  //   }
  //   if (that.data.note[index].count === 0) {
  
  //     api.getJSON('/api/sharing/add_point?token=' + app.globalData.token + '&sharing_id=' + id, function(res) {
  //       if (res.data.status == 1) {
  //         console.log("点赞成功");
  //         console.log(res.data);
  //         that.GetList(that);
        
  //       }
  //     })
  //   }
  // },
  // 跳转到商品详情
  details: function(e) {
    let that = this
    that.setData({
      id: e.currentTarget.dataset.id,
    })
    if (e.currentTarget.dataset.type == 0){
      wx.navigateTo({
        url: '../../home/enjoy/detail/detail?id=' + that.data.id,
      })
    } else if (e.currentTarget.dataset.type == 1){
      wx.navigateTo({
        url: 'detailvideo/detailvideo?id=' + that.data.id,
      })
    }
  },
  // 搜索框跳转页面
  search: function() {
    wx.navigateTo({
      url: '../../home/enjoy/searchfirst/searchfirst',
    })
  },
  bindDownLoad: function() {
    //该方法绑定了页面滑动到底部的事件,下拉一次请求一次数据
    if (this.data.bujia) {
      console.log("hhh")
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 400
      })
      var that = this;
      that.GetList(that); //页面拉一次，加载一次
    }
  }




})