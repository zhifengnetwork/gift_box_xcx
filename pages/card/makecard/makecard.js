// pages/card/makecard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: '1',
        url: 'music/music',
        text: '选择音乐',
        tips: '确认歌曲',
        img: '../../public/images/card/music.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '2',
        url: 'picture/picture',
        text: '选择照片/视频',
        tips: '确认照片',
        img: '../../public/images/card/picture.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '3',
        url: 'record/record',
        text: '录入语音',
        tips: '请录入',
        img: '../../public/images/card/record.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '4',
        url: 'blessing/blessing',
        text: '写下祝福',
        tips: '请填写',
        img: '../../public/images/card/blessing.png',
        icon: '../../public/images/card/revision.png'
      },
    ],
    blessing:false
  },
  skip: function(e) {
    console.log(e.currentTarget.dataset.url)
    let url = e.currentTarget.dataset.url;
    if (url == 'blessing/blessing'){
      this.setData({
        blessing:true
      })
      return false;
    }
    wx.navigateTo({
      url: url
    })
  },
  back:function(){
    this.setData({
      blessing:false
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