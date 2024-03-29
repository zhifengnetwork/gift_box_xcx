var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/labelsearch/labelsearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    currentTab: 0,
    inputValue: '',
    pinpai: '',
    shangpin:'',
    pagepp: 1,
    aa: [],
    name: '',
    pageid:'',
    addresslist:[],
    movie:[],
    allData:{}
  },

  // 输入框输入
  userNameInput: function(event) {
    var that = this;
    that.setData({
      inputValue: event.detail.value
    })
    this.throttle(this.queryData, null, 600, that.data.inputValue);

  },


  // 节流
  throttle: function(fn, context, delay, text) {
    clearTimeout(fn.timeoutId);
    fn.timeoutId = setTimeout(function() {
      fn.call(context, text);
    }, delay);
  },


  // 输入框输入延时后的操作
  queryData: function(e) {
    let that = this
    console.log(that.data.inputValue)
    // 判断输入框是否有值，有值则请求接口，每次输入完会请求一次接口
    if (that.data.inputValue) {
      // 判断当前的tab是否为2,是则请求品牌的接口
      if (that.data.currentTab == 2) {
        console.log(2)
        api.postJSON('api/sharing/brand_list', {
            page: that.data.pagepp,
            keyword: that.data.inputValue
          },
          function(res) {
            if (res.data.status == 1) {
              console.log(res.data)
              that.setData({
                pinpai: res.data.data
              })
            }
          })
      }
      // 判断当前的tab是否为3,是则请求商品的接口
      else if (that.data.currentTab == 3) {
        api.postJSON('api/sharing/goods_list', {
            page: that.data.pagesp,
            keyword: that.data.inputValue
          },
          function(res) {
            if (res.data.status == 1) {
              console.log(res.data)
              that.setData({
                shangpin: res.data.data
              })
            }
          })
      }
      // 输入框显示关闭符号
      that.setData({
        status: true,
      })
    } else { // 当输入框的值为空时，依旧请求接口，传空的值，这样才能在输入框删除完后再改变一次数据
    // 请求品牌接口
      if (that.data.currentTab == 2) {
        console.log(2)
        api.postJSON('api/sharing/brand_list', {
            page: that.data.pagepp,
            keyword: that.data.inputValue
          },
          function(res) {
            if (res.data.status == 1) {
              console.log(res.data)
              that.setData({
                pinpai: res.data.data
              })
            }
          })
      }
      // 请求商品接口
      else if (that.data.currentTab == 3) {
        api.postJSON('api/sharing/goods_list', {
            page: that.data.pagesp,
            keyword: that.data.inputValue
          },
          function(res) {
            if (res.data.status == 1) {
              console.log(res.data)
              that.setData({
                shangpin: res.data.data
              })
            }
          })
      }
      // 输入框关闭符隐藏
      that.setData({
        status: false
      })
    }

  },

  // tab切换
  //点击切换
  clickTab: function(e) {
    var that = this;
    console.log(e)
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        pagepp: 1
      })
      that.getData()
    }

    // 当current == 1的时候，请求品牌的接口
    // if (e.target.dataset.current == 2) {
    //   api.postJSON('api/sharing/brand_list', {
    //       page: that.data.pagepp,
    //       keyword: that.data.inputValue
    //     },
    //     function(res) {
    //       if (res.data.status == 1) {
    //         console.log(res.data)
    //         that.setData({
    //           pinpai: res.data.data
    //         })
    //       }
    //     })
    // }

    // // 当current == 2的时候，请求商品的接口
    // else if (e.target.dataset.current == 3) {
    //   console.log(that.data.pagesp)
    //   api.postJSON('api/sharing/goods_list', {
    //       page: that.data.pagesp,
    //       keyword: that.data.inputValue
    //     },
    //     function(res) {
    //       if (res.data.status == 1) {
    //         console.log(res.data)
    //         that.setData({
    //           shangpin: res.data.data
    //         })
    //       }
    //     })
    // }
    // // 当current == 1的时候，请求地点的接口
    // else if (e.target.dataset.current == 1){
    //   api.postJSON('api/sharing/label_list', {
    //     page: that.data.pagesp,
    //     keyword: that.data.inputValue,
    //     type:1
    //   },
    //     function (res) {
    //       if (res.data.status == 1) {
    //         console.log(res.data.data)
    //         that.setData({addresslist: res.data.data})
    //       }
    //     })
    // }
    // // 当current==4的时候，请求影视的接口
    // else if(e.target.dataset.current==4){
    //     api.postJSON('api/sharing/label_list', {
    //       page: that.data.pagesp,
    //       keyword: that.data.inputValue,
    //       type: 4
    //     },
    //       function (res) {
    //         if (res.data.status == 1) {
    //           console.log("ss6666")
    //           console.log(res.data.data)
    //           that.setData({movie: res.data.data})

    //         }
    //       })

    // }

  },








  // 点击回车跟搜素图片时跳转
  // huiche: function () {
  //   wx.navigateTo({
  //     url: '../labelsearch/labelsearch'
  //   });
  // },


  // 清空input的值
  del: function() {
    let that = this
    that.setData({
      inputValue: '',
      status: false
    })
    if (that.data.currentTab == 2) {
      console.log(2)
      api.postJSON('api/sharing/brand_list', {
        page: that.data.pagepp,
        keyword: that.data.inputValue
      },
        function (res) {
          if (res.data.status == 1) {
            console.log(res.data)
            that.setData({
              pinpai: res.data.data
            })
          }
        })
    }
    // 请求商品接口
    else if (that.data.currentTab == 3) {
      api.postJSON('api/sharing/goods_list', {
        page: that.data.pagesp,
        keyword: that.data.inputValue
      },
        function (res) {
          if (res.data.status == 1) {
            console.log(res.data)
            that.setData({
              shangpin: res.data.data
            })
          }
        })
    }

  },

  // 品牌里点击加载更多
  gengduopp: function() {
    let that = this
    that.setData({
      pagepp: that.data.pagepp + 1
    })
    this.getData();
    // console.log(that.data.pagepp)
    // api.postJSON('api/sharing/brand_list', {
    //     page: that.data.pagepp,
    //     keyword: that.data.inputValue
    //   },
    //   function(res) {
    //     if (res.data.status == 1) {
    //       console.log(res.data)
    //       that.data.pinpai = that.data.pinpai.concat(res.data.data)
    //       that.setData({
    //         pinpai: that.data.pinpai
    //       })
    //     }
    //   })
  },



  // 点击品牌把数据添加进全局app.globalData.a中
  pinpaibox: function(e) {
    let that = this
    console.log(e)
    // for (var i = 0; i < that.data.pinpai.length; i++) {
    //   if (that.data.pinpai[i].id == e.currentTarget.dataset.id) {
    //     var namelist = that.data.pinpai[i].name
    //   }
    // }
    // console.log(namelist)

    that.data.aa = {
      name: e.currentTarget.dataset.title,
      bqx: 100,
      bqy: 100,
      id: e.currentTarget.dataset.id
    }
    console.log(that.data.aa)
    if (!app.globalData.a) {
      app.globalData.a = ([that.data.aa])
      console.log("sss")
      console.log(app.globalData.a)
    } else {
      app.globalData.a.push(that.data.aa)
      console.log("sss")
      console.log(app.globalData.a)
    }

    wx.setStorageSync('name', app.globalData.a);
    if(that.data.pageid == 1){
      wx.navigateTo({
        url: '../select/select',
      })
    }else if(that.data.pageid == 0){
      wx.navigateTo({
        url: '../selectimg/selectimg?pageid=0',
      })
    }
  },
  // 地点box
  addressbox:function(e){
    var that=this
    that.data.aa = {
      name: e.currentTarget.dataset.title,
      bqx: 100,
      bqy: 100,
      id: e.currentTarget.dataset.id
    }
    console.log(that.data.aa)
    if (!app.globalData.a) {
      app.globalData.a = ([that.data.aa])
      console.log("sss")
      console.log(app.globalData.a)
    } else {
      app.globalData.a.push(that.data.aa)
      console.log("sss")
      console.log(app.globalData.a)
    }

    wx.setStorageSync('name', app.globalData.a);
    if (that.data.pageid == 1) {
      wx.navigateTo({
        url: '../select/select',
      })
    } else if (that.data.pageid == 0) {
      wx.navigateTo({
        url: '../selectimg/selectimg?pageid=0',
      })
    }

  },
  // 影视box
  moviebox:function(e){
    var that = this
    console.log("ssaaa")
    console.log(e.currentTarget.dataset.title)
    that.data.aa = {
      name: e.currentTarget.dataset.title,
      bqx: 100,
      bqy: 100,
      id: e.currentTarget.dataset.id
    }
    console.log(that.data.aa)
    if (!app.globalData.a) {
      app.globalData.a = ([that.data.aa])
      console.log("sss")
      console.log(app.globalData.a)
    } else {
      app.globalData.a.push(that.data.aa)
      console.log("sss")
      console.log(app.globalData.a)
    }
    wx.setStorageSync('name', app.globalData.a);
    if (that.data.pageid == 1) {
      wx.navigateTo({
        url: '../select/select',
      })
    } else if (that.data.pageid == 0) {
      wx.navigateTo({
        url: '../selectimg/selectimg?pageid=0',
      })
    }
  },

  // 点击商品把数据添加进全局app.globalData.a中
  shangpinbox: function(e) {
    let that = this
    // for (var i = 0; i < that.data.shangpin.length; i++) {
    //   if (that.data.shangpin[i].goods_id == e.currentTarget.dataset.id) {
    //     var namelist = that.data.shangpin[i].goods_name
    //   }
    // }
    // console.log(namelist)
    that.data.aa = {
      name: e.currentTarget.dataset.title,
      bqx: 100,
      bqy: 100,
      goods_id: e.currentTarget.dataset.id,
    }
    console.log(that.data.aa)
    if (!app.globalData.a) {
      app.globalData.a = ([that.data.aa])
      console.log("sss")
      console.log(app.globalData.a)
    } else {
      app.globalData.a.push(that.data.aa)
      console.log("sss")
      console.log(app.globalData.a)
    }
    wx.setStorageSync('name', app.globalData.a);
    wx.navigateTo({
      url: '../selectimg/selectimg?pageid=0',
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    var current = parseInt(options.current)+1
    console.log(current);
    that.setData({
      inputValue: options.inputValue,
      status: true,
      pageid: options.pageid,
      currentTab: current,
      bgImage: wx.getStorageSync('bgImage')
    })
    console.log(that.data.inputValue)
    // 点击进来这个页面的时候,需要渲染对应的项的内容
    // 当currentTab == 1的时候，请求地点的接口
    this.getData()
  },
  getData(){
    let that = this;
    //全部
    if(that.data.currentTab == 0){
      api.postJSON('api/sharing/label_list_all', {
        keyword: that.data.inputValue,
        type: 1
      },function (res) {
          if (res.data.status == 1) {
            console.log(res.data.data)

            for (var variable in res.data.data) {
              console.log(variable);
              res.data.data[variable]
              if(res.data.data[variable].length <= 10){
                that.data.allData[variable] = res.data.data[variable]
              }else{
                that.data.allData[variable] = res.data.data[variable].slice(0,10)
              }
            }
            that.setData({
              allData: that.data.allData
            })
          }
        })
    }
    //地点
    if (that.data.currentTab == 1) {
      api.postJSON('api/sharing/label_list', {
        page: that.data.pagepp,
        keyword: that.data.inputValue,
        type: 1
      },
        function (res) {
          if (res.data.status == 1) {
            // console.log(res.data.data)
            if (that.data.pagepp == 1) {
              that.setData({
                addresslist: res.data.data
              })
            } else {
              that.setData({
                addresslist: that.data.addresslist.concat(res.data.data)
              })
            }
          }
        })
    }
    // 当currentTab == 2的时候，请求品牌的接口
    if (that.data.currentTab == 2) {
      api.postJSON('api/sharing/brand_list', {
        page: that.data.pagepp,
        keyword: that.data.inputValue
      },
        function (res) {
          if (res.data.status == 1) {
            // console.log(res.data)
            if (that.data.pagepp == 1) {
              that.setData({
                pinpai: res.data.data
              })
            } else {
              that.setData({
                pinpai: that.data.pinpai.concat(res.data.data)
              })
            }
          }
        })
    }
    // 当currentTab == 3的时候，请求商品的接口
    if (that.data.currentTab == 3) {
      api.postJSON('api/sharing/goods_list', {
        page: that.data.pagepp,
        keyword: that.data.inputValue
      },
        function (res) {
          if (res.data.status == 1) {
            if (that.data.pagepp == 1) {
              that.setData({
                shangpin: res.data.data
              })
            } else {
              that.setData({
                shangpin: that.data.shangpin.concat(res.data.data)
              })
            }
          }
        })
    }
    //当currentTab==4的时候，请求影视的接口
    if (that.data.currentTab == 4) {
      api.postJSON('api/sharing/label_list', {
        page: that.data.pagepp,
        keyword: that.data.inputValue,
        type: 4
      },
        function (res) {
          if (res.data.status == 1) {
            if (that.data.pagepp == 1) {
              that.setData({
                movie: res.data.data
              })
            } else {
              that.setData({
                movie: that.data.movie.concat(res.data.data)
              })
            }
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

  }
})
