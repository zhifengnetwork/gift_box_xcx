var api = require('../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight,		// 获取手机状态栏高度
    item:[],
    page:1,
    rows: 10,
    isLastPage: false,
    isLoadInterface: false,
    datalist: '',
    user_id:null
  },

  // 点击跳转到他人页面
  followlist:function(e){
    let that = this
    console.log(e.target.dataset.id)
    for(var i = 0;i<that.data.item.length;i++){
      var user_id = that.data.item[e.target.dataset.id].user_id
    }
    // console.log(user_id)
    wx.navigateTo({
      url: '../other/other?user_id=' + user_id,
    })
  },

  //查询关注数据列表
  searchDataList: function (pageNum) {
    let that = this;
      let pageIndex = pageNum;
      api.postJSON({
        url: 'api/sharing/my_follow',
        method: "POST",
        data: {
          token: app.globalData.token,
          "page": pageIndex,
          "num": that.data.rows
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
                item: listBefore.concat(currentList)
              })
            } else {
              that.setData({
                item: res.data.data
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
  // 关注按钮
  guanzhu: function (e) {
    let that = this
    var userid=e.currentTarget.dataset.userid
    var index=e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    that.setData({user_id: userid})
    var item=that.data.item
      wx.showModal({
        content: '確認不再關注?',
        success(res) {
          if (res.confirm) {
            item[index].follow_count = !item[index].follow_count;
            that.setData({ item: item })
            api.postJSON('api/sharing/add_follow', {
              token: app.globalData.token,
              follow_user_id: that.data.user_id
            }, function (res) {
              if (res.data.status == 1) {
                console.log(res)
                that.onLoad()
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
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

  },
  

})