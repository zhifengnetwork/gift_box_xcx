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
    // goodslist: [],
    topic_id: 0,
    page: 1,
    image: [],
    type:'',
    dianzang:[],
    draft:'',
    draglist:[],
    si:false,
    shebei:false,
    sb:false,
    latitude: '', // 维度
    longitude: '',  // 经度
    totalNoteList:[]  //附近总列表 自制分页
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
                  url: 'https://www.9pointstars.com/api/Sharing/upload_file',
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
                        url: 'selectimg/selectimg?type=0',
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
                  url: 'https://www.9pointstars.com/api/Sharing/upload_file',
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
                        url: 'selectimg/selectimg?type=0',
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
                console.log(res)
                wx.uploadFile({
                  url: 'https://www.9pointstars.com/api/Sharing/upload_file',
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
                        url: 'select/select?type=1',
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
                console.log(res)
                const tempFilePath = res.tempFilePath
                console.log(tempFilePath)
                wx.uploadFile({
                  url: 'https://www.9pointstars.com/api/Sharing/upload_file',
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
                        url: 'select/select?type=1',
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
    this.checkIsIPhoneX()
    if (app.globalData.isIPX===true){
      this.setData({sb:true})
    }else{
      this.setData({ sb: false })
    }
    // console.log(app.globalData.isIPX)
    // that.getPosition()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    that.loadData();
    that.setData({ page: 1})
    that.GetList(that)
    that.getPosition()
  },
  //获取经度纬度
  getPosition(){
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res, '地理位置?')
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
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
    if (this.data.currentTab == 1){
      if (!this.data.totalNoteList.length){
        this.setData({
          bujia: false
        })
      }else{
        // this.data.note =  this.data.note.concat(this.data.totalNoteList.splice(0,8))
        this._refresh(this.data.totalNoteList.splice(0, 8))
        this.setData({
          // note: this.data.note,
          page: this.data.page++
        })
      }
      wx.hideLoading()
      return
   }
    api.getJSON('/api/sharing/sharing_list?num=10' + '&topic_id=' + that.data.topic_id + '&page=' + that.data.page + '&token=' + app.globalData.token, function(res) {
      if (res.data.status == 1) {
        if (res.data.data.length > 0) {
          // for (var i = 0; i < res.data.data.length; i++) {
          //   that.data.goodslist.push(res.data.data[i])
          // }
          // that.setData({
          //   note: that.data.goodslist
          // })
          that._refresh(res.data.data)
          // console.log(that.data.note)
          that.data.page++;
        } else {
          that.setData({
            bujia: false
          })
        }
        wx.hideLoading()
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  

  _refresh(items) {
    const query = wx.createSelectorQuery().in(this)
    this.columnNodes = query.selectAll('#left-col-inner, #right-col-inner')

    return new Promise((resolve, reject) => {
      this._render(items, 0, () => {
        resolve()
      })
    })
  },
  _render(items, i, onComplete) {
    if (items.length > i ) {
      this.columnNodes.boundingClientRect().exec(arr => {
        const item = items[i]
        const rects = arr[0]

        const leftColHeight = rects[0].height
        const rightColHeight = rects[1].height

        this.setData({
          note: [...this.data.note, {
            ...item,
            columnPosition: leftColHeight <= rightColHeight ? 'left' : 'right'
          }]
        }, () => {
          this._render(items, ++i, onComplete)
        })
      })
    } else {
      onComplete && onComplete()
    }
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
    // that.setData({
    //   goodslist: arr
    // });
    if (e.target.dataset.id === that.data.nav_title[1].id) {
      if (that.data.latitude == ''){
        wx.showModal({
          content: '检测到您没打开定位权限，是否去设置打开？',
          confirmText: "确认",
          cancelText: "取消",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确认')
              wx.openSetting()
            } else {
              console.log('用户点击取消')
            }
          }
        });
        return false 
      }
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    that.setData({
      topic_id: e.target.dataset.id,
      bujia: true,
      page: 1,
      note: []
    });

    console.log(e.target.dataset.id, that.data.nav_title[2].id)
    // 如果点击的是附近的话,就不分页了,点击其他的滚动条滚动到底部加载下一页
    // console.log(that.data.nav_title[1].id)
    if (e.target.dataset.id == that.data.nav_title[1].id){
      api.getJSON('/api/sharing/sharing_list?topic_id=' + that.data.topic_id + '&token=' + app.globalData.token + '&lat=' + that.data.latitude + '&lat=' + that.data.longitude, 
      function (res) {
        if (res.data.status == 1) { 

          // console.log(res.data.data);
          that._refresh(res.data.data.splice(0, 8))
          that.setData({ 
            // note: res.data.data.splice(0, 8),
            bujia: true,
            totalNoteList: res.data.data
          })
        
        }
      })
    } else if (e.target.dataset.id == that.data.nav_title[2].id){
      api.getJSON('/api/sharing/sharing_list?is_new=1&num=10' + '&topic_id=' + that.data.topic_id + '&page=1&token=' + app.globalData.token, function (res) {
        if (res.data.status == 1) {

          if (res.data.data.length > 0) {
            // for (var i = 0; i < res.data.data.length; i++) {
            //   that.data.goodslist.push(res.data.data[i])
            // }
            // console.log(that.data.goodslist)
            // that.setData({
            //   note: that.data.goodslist
            // })
            that._refresh(res.data.data)
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
    }else{
      api.getJSON('/api/sharing/sharing_list?num=10' + '&topic_id=' + that.data.topic_id + '&page=1&token=' + app.globalData.token, function (res) {
        if (res.data.status == 1) {

          if (res.data.data.length > 0) {
            // for (var i = 0; i < res.data.data.length; i++) {
            //   that.data.goodslist.push(res.data.data[i])
            // }
            // console.log(that.data.goodslist)
            // that.setData({
            //   note: that.data.goodslist
            // })
            that._refresh(res.data.data)
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
      console.log("触底了~")
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      that.GetList(that); //页面拉一次，加载一次
    }
  },
  // 滚动条滚动
  scroll:function(e){
    // console.log(e.detail.scrollTop)
    if (app.globalData.isIPX === true) {
      this.setData({ shebei: true })
    } else {
      this.setData({ shebei: false })
    }  
    // 苹果设备
    if (app.globalData.isIPX === true){
      if (e.detail.scrollTop > 40) {
        this.setData({ shebei: true })
      }else{
        this.setData({ shebei: false })
      }
    }else{
      if (e.detail.scrollTop > 40) {
        this.setData({ si: true })
      } else {
        this.setData({ si:false })
      }
    }




    // if (e.detail.scrollTop>40){
    //   this.setData({si:true})
    //   this.setData({shebei: true})
    // }else{
    //   this.setData({si: false})
    //   this.setData({ shebei: false })
    // }
   
  },
  // 判断是不是苹果设备的方法
  checkIsIPhoneX: function () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') != -1) {
          app.globalData.isIPX = true
        }
        // 或者根据 screenHeight 进行判断
        // if (res.screenHeight == 812) {
        //   self.globalData.isIPX = true
        // }
      }
    })
  },
  
  




})