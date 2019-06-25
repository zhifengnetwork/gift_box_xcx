// pages/card/makecard/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music: [{
      songName: '克罗地亚',
      singer: '111',
      radio: 'true'
    },
    {
      songName: '克罗地亚狂想曲',
      singer: '222',
      radio: 'false'
    },
    {
      songName: '克',
      singer: '333',
      radio: 'false'
    },
    ]
  },
  right:function(e){
    let that = this;
    let ind = e.currentTarget.dataset.ind;
    for (let i = 0; i < this.data.music.length;i++){
      this.data.music[i].radio = 'false';
    }
    this.data.music[ind].radio = 'true';
    that.setData({
      music: this.data.music
    })
  },
  send:function(){
    var that = this
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function () {
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