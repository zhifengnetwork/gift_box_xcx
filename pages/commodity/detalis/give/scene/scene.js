// pages/commodity/detalis/give/scene/scene.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene:'',
    get_scene:'',
    tabBar:[]
  },
  send:function(){
    wx.navigateTo({
      url: '../../../../card/makecard/makecard',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let array = []
    api.postJSON('api/box/box_scene_list',function(res){
      that.get_scene(res.data.data[0].id);
      for (let i = 0; i < res.data.data.length; i++) { 
        if(i==0){
          array.push(true);
        }else{
          array.push(false)
        }
      }
      that.setData({
        scene:res.data.data,
        tabBar:array
      })
      console.log(res)
    })
  },
  tabBar:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    for (let i = 0; i < that.data.tabBar.length;i++){
      that.data.tabBar[i] = false;
    }
    that.data.tabBar[index] = true;
    that.get_scene(id);
    that.setData({
      tabBar: that.data.tabBar
    })
  },
  get_scene:function(id){
    let that = this;
    api.postJSON('api/box/get_scene', {
      id: id
    }, function (res) {
      that.setData({
        get_scene:res.data.data
      })
      console.log(res)
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