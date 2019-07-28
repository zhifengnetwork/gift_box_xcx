// pages/card/go.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://giftbox.zhifengwangluo.com/card'
  },

  /**
   * 生命周期函数--监听页面加载
   *   url = '/pages/card/go?id=' + this.data.id + '&type=' + this.data.type + '&order_id=' + this.data.order_id + '&pwdstr=' + this.data.pwdstr
   */
  onLoad: function (options) {
    var id = options.id;
    var type = options.type;
    var order_id = options.order_id;
    var pwdstr = options.pwdstr;
    var url = this.data.url + '?card_id=' + id + '&type=' + type + '&order_id=' + order_id + '&pwdstr=' + pwdstr
    
    if(id){
      this.setData({
        url: url
      })
      console.log(url)
    }else{
      wx.showModal({
        title: '盒子错误',
        content: '没有id',
      })
    }

    

    console.log(this.data.url)
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