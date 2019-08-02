var api = require('../../../utils/api');
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight,		// 获取手机状态栏高度
    imgWidth: 0, 
    imgHeight: 0,
    scroll_height: 0,
    currentTab:0,
    note: [],
    nav_title:[],
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    api.getJSON('/api/Sharing/get_sharing_topic', function (res) {
      if (res.data.status == 1) {     
        console.log(res.data.data);
        that.setData({nav_title:res.data.data});
      }
    }),
    api.getJSON('/api/sharing/sharing_list?topic_id=0&page=1&num=3333'+'&token='+app.globalData.token, function (res) {
        if (res.data.status == 1) {
          console.log(res.data.data);
          that.setData({ note: res.data.data });
         
        
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
    
  },
  // tab切换
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    } 
    console.log(e.target.dataset.id)
    api.getJSON('/api/sharing/sharing_list?topic_id=' + e.target.dataset.id + '&page=1&num=3333' + '&token=' + app.globalData.token, function (res)    {
      if (res.data.status == 1) {
        console.log(res.data.data);
        that.setData({note:res.data.data});
           
      }
    })
   

  },
  dianji:function(e){
    var that=this;
    var id=e.target.dataset.id;
    var index = e.target.dataset.index;
    console.log(index)
    
    if (that.data.note[index].count==1){
        api.getJSON('/api/sharing/add_point?token=' + app.globalData.token + '&sharing_id=' + id, function (res) {
          if (res.data.status == 1) {
          console.log("取消点赞");
          console.log(res.data)
            that.onLoad()
          }
      })
        return;
    }
    if (that.data.note[index].count == 0) {
      api.getJSON('/api/sharing/add_point?token=' + app.globalData.token + '&sharing_id=' + id, function (res) {
        if (res.data.status == 1) {
          console.log("点赞成功");
          console.log(res.data)
          that.onLoad()
        }
      })
    }
  },
  // 跳转到商品详情
  details:function(){
    wx.navigateTo({
      url: '../../home/enjoy/detail/detail',
    })
  },
  // 搜索框跳转页面
  search:function(){
    wx.navigateTo({
      url: '../../home/enjoy/searchfirst/searchfirst',
    })
  }
 


})
