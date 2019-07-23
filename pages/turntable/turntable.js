// pages/turntable/turntable.js
var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rouletteData: {
      speed: 10,/**转盘速度 */
      award: [
        {
          level: '礼品',
          prize: '奖品1'
        },
        {
          level: '霸气侧漏',
          prize: '跺跺脚'
        },
        {
          level: '才华横溢',
          prize: ' 贯江东'
        },
        {
          level: '纵横驰骋',
          prize: '乘烈风'
        },
        {
          level: '镶金土豪',
          prize: '不差钱'
        },
        {
          level: ' 江枫渔火',
          prize: '对眠愁'
        },
      ],/**奖项内容 */
      fontColor: '#e21b58',/**文字颜色 */
      font: '14px Arial',
      bgOut: '#ffe774',/**外层 */
      bgMiddle: '#ffc046',/**中间层 */
      bgInner: ['#fff2ca', '#fdd890', '#fff2ca', '#fdd890', '#fff2ca', '#fdd890'],
      speedDot: 1000,/**点切换速度 */
      dotColor: ['#ffffff', '#b1ffdd'],
      dotColor_1: ['#ffffff', '#b1ffdd'],
      dotColor_2: ['#b1ffdd', '#ffffff'],
      angel: 0 /**选择角度 */
    },
    lotteryNum: 3,
    flag: true,
  },
  getAngel(e) {
    if (!this.data.flag) {
      return false;
    }
    this.setData({
      flag: false
    })
    var that = this;
    let lotteryNum = that.data.lotteryNum;
    if (lotteryNum > 0) {
      this.setData({
        angel: Math.floor(Math.random(1) * 360) /**传入的角度 */
      })
    } else {
      wx.showToast({
        title: '暂无抽奖机会啦~',
        icon: 'none'
      })
    }
  },
  getPrize(e) {
    var that = this;
    let angel = that.data.angel;
    let options = that.data.rouletteData;
    let index = parseInt(that.data.angel / 60);
    let lotteryNum = that.data.lotteryNum;
    lotteryNum--;
    wx.showModal({
      title: '恭喜你',
      content: options.award[index].level,
      success: function (res) {
        that.setData({
          flag: true,
          index: index,
          lotteryNum: lotteryNum
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.postJSON('api/index/getJoke',function(res){
      console.log(res)
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