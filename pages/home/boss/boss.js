var api = require('../../../utils/api');
// pages/home/boss/boss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list: 3,
    listdata: 8,
    bar_Height: wx.getSystemInfoSync().statusBarHeight,		// 获取手机状态栏高度
    xingxuanderen:[],
    tablist:[],
    tabtitleneirong:[],
    chagdu:4
  },
  clickTab: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    api.getJSON('/api/index/getGoodsList2?num=8&id=' + id, function (res) {
      if (res.data.status == 1) {
        console.log("biaoti")
        console.log(res.data.data);
        that.setData({tabtitleneirong:res.data.data})
      }
    })

     
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    api.getJSON('/api/index/get_attr?id=' + id, function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data);
        that.setData({ xingxuanderen: res.data.data.info});
        that.setData({ tablist: res.data.data.list})
        if (that.data.tablist.length>0){
          var id = that.data.tablist[0].id
          console.log(id)
          api.getJSON('/api/index/getGoodsList2?num=8&id=' + id, function (res) {
            if (res.data.status == 1) {
              console.log("biaoti")
              console.log(res.data.data);
              that.setData({ tabtitleneirong: res.data.data })
            }
          })
        }
        


      }
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