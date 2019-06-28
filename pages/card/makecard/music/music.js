// pages/card/makecard/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music: [{
      songName: 'The Dawn (亡灵序曲完美钢琴版) [Cover Dreamtale]',
      singer: 'Mike Zhou',
      radio: 'true',
      src:'http://music.163.com/song/media/outer/url?id=476592630.mp3'
    },
    {
      songName: 'Croatian Rhapsody',
      singer: 'Maksim Mrvica',
      radio: 'false',
      src: 'http://music.163.com/song/media/outer/url?id=1696373.mp3'
    },
    {
      songName: 'Stronger Than You',
      singer: 'Chara Parody',
      radio: 'false',
      src: 'http://music.163.com/song/media/outer/url?id=410519017.mp3'
    },
    ],
    src:''
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
      src: that.data.music[ind].src
    })
    // 播放音乐
    console.log(that.data.music[ind].src)
    this.audioCtx.play()
  },
  // 提交数据&&返回上一页
  send:function(){
    var that = this
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
        music: that.data.src
      })
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
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