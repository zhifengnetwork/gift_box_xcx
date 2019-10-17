var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/selectmusic/selectmusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list:'',
    music: [],
    src: '',
    music_id: '',
    songName: '',
    musicone: '',
    block:'',
    xiabiao:null
  },

  // tab切换
  clickTab: function(e) {
    var that = this;
    console.log(e)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        music: []
      })
      this.getData(e.target.dataset.id)
    }
  },

  // 点击每一首音乐
  bofang: function (e) {
    let that = this;
    let ind = e.currentTarget.dataset.ind;
    that.setData({
      music: this.data.music,
      src: that.data.music[ind].src,
      songName: that.data.music[ind].songName,
      music_id: that.data.music[ind].id,
      xiabiao: ind,
    })
    // 播放音乐
    console.log(that.data.music[ind].id)
    this.audioCtx.play()
  },

  // 点击使用按钮
  shiyong:function(){
    let that = this
    console.log(that.data.music_id)
    console.log(that.data.src)
    wx.navigateTo({
      url: '../select/select?id=' + that.data.music_id + '&url=' + that.data.src + '&songName=' + that.data.songName,
    })
    that.audioCtx.pause()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // tab切换接口
    api.postJSON('api/sharing/get_sharing_music',function(res){
      if (res.data.status == 1){
        console.log(res)
        that.setData({
          list: res.data.data
        })
      }
    })

    this.getData(-1)
  },
  getData(pid){
    var that = this;
    api.postJSON('api/sharing/get_sharing_music', {
      pid,
      num: 100
    }, function (res) {
      console.log(res.data.data)
      if (res.data.status == 1) {
        for (let i = 0; i < res.data.data.length; i++) {
          that.data.music.push({
            id: res.data.data[i].id,
            songName: res.data.data[i].name,
            singer: res.data.data[i].desc,
            src: res.data.data[i].url,
            length: res.data.data[i].length
          })
        }
        that.setData({
          music: that.data.music,
          music_one: res.data.data[0].id,
          musicone: res.data.data[0].url
        })
        console.log(that.data.music)
      }
    })
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