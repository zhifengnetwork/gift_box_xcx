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
  },

  // 静音播放
  mute:function(){
    let that = this
    that.setData({
      mute: !that.data.mute,
    })
  },

  // 点击配乐，判断有无music数据，没有就请求接口
  music:function(){
    let that = this
    that.setData({
      music_pop: !that.data.music_pop
    })
    if(!that.data.music){
      api.postJSON('/api/sharing/get_sharing_music',{
        token: app.globalData.token,
        pid: -1,
      },function (res) {
        if (res.data.status == 1) {
          console.log(res)
          that.setData({
            music: res.data.data,
            music_one: res.data.data[0].id
          })
          that.audioCtx.audioId = 'myAudio' + that.data.music_one
          that.audioCtx.play()
        }
      })
    }
  },

  // 关闭配乐弹窗
  close:function(){
    let that = this
    that.setData({
      music_pop: !that.data.music_pop
    })
  },

  // 点击音乐
  bofang:function(e){
    let that = this
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
  },

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
    console.log(app.globalData.a)
    wx.navigateTo({
      url: '../issue/issue?pageid=1',
    })
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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      video: app.globalData.image
    })

    var a = wx.getStorageSync('name')
    console.log(a)
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
    console.log(that.data.name)

    that.audioCtx = wx.createAudioContext('myAudio')
    console.log(that.audioCtx)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    let that =this
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