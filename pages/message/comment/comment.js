var api = require('../../../utils/api')
var app = getApp();
// pages/message/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    navheight:'',
    page: 1,
    rows: 20,
    isLastPage: 0,
    isLoadInterface: false,
    userList: [],
    datalist:'',
  },


  //查询数据列表
  searchDataList: function (pageNum) {
    let that = this;
    let pageIndex = pageNum;
    api.postJSON({
      url: 'api/sharing/user_comment_list',
      method: "POST",
      data: {
        "page": pageIndex,
        token: app.globalData.token,
      },
      success: function (res) {

        that.setData({
          isLastPage: res.data.status,
          page: pageIndex,
          isLoadInterface: false,
          datalist: res.data.data
        })

        if (res.data.data) {
          if (pageIndex > 1) {
            var listBefore = that.data.items;
            var currentList = res.data.data;
            that.setData({
              items: listBefore.concat(currentList)
            })
          } else {
            that.setData({
              items: res.data.data
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
  // 加载下一页数据
  nextDataPage: function () {
    let that = this;
    if (that.data.datalist.length>0){
      console.log(1)
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
    }
    else{
      console.log(2)
      wx.showToast({
        title: '我是有底线的',
        icon: 'none',
        duration: 600
      })
    }

  },



  

  // fenye:function(){
  //   let that = this
  //   api.postJSON('api/sharing/user_comment_list', {
  //     token: app.globalData.token,
  //     page: that.data.page
  //   }, function (res) {
  //     console.log(that.data.page)
  //     if (res.data.status == 1) {
  //       console.log(res.data.data)
  //       that.setData({
  //         item: res.data.data,
  //       })
  //       that.data.page++
  //       console.log(that.data.page)
  //     }
  //   })

  //   // that.GetList()

  //   //缓冲提醒
  //   wx.showToast({
  //     title: '加载中',
  //     icon: 'loading',
  //     duration: 400
  //   })
  //   //获取系统的参数，scrollHeight数值,微信必须要设置style:height才能监听滚动事件
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       console.info(res.windowHeight)
  //       that.setData({
  //         scrollHeight: res.windowHeight
  //       })
  //     }
  //   });
  // },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let page = that.data.page;
    that.searchDataList(page);
    // that.fenye()
    // try {
      const res = wx.getSystemInfoSync()
    //   console.log(res.model)
    //   console.log(res.pixelRatio)
    //   console.log(res.windowWidth)
    //   console.log(res.windowHeight)
    //   console.log(res.language)
    //   console.log(res.statusBarHeight)
    //   console.log(res.version)
    //   console.log(res.platform)
      that.setData({ navheight: res.statusBarHeight })
    // } catch (e) {
    //   // Do something when catch error
    // }
  },
  pageTo(e){
    wx.navigateTo({
      url: '/pages/home/enjoy/detail/detail?id=' + e.currentTarget.dataset.id,
    })
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