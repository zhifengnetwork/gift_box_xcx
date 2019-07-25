// pages/card/makecard/music/music.js
var api = require('../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music: [],
    src:'',
    music_id:'',
    songName:''
  },
  // 选择样式
  right:function(e){
    let that = this;
    let ind = e.currentTarget.dataset.ind;
    for (let i = 0; i < this.data.music.length;i++){
      this.data.music[i].radio = 'false';
    }
    this.data.music[ind].radio = 'true';
    that.setData({
      music: this.data.music,
      src: that.data.music[ind].src,
      songName: that.data.music[ind].songName,
      music_id: that.data.music[ind].id
    })
    // 播放音乐
    console.log(that.data.music[ind].id)
    this.audioCtx.play()
  },
  // 提交数据&&返回上一页
  send:function(){
    if(this.data.src==''){
      wx.showModal({
        title: '选择音乐',
        content: '请选择音乐',
        showCancel: false
      })
      return false;
    }
    var that = this;
    api.postJSON('api/box/set_box',{
      'token': app.globalData.token,
      'id': app.globalData.makecard,
      'music_id': that.data.music_id
    },
    function (res) {
      console.log(res)
      if(res.data.status==1){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];  //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            music: that.data.songName
          })
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    api.postJSON('api/box/get_music_list', function (res) {
      console.log(res.data.data)
      if (res.data.status==1){
        for(let i = 0;i<res.data.data.length;i++){
          that.data.music.push({
            id: res.data.data[i].id,
            songName: res.data.data[i].name,
            singer: res.data.data[i].musician,
            src: res.data.data[i].music_url,
            radio: false
          })
        }
        that.setData({
          music: that.data.music
        })
      }
    })
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