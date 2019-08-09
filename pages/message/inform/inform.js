var api = require('../../../utils/api')
var app = getApp();
// pages/message/inform/inform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [],
    page: 1,
    rows: 10,
    isLastPage: false,
    isLoadInterface: false,
    datalist: '',
    cover:'',
  },


  //查询关注数据列表
  searchDataList: function (pageNum) {
    let that = this;
    let pageIndex = pageNum;

    api.postJSON({
      url: 'api/sharing/article_list',
      method: "POST",
      data: {
        token: app.globalData.token,
        "page": pageIndex,
        "num": that.data.rows,
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
            var listBefore = that.data.item;
            var currentList = res.data.data;
            that.setData({
              item: listBefore.concat(currentList),
              // cover: res.data.data.cover
            })
            
          } else {
            that.setData({
              item: res.data.data,
              // cover: res.data.data.cover
            })
            // console.log(res.data.data)
            console.log(res.data.data[0].cover)
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




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
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