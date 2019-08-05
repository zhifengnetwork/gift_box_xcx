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
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }

    // 当current == 1的时候，请求品牌的接口
    if (e.target.dataset.current == 2) {
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

    // 当current == 2的时候，请求商品的接口
    else if (e.target.dataset.current == 3) {
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
    console.log(that.data.pagepp)
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
  },



  // 点击品牌把数据添加进全局app.globalData.a中
  pinpaibox: function(e) {
    let that = this
    for (var i = 0; i < that.data.pinpai.length; i++) {
      if (that.data.pinpai[i].id == e.target.dataset.id) {
        var namelist = that.data.pinpai[i].name
      }
    }
    // that.data.aa.push(namelist)
    // console.log(that.data.aa)
    // that.setData({
    //   name: that.data.aa
    // })
    // console.log(that.data.name)
    that.data.aa = {
      name: namelist,
      bqx: 100,
      bqy: 100
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
      url: '../selectimg/selectimg',
    })
  },

  // 点击商品把数据添加进全局app.globalData.a中
  shangpinbox: function(e) {
    let that = this
    for (var i = 0; i < that.data.shangpin.length; i++) {
      if (that.data.shangpin[i].goods_id == e.target.dataset.id) {
        var namelist = that.data.shangpin[i].goods_name
      }
    }
    that.data.aa = {
      name: namelist,
      bqx: 100,
      bqy: 100
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
      url: '../selectimg/selectimg',
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      inputValue: options.inputValue,
      status: true
    })
    console.log(that.data.inputValue)
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