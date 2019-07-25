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
          img:'https://giftbox.zhifengwangluo.com/public/images/turntable/turntable_small.png'
        }
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
      angel: 0,               /**选择角度 */
    },
    mask: false,            /**遮罩层 */
    win_id: false,          /**中奖者 */
    win_Name:[],
    win: false,             /**礼物 */
    wisecrack: false,       /**俏皮话 */
    wisecrack_t1: '',
    wisecrack_t2:'',
    lotteryNum: 3,
    flag: true,
  },
  // 获取中奖id
  win_id:function(){
    if (!this.data.flag) {
      return false;
    }
    let that = this;
    api.postJSON('api/gift/get_gift_order',{
      'order_id': that.data.order_id,
      'status': 1
    },
    function (res) {
      console.log(res)
      if(res.data.status==1){
        that.data.win_Name = [];
        for(let i=0;i<res.data.data.length;i++){
          that.data.win_Name.push(res.data.data[i]);
        }
        that.setData({
          win_Name: that.data.win_Name
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
    this.setData({
      mask:true,
      win_id:true
    })
  },
  back:function(){
    this.setData({
      mask: false,
      win_id: false,
      win: false,
      wisecrack: false,
    })
  },
  getWisecrack:function(){
    let that = this;
    // 获取俏皮话
    api.postJSON('api/index/getJoke', function (res) {
      if (res.data.status == 1) {
        let str = res.data.data.content.split('，');
        if (!str[1]){
          str[1] = '';
        }
        that.setData({
          wisecrack_t1: str[0],
          wisecrack_t2: str[1],
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  getAngel(e) {
    if (!this.data.flag) {
      return false;
    }
    var that = this;
    // 转动转盘
    api.postJSON('api/gift/turn_the_wheel',{
      'token': app.globalData.token,
      'order_id': that.data.order_id,
      'user_id': app.globalData.userInfo.id
    },
    function(res){
      console.log(res)
      if(res.data.status==1){
        that.setData({
          flag: false
        })
        that.getWisecrack();
        // let lotteryNum = that.data.lotteryNum;
        if (res.data.data.join_status == 0) {
          if (res.data.data.status == 1){
            that.setData({
              angel: Math.floor(Math.random(1) * 59) /**传入的角度 */
            })
          } else if (res.data.data.status == 2){
            that.setData({
              angel: Math.floor(Math.random(1) * 300 + 60) /**传入的角度 */
            })
          }
        } else {
          wx.showToast({
            title: '暂无抽奖机会啦~',
            icon: 'none'
          })
        }
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  getPrize(e) {
    var that = this;
    let angel = that.data.angel;
    let options = that.data.rouletteData;
    let index = parseInt(that.data.angel / 60);
    let lotteryNum = that.data.lotteryNum;
    lotteryNum--;
    console.log(that.data.angel)
    if (index==0){
      this.setData({
        mask: true,
        win: true,
        flag: true,
        index: index,
        lotteryNum: lotteryNum
      })
    }else{
      this.setData({
        mask:true,
        wisecrack:true,
        flag: true,
        index: index,
        lotteryNum: lotteryNum
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.getUserInfo(userinfo => {
      //昵称、头像 不存在，跳转去授权
      if (userinfo.nickname == '' && userinfo.avatar == '') {
        wx.redirectTo({
          url: '../authorize/authorize',//授权页面
        })
      }
    })
    // 获取转盘数据
    api.postJSON('api/index/get_lucky',function(res){
      console.log('order_id:'+options.order_id)
      if(res.data.status==1){
        for(let i = 0;i<res.data.data.length;i++){
          that.data.rouletteData.award.push({
            level: res.data.data[i].level,
            prize: res.data.data[i].prize
          })
        }
        that.setData({
          // order_id: options.order_id,
          order_id: 2519,
          award: that.data.rouletteData.award
        })
        that.selectComponent('#roulette').award(that.data.rouletteData);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
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