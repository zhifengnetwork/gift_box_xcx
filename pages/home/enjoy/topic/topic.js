var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取手机状态栏高度
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    item:[],
    page: 1,
    rows: 10,
    isLastPage: false,
    isLoadInterface: false,
    datalist: '',
    index:0,
    currentTab:0,
    inputValue:'',
    itemlist:[],
    pid: 1,
    topic:'',
    list:'',
  },

  //查询关注数据列表
  searchDataList: function (pageNum) {
    let that = this;
    let pageIndex = pageNum;
    
    api.postJSON({
      url: 'api/sharing/join_topic',
      method: "POST",
      data: {
        token: app.globalData.token,
        "page": pageIndex,
        "num": that.data.rows,
        "pid": that.data.pid 
      },
      success: function (res) {

        that.setData({
          isLastPage: res.data.status,
          page: pageIndex,
          isLoadInterface: false,
          datalist: res.data.data
        })
        if (res.data.data != undefined) {
          if (pageIndex > 1) {
            var listBefore = that.data.itemlist;
            var currentList = res.data.data;
            that.setData({
              itemlist: listBefore.concat(currentList)
            })
          } else {
            that.setData({
              itemlist: res.data.data
            })
          }
        }
      }, complete(e) {
        that.setData({
          isShowLoadPage: false
        })
      }
    })
  },

  // 触底加载下一页
  nextDataPage: function () {
    let that = this;
    if (that.data.datalist.length > 0) {
      // console.log(1)
      let islastVar = that.data.isLastPage;

      if (!that.data.isLoadInterface) {
        // console.log(456)
        if (islastVar) {
          //防止在接口未执行完再次调用接口
          // console.log(that.data.datalist)
          that.setData({
            isLoadInterface: true
          })
          let page = that.data.page * 1 + 1;
          that.searchDataList(page);
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 200
          })
        }
      }
    } else {
      // console.log(2)
      wx.showToast({
        title: '我是有底线的',
        icon: 'none',
        duration: 600
      })
    }
  },


  // 显示关闭符号
  userNameInput: function (event) {
    var that = this;
    // if (event.detail.value == '') {
    //   that.setData({ status: false })
    // } else {
    //   that.setData({ status: true })
    // }
    that.setData({ inputValue: event.detail.value })

    // 延时
    this.throttle(this.queryData, null, 600, that.data.inputValue);
  },
  
  // 节流
  throttle: function (fn, context, delay, text) {
    clearTimeout(fn.timeoutId);
    fn.timeoutId = setTimeout(function () {
      fn.call(context, text);
    }, delay);
  },

  // 输入框输入延时后的操作
  queryData: function (e) {
    let that = this
    console.log(that.data.inputValue)
    // 判断输入框是否有值，有值则请求接口，每次输入完会请求一次接口
    if (that.data.inputValue) {
      console.log(1)
      api.postJSON('api/sharing/join_topic', {
          page: that.data.page,
          keyword: that.data.inputValue
        },
          function (res) {
            if (res.data.status == 1) {
              that.setData({
                itemlist: res.data.data,
                list: that.data.inputValue
              })
              // console.log(that.data.itemlist)
              // if (!res.data.data.length){
              //   that.setData({
              //     list: that.data.inputValue
              //   })
              // }
            }
          })
          
      // 输入框显示关闭符号
      that.setData({
        status: true,
      })
    } else { // 当输入框的值为空时， 
      console.log(2)
      api.postJSON('api/sharing/join_topic', {
          page: that.data.page,
          pid: that.data.pid,
          keyword: that.data.inputValue
        },
          function (res) {
            if (res.data.status == 1) {
              console.log(res.data)
              that.setData({
                itemlist: res.data.data,
                list: that.data.inputValue
              })
            }
          })
      // 输入框关闭符隐藏
      that.setData({
        status: false
      })
    }
  },



  // 清空内容
  del: function () {
    this.setData({ 'inputValue': '' })
  },


  // 搜索内容
  // huiche: function () {
  //   api.getJSON('/api/sharing/search_sharing?token=' + app.globalData.token + '&keyword=' + this.data.keyword, function (res) {
  //     if (res.data.status == 1) {
  //       console.log("搜索成功")
  //     }
  //   })
  // },

  clickTab: function (e) {
    var that = this;
    console.log(e)
    // 点击切换
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }

    // 获取到id
    for(var i=0;i<that.data.item.length;i++){
      var pid = that.data.item[e.target.dataset.current].id
    }
    that.setData({
      pid: pid
    })
    console.log(that.data.pid)
    // 请求接口
      let page = 1
      that.searchDataList(page);
  },


  // 点击每一个表标签
  topic:function(e){
    let that = this
    // console.log(e.currentTarget.dataset.name)
    this.setData({
      topic: e.currentTarget.dataset.name
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      topic: e.currentTarget.dataset.name
    })
    wx.navigateBack({
      delta: 1
    })
    // wx.navigateTo({
    //   url: '../issue/issue?topic=' + that.data.topic,
    // })
  },

  // 点击创建新话题
  kong:function(){
    let that = this
    wx.navigateTo({
      url: '../issue/issue?topic=' + that.data.list,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    api.postJSON('api/sharing/join_topic', {
      token: app.globalData.token,
    }, function (res) {
      if (res.data.status == 1) {
        that.setData({
          item: res.data.data,
          // pid: res.data.data[0].id
        })
      }
    })
    let page = that.data.page;
    that.searchDataList(page);
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