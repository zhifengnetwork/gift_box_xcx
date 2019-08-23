var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/select/select.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    video: '',
    popup: false,
    face: '',
    xuanzhong: '',
    x: 0,
    y: 0,
    xx: 0,
    xindex: 0,
    xxx: [],
    yy: 0,
    name: '',
    huancun: '',
    bqx: 100,
    bqy: 100,
    bqid: '',
    mute:false,
    music:'',
    music_pop: false,
    music_one:'',
    music_id:'',
    music: [],
    src: '',
    songName: '',
    musicone:'',
    audio:'',
    audio_id:'',
    audio_url:'',
    audio_name:'',
    audioid:'',
    musicid:'',
    xiabiao:0
  },

  // 静音播放
  mute:function(){
    let that = this
    that.setData({
      mute: !that.data.mute,
    })
  },

  
  // 点击每一首音乐
  bofang: function (e) {
    let that = this;
    let ind = e.currentTarget.dataset.ind;
    that.setData({xiabiao: ind})
    // for (let i = 0; i < this.data.music.length; i++) {
    //   this.data.music[i].radio = 'false';
    // }
    // this.data.music[ind].radio = 'true';
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

  // 点击配乐
  music:function(){
    let that = this
    that.setData({
      music_pop: !that.data.music_pop,
      src: that.data.musicone,
      music_id: that.data.music_one
    })
    console.log(that.data.music_id)
    that.audioCtx.play()
    if(that.data.audio){
      that.audio.pause()
    }
    // if(!that.data.music){
    //   api.postJSON('/api/sharing/get_sharing_music',{
    //     token: app.globalData.token,
    //     pid: -1,
    //   },function (res) {
    //     if (res.data.status == 1) {
    //       console.log(res)
    //       that.setData({
    //         music: res.data.data,
    //         music_one: res.data.data[0].id
    //       })
          // that.audioCtx.audioId = 'myAudio' + that.data.music_one
    //     }
    //   })
    // }
  },

  // 关闭配乐弹窗
  close:function(){
    let that = this
    that.setData({
      music_pop: !that.data.music_pop
    })
  },

  // 配乐确认
  queren:function(){
    let that = this
    console.log(that.data.music_id)
    that.audioCtx.pause()
    that.setData({
      music_pop: !that.data.music_pop,
      audio_id: that.data.music_id,
      audio: that.data.src
    })
    that.audio.play()
  },

  // 点击音乐库
  musicbank:function(){
    let that = this 
    console.log(that.data.music_id)
    that.audioCtx.pause()
    that.audio.pause()
    wx.navigateTo({
      url: '../selectmusic/selectmusic',
    })
  },


  // 点击音乐
  // bofang:function(e){
  //   let that = this
    // that.setData({
    //   music_id: e.currentTarget.dataset.id
    // })
    // that.audioCtx.audioId = 'myAudio'+that.data.music_id
    // if (that.audioCtx.paused) {
    //   that.audioCtx.play();
    //   console.log(1)
    // } else {
    //   console.log(2)
    //   that.audioCtx.pause();
    // }
    // that.audioCtx.paused
    // that.audioCtx.play()
    // console.log(that.audioCtx)
  // },

  // 点击跳转到标签页
  label: function () {
    let that = this
    if (app.globalData.a) {
      // wx.setStorageSync('name', that.data.name);
      // var aa = wx.getStorageSync('name')
      app.globalData.a = that.data.name
      console.log(app.globalData.a)
    }
    wx.navigateTo({
      url: '../label/label?pageid=1',
    })
  },

  // 下一步
  send: function () {
    let that = this
    app.globalData.biaoqing = that.data.xxx
    // var biaoqian = JSON.stringify(that.data.name);
    // var biaoqing = JSON.stringify(that.data.xxx);
    app.globalData.a = that.data.name
    if (that.data.audioid){
      that.setData({
        musicid: that.data.audioid
      })
      app.globalData.music_id = that.data.musicid
      wx.navigateTo({
        url: '../issue/issue'
      })
    } else if (that.data.music_id){
      that.setData({
        musicid: that.data.music_id
      })
      wx.navigateTo({
        url: '../issue/issue?pageid=1&musicid=' + that.data.musicid,
      })
    }else{
      wx.navigateTo({
        url: '../issue/issue?pageid=1',
      })
    }
    // console.log(app.globalData.a)
  },

  // 点击贴纸出现遮罩表情包
  biaoqing: function () {
    let that = this
    that.setData({
      popup: true
    })
    // console.log(that.data.xxx.concat([that.data.xindex,that.data.xx,that.data.yy]))
  },

  // 拖拽表情记录位置
  tuozhuai: function (e) {
    let that = this
    that.setData({
      xx: e.changedTouches[0].pageX,
      //  xindex: e.target.dataset.index,
      yy: e.changedTouches[0].pageY
    })

    console.log(that.data.xx)

  },

  // 拖拽标签记录位置
  biaoqian: function (e) {
    let that = this
    console.log(e)
    that.data.bqx = e.changedTouches[0].pageX
    that.data.bqy = e.changedTouches[0].pageY
    that.data.bqid = e.currentTarget.dataset.index
    // console.log(that.data.bqx)
    // console.log(that.data.bqy)
    // console.log(that.data.bqid)
    for (var i = 0; i < that.data.name.length; i++) {
      if (that.data.bqid == i) {
        that.data.name[i].bqx = that.data.bqx
        that.data.name[i].bqy = that.data.bqy
      }
    }
    console.log(that.data.name)
  },


  // 点击遮罩上方关闭遮罩
  guanbi: function () {
    let that = this
    that.setData({
      popup: false
    })
  },


  // 点击表情
  popup: function (e) {
    let that = this
    that.setData({
      popup: false,
      xuanzhong: that.data.face[e.currentTarget.dataset.index],
      xxindex: e.currentTarget.dataset.index,
      xindex: that.data.xindex + 1,
    })

    var aa = [{ id: that.data.xindex, x: that.data.xx, y: that.data.yy, img: that.data.xuanzhong }]
    that.setData({
      xxx: that.data.xxx.concat(aa)
    })
    app.globalData.biaoqing = that.data.xxx
    console.log(app.globalData.biaoqing)
    wx.setStorageSync('biaoqing', app.globalData.biaoqing);
    console.log(that.data.xxx)
  },

  popupbox:function(){
    let that =this
    if(that.data.music_pop){
      console.log(123)
      that.audioCtx.play()
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.globalData.type = 1
    that.setData({
      video: app.globalData.image,
    })

    var a = wx.getStorageSync('name')
    if (a) {
      that.setData({
        name: a
      })
    }
    
    var b = wx.getStorageSync('biaoqing')
    if (b) {
      that.setData({
        xxx: b
      })
    }
    
    if(options.url){
      that.setData({
      audio_name: options.songName,
      audio_url: options.url,
      audioid: options.id,
      // music_pop: true,
      })
      console.log(1234)
    }
    // that.audioCtx = wx.createAudioContext('myAudio')
    // console.log(that.audioCtx)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    // let that =this
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audio = wx.createAudioContext('audio')
  },
  

  // bindSendDanmu() {
  //   this.videoContext.play({
  //     // text: this.inputValue,
  //     // color: getRandomColor()
  //   })
  // }


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 进入页面请求表情包
    let that = this
    
    api.getJSON('/api/sharing/emojis', function (res) {
      if (res.data.status == 1) {
        console.log(res.data)
        that.setData({
          face: res.data.data
        })
      }
    })
    api.postJSON('api/sharing/get_sharing_music', {
      pid: -1,
    },function (res) {
      console.log(res.data.data)
      if (res.data.status == 1) {
        for (let i = 0; i < res.data.data.length; i++) {
          that.data.music.push({
            id: res.data.data[i].id,
            songName: res.data.data[i].name,
            singer: res.data.data[i].desc,
            src: res.data.data[i].url,
          })
          console.log(that.data.src)
        }
        that.setData({
          music: that.data.music,
          music_one: res.data.data[0].id,
          musicone: res.data.data[0].url
        })
      
      }
    })
    
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
    console.log(345)
    app.globalData.a = []
    console.log(app.globalData.a)
    wx.removeStorageSync('name')
    wx.removeStorageSync('biaoqing')
    console.log(wx.getStorageSync('name'))
    app.globalData.image = []
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