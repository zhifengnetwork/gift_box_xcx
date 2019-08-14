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
    tabBar:[],
    tabCont:[],
    array:'',
    id:'',
    name:'',
    picture:''
  },
  send:function(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    console.log(this.data.name, this.data.picture, this.data.id)
    prevPage.setData({
      radio:0,
      backName: this.data.name ? this.data.name : this.data.get_scene[0].name,
      backPicture: this.data.picture ? this.data.picture : this.data.get_scene[0].picture,
      backId: this.data.id ? this.data.id : this.data.get_scene[0].id
    })
    prevPage.radioChange();
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let array = [];
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
      tabBar: that.data.tabBar,
    })
  },
  tabCont:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    for (let i = 0; i < that.data.tabCont.length; i++) {
      that.data.tabCont[i] = false;
    }
    that.data.tabCont[index] = true;
    that.setData({
      tabCont: that.data.tabCont,
      id: id,
      picture: that.data.get_scene[index].picture,
      name: that.data.get_scene[index].name
    })
  },
  get_scene:function(id){
    let that = this;
    let array = [];
    api.postJSON('api/box/get_scene', {
      id: id
    }, function (res) {
      for (let i = 0; i < res.data.data.length; i++) {
        if (i == 0) {
          array.push(true);
        } else {
          array.push(false)
        }
      }
      that.setData({
        get_scene:res.data.data,
        tabCont: array
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