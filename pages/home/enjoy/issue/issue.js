// pages/home/enjoy/ issue/ issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight,		// 获取手机状态栏高度
    images: [],
    status:true,
    address:"",
    xianshi:false,
    xianshi2:false,
    topic:'',
  },

  // 点击跳转到话题页面
  topic:function(){
    wx.navigateTo({
      url: '../topic/topic',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options.topic)
    if(options.topic){
      that.setData({
        topic: options.topic
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
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        const images1 = images.length <= 9 ? images : images.slice(0, 9)
        this.setData({
          images: images1
        })
      }
    })
  },
  removeImage(e) {
    var that = this;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx,1)
    this.setData({
      images: images
    })
  },
 
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  dingwei:function(){
    var that=this
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          address: res.name,
          status:false
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    console.log("666")
  },
  chumask1:function(){
    this.setData({ xianshi:true})
  },
  quxiao: function () {
    this.setData({ xianshi: false })
  },
  sure:function(){
    this.setData({ xianshi: false })
  },


  goBack: function () {
    this.setData({ xianshi2: true })
  },
  quxiao2: function () {
    this.setData({ xianshi2: false })
  },
  sure2: function () {
    this.setData({ xianshi2: false })
  }
})