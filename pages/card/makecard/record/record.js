// pages/card/makecard/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: false,
    src: '',
    minute: '00',
    second: '00',
    // 进度条进度
    lRotate: '',
    rRotate: '',
  },
  // 开始录音
  start: function() {
    // 点击改变状态
    let that = this;
    that.data.start = !this.data.start;
    that.setData({
      start: that.data.start
    })
    let ton = 0;
    let l = -135;
    let r = -135;
    let tim = setInterval(function() {
      ton += 0.1;
      r = -135 + Math.floor(ton * 10) / 10 * 6;
      if (Math.floor(ton) >= 30 && Math.floor(ton) < 60) {
        r = 45;
        l = -135 + (Math.floor(ton * 10) / 10 - 30) * 6;
      } else if (Math.floor(ton) >= 60) {
        r = 45;
        l = 45;
        clearInterval(tim);
      }
      that.setData({
        lRotate: l,
        rRotate: r
      })
    }, 100)
    if (this.data.start) {
      that.time(true);
      this.recorderManager.start({
        format: 'mp3' // 如果录制acc类型音频则改成aac
      });
    } else {
      that.time(false);
      clearInterval(tim);
      this.recorderManager.stop();
    }
  },
  // 播放录音
  pause: function() {
    // 如果为播放状态则返回
    if (this.data.start) {
      return false;
    }
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      // 播放音频失败的回调
    })
    this.innerAudioContext.src = this.data.src; // 这里可以是录音的临时路径
    this.innerAudioContext.play();
    this.innerAudioContext.onPlay(function() {
      console.log('开始播放')
    })
    this.innerAudioContext.onEnded(function() {
      console.log('结束播放')
    })
  },
  // 删除录音
  delete: function() {
    // 如果为播放状态则返回
    if(this.data.start){
      return false;
    }
    let that = this;
    that.data.minute = '00';
    that.data.second = '00';
    that.data.src = '';
    that.setData({
      minute: that.data.minute,
      second: that.data.second,
      src: that.data.src,
      lRotate: '',
      rRotate: ''
    });
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  },
  time(flag) {
    let that = this;
    let num = 0;
    let sum = 0;
    var times = setInterval(function() {
      num++;
      sum = '00';
      if (num < 10) {
        num = '0' + num;
      } else if (num == 60) {
        that.recorderManager.stop();
        num = '00';
        sum = '0' + 1;
        that.setData({
          start: false
        })
        clearInterval(times);
      }
      that.setData({
        minute: num,
        second: sum
      })
    }, 1000)
    if (!flag) {
      for (let i = 0; i <= times; i++) {
        clearInterval(i);
      }
    }
  },
  // 提交
  send: function() {
    var that = this
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function() {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        record: that.data.src
      })
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  drawCircle: function() {

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
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function() {
      // 录音失败的回调处理
    });
    this.recorderManager.onStop(function(res) {
      // 停止录音之后，把录取到的音频放在res.tempFilePath
      that.setData({
        src: res.tempFilePath
      })
      console.log(res.tempFilePath)
    });
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
    this.time(false);
    this.recorderManager.stop();
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