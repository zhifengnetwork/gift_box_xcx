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
    xxx:[],
    yy: 0,
    name:'',
    huancun: '',
    bqx: 100,
    bqy: 100,
    bqid:'',
  },

  // 1.拖拽标签保存记录当前标签的位置，以数组的形式，记录每个拖拽的标签的最后一次信息位置
  // 2.点击标签页跳转页面添加标签，当前标签页记录各个标签页位置信息，回到此页面再重新渲染
  // 3.点击贴纸记录位置，在选择表情时重新渲染

  // 点击跳转到标签页
  label:function(){
    let that = this
    if (app.globalData.a){
      // wx.setStorageSync('name', that.data.name);
      // var aa = wx.getStorageSync('name')
      app.globalData.a = that.data.name
      console.log(app.globalData.a)
    }
    // that.setData({
    //   name: that.data.name
    // })
    wx.navigateTo({
      url: '../label/label',
    })
    // console.log(that.data.bqx)
    // console.log(that.data.bqy)
    // console.log(that.data.bqid)
    
    // for(var i = 0; i <that.data.name.length;i++){
    //   // var bq = [{ id: that.data.bqid, x: that.data.bqx, y: that.data.bqy }]
    //   if (that.data.bqid == i){
    //     that.data.name[i].bqx = that.data.bqx
    //   }
    //   console.log(that.data.name)
      
    // }
    
  },


  // 点击贴纸出现遮罩表情包
  biaoqing:function () {
    let that = this
    that.setData({
      popup: true
    })
    // console.log(that.data.xxx.concat([that.data.xindex,that.data.xx,that.data.yy]))
  },

  // 拖拽表情记录位置
  tuozhuai:function(e) {
  let that = this
  //  event.detail = { x, y, source }
    console.log(e)
  //   // yy: that.data.yy.concat(that.data.yyy)
  //  console.log(that.data.x)
   that.setData({
     xx: e.changedTouches[0].pageX,
    //  xindex: e.target.dataset.index,
     yy: e.changedTouches[0].pageY
   })
   
  console.log(that.data.xx)
  
  },

  // 拖拽标签记录位置
  biaoqian:function (e){
    let that= this
    console.log(e)
    that.data.bqx = e.changedTouches[0].pageX
    that.data.bqy = e.changedTouches[0].pageY
    that.data.bqid = e.currentTarget.dataset.index
    console.log(that.data.bqx)
    console.log(that.data.bqy)
    console.log(that.data.bqid)

    for (var i = 0; i < that.data.name.length; i++) {
      // var bq = [{ id: that.data.bqid, x: that.data.bqx, y: that.data.bqy }]
      if (that.data.bqid == i) {
        that.data.name[i].bqx = that.data.bqx
        that.data.name[i].bqy = that.data.bqy
      }

    }
    console.log(that.data.name)
  },




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
    that.setData({
      popup: false,
      xuanzhong: that.data.face[e.currentTarget.dataset.index],
      xxindex: e.currentTarget.dataset.index,
      xindex: that.data.xindex+1,
    }) 

      var aa = [{ id: that.data.xindex, x: that.data.xx, y: that.data.yy, img: that.data.xuanzhong }]
      that.setData({
        xxx: that.data.xxx.concat(aa)
      })
      app.globalData.biaoqing = that.data.xxx
      console.log(app.globalData.biaoqing)
      wx.setStorageSync('biaoqing', app.globalData.biaoqing);
    
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
    var a = wx.getStorageSync('name')
    console.log(a)
    if(a){
      that.setData({
        name: a
      })
    }
    var b = wx.getStorageSync('biaoqing')
    if (b) {
      that.setData({
        xxx: b
      })
    }
    console.log(that.data.name)
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
    let that = this


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