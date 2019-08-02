var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/selectimg/selectimg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popup: false,
    face:'',
    xuanzhong: '',
    x: 0,
    y: 0,
    xx: 0,
    xindex:0,
    xxindex:'',
    xxx:[],
    yy: 0,
    name:'',
  },

  // 点击跳转到标签页
  label:function(){
    wx.navigateTo({
      url: '../label/label',
    })
  },


  // 点击贴纸出现遮罩表情包
  biaoqing:function () {
    let that = this
    that.setData({
      popup: true
    })
    // console.log(that.data.xxx.concat([that.data.xindex,that.data.xx,that.data.yy]))
  },

  
  tuozhuai:function(e) {
  let that = this
  //  event.detail = { x, y, source }
    // console.log(e)
  //   // yy: that.data.yy.concat(that.data.yyy)
  //  console.log(that.data.x)
   that.setData({
     xx: e.detail.x,
    //  xindex: e.target.dataset.index,
     yy: e.detail.y
   })

  },

  // ab:function (e){
  //   let that = this
  //   console.log(e)
  //   console.log(e.changedTouches[0].clientY)
  //   that.setData({
  //     xx: e.changedTouches[0].clientX,
  //     //  xindex: e.target.dataset.index,
  //     yy: e.changedTouches[0].clientY
  //   })
  // },
  

  // 点击遮罩上方关闭遮罩
  guanbi:function (){
    let that = this
    that.setData({
      popup: false
    })
  },


  // 点击表情
  popup:function (e){
    let that = this
    // console.log(e)
    // console.log(e.currentTarget.dataset.index)
    // console.log(that.data.xindex)
    // 选取了表情之后关闭表情包
    that.setData({
      popup: false,
      xuanzhong: that.data.face[e.currentTarget.dataset.index],
      // xx: that.data.xx.concat([e.currentTarget.dataset.index]),
      // yy: that.data.yy.concat(that.data.yyy)
      xxindex: e.currentTarget.dataset.index,
      xindex: that.data.xindex+1,

    }) 

    // console.log(that.data.yy)
    // console.log(that.data.xuanzhong)
    if(that.data.xuanzhong){
      var aa = [{ id: that.data.xindex, x: that.data.xx, y: that.data.yy, img: that.data.xuanzhong }]
      that.setData({
        xxx: that.data.xxx.concat(aa)
      })
    }
    console.log(that.data.xxx)
    // that.data.xxx.push({ id: that.data.xindex, x: that.data.xx, y: that.data.yy, img: that.data.xuanzhong })
    // console.log(that.data.xxx)
    // if(that.data.xxx.length>1){
    //   console.log(aa[aa.length-1].x)
    //   console.log(aa[0].x)
    //   var qianx = aa[0].x
    //   var qiany = aa[0].y
    //   var houx = aa[aa.length - 1].x
    //   var houy = aa[aa.length - 1].y
      
    //   aa[0].x = houx
    //   aa[aa.length - 1].x = qianx
    //   aa[0].y = houy
    //   aa[aa.length - 1].y = qiany

    //   that.setData({
    //     xxx: aa
    //   })
    //   console.log(that.data.xxx)
    // }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options.name)
    if(options.name){
      that.setData({
        name: options.name
      })
    }

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
    // 进入页面请求表情包
    let that = this
    api.getJSON('/api/sharing/emojis', function (res) {
      if (res.data.status == 1) {
        console.log(res.data)
        that.setData({
          face: res.data.data
        })
      }
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

  }
})