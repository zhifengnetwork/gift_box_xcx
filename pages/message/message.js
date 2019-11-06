// pages/message/message.js
var api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList: []
  },



  // 跳转到通知消息
  inform: function () {
    wx.navigateTo({
      url: 'inform/inform',
    })
  },
  pageTo({currentTarget:{dataset}}){
    var obj = {
      my_id: getApp().globalData.userInfo.id,
      you_id: dataset.id,
      isread: dataset.isread
    }
    wx.navigateTo({
      url: '/pages/message/chat/chat?obj=' + JSON.stringify(obj),
    })
  },
  getWhatList(){
    var that = this
    api.getJSON('api/chat/get_list?from_id=' + getApp().globalData.userInfo.id, function (res) {
      console.log(res.data) 
      if (res.data.status == 200) {
        var list = []
        res.data.data.list.forEach((item,index)=>{
          // index = 0
          item.add_time = that.getDateDiff(item.add_time)
          // if (res.data.data.headInfo[index].avatar.indexOf("https") >= 0){
          //   item.avatar = res.data.data.headInfo[index].avatar
          // }else{
          //   item.avatar = res.data.data.domain + res.data.data.headInfo[index].avatar
          // }
          // item.id = res.data.data.headInfo[index].id
          // item.nickname = res.data.data.headInfo[index].nickname
          list.push(item)
        })
        that.setData({
          chatList: list,
        })
      }
    })
  },
  // 跳转到评论
  comment: function () {
    wx.navigateTo({
      url: 'comment/comment',
    })
  },

  onClose(event) {
    const { position, instance } = event.detail;
    console.log(event)
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        api.getJSON('api/chat/delChat?from_id=' + getApp().globalData.userInfo.id + '&receive_id=' + event.currentTarget.dataset.id, function (res) {
          console.log(res.data)
          if (res.data.status == 200) {
            var list = []
            // res.data.data.list.forEach((item, index) => {
            //   // index = 0
            //   item.add_time = that.getDateDiff(item.add_time)

            //   list.push(item)
            // })
            // that.setData({
            //   chatList: list,
            // })
          }
        })
        instance.close();
        break;
    }
  },
  getDateDiff(dateTimeStamp) {
    var now = new Date().getTime() / 1000;
    var StampTime = new Date(dateTimeStamp * 1000)
    if (new Date().getDate() == StampTime.getDate()){  //今天的时间
      return StampTime.getHours() + ':' + StampTime.getHours()
    } else if (new Date().getDate() - 1 == StampTime.getDate()){  //昨天
      return '昨天'
    }else{
      return StampTime.getFullYear() + '/' + (StampTime.getMonth() + 1) + '/' +StampTime.getDate()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getWhatList()
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