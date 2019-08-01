// pages/my/after/refund/refund.js
var app = getApp()
var api = require('../../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: ['','7天无理由', '退运费', '少件/漏发', '质量问题', '商品信息描述不符', '包装/商品破损/污渍'],
    reason:'',
    goods_name:'',
    goods_num:'',
    goods_price:'',
    spec_key_name:'',
    img:'',
    refund_apply_id:''
  },

  logistics: function (){
    let that = this
    wx.navigateTo({
      url: '../logistics/logistics?goods_name=' + that.data.goods_name + '&goods_num=' + that.data.goods_num + '&goods_price=' + that.data.goods_price + '&spec_key_name=' + that.data.spec_key_name + '&img=' + that.data.img + '&id=' + that.data.id,
    })
  },


// 撤销申请
  chexiao: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您將撤銷本次申請，如果問題未解決，您還可以再次發起。確定繼續嗎？',
      success(res) {
        if (res.confirm) {
          api.postJSON('api/order/undo_refund',{
            'token': app.globalData.token,
            'raid': that.data.refund_apply_id
          },
          function(res){
            if(res.data.status==1){
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

// 客服介入
  kefu: function () {
    wx.showModal({
      title: '提示',
      content: '親，商家需要壹定的時間處理您的申請，若未協商壹致，您可以在商家拒絕後申請客服介入處理。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.refund_apply_id)
    var that = this
    that.setData({
      refund_apply_id: options.refund_apply_id
    })
    api.postJSON('api/order/get_refund_info', {
      'token': app.globalData.token,
      'refund_apply_id': options.refund_apply_id,
    }, function (res) {
      console.log(res)
      if(res.data.status == 1){
        that.setData({
          item: res.data.data,
          reason: that.data.itemList[res.data.data.reason],
          goods_name: res.data.data.goods_name,
          goods_num: res.data.data.goods_num,
          goods_price: res.data.data.goods_price,
          spec_key_name: res.data.data.spec_key_name,
          img: res.data.data.img,
          id: res.data.data.id
        })
      }
    })
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