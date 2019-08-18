var api = require('../../../../utils/api');
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
    type: '',
    dianzang: [],
    draft: '',
    draglist: [],
    keyword:'',
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var that=this
    that.setData({ keyword: options.keyword})
    api.getJSON('/api/sharing/search_sharing?num=10' + '&keyword=' + that.data.keyword + '&page=' + that.data.page + '&token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data)
        if (res.data.data.length > 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.goodslist.push(res.data.data[i])
          }
          that.setData({
            note: that.data.goodslist
          })

        }

      }
    })
  },
  // 跳转到商品详情
  details: function (e) {
    let that = this
    that.setData({
      id: e.currentTarget.dataset.id,
    })
    if (e.currentTarget.dataset.type == 0) {
      wx.navigateTo({
        url: '../../../home/enjoy/detail/detail?id=' + that.data.id,
      })
    } else if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: '../detailvideo/detailvideo?id=' + that.data.id,
      })
    }
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