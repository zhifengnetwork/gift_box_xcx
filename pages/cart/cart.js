var api = require('../../utils/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    goodsList: [],
    empty: true,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    selectedAllStatus: true,
    total: '',
    
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ]
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
    var minusStatuses = [];
    var that = this
    
    api.getJSON('api/cart/cartlist?token='+app.globalData.token,function(res){
      
      console.log(res.data.data)

      var carts = res.data.data
      
      if (carts.length != 0)
        that.setData({ empty: false });
      else {
        that.setData({ empty: true });
      }

      var selectedAllStatus = true;
      for (var i = 0; i < carts.length; i++) {
        //var goods = carts[i].get('goods');
        //goodsList[i] = goods;
        //carts[i].selected = true;
        if (carts[i].selected == 1)
          carts[i].selected = true;
        else {
          carts[i].selected = false;
          selectedAllStatus = false;
        }
        minusStatuses[i] = 1;//carts[i].get('quantity') <= 1 ? 'disabled' : 'normal';
      }
      // console.log(carts);
      that.setData({
        carts: carts,
        selectedAllStatus: selectedAllStatus,
        //goodsList: goodsList,
        minusStatuses: minusStatuses
      });

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
    
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  
  see:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  }

})