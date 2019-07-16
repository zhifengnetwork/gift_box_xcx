// pages/site/newsite/newsite.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    site_show: true
  },
  //默认按钮选中取消事件
  switchChange: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if(e.detail.value){
      console.log('选中',e.detail.value)
    }else{
      console.log("取消",e.detail.value)
    }
  },
  newsiteshow:function () {
    api.postJSON('api/user/add_address',{
      token: app.globalData.token,
    },
    function(res){
      console.log(res)
    })
    // console.log(this.data.site_show)
    // this.setData({
    //   site_show : !this.data.site_show
    // })
  },
  // 三级联动
  provinces:function(code,index){
    let that = this
    api.postJSON('api/user/get_address', {
      token: app.globalData.token
    },
    function (res) {
      that.setData({
        provinces: res.data.data,
        province: res.data.data[that.data.value[0]]
      })
      that.citys(res.data.data[code].code,index);
    })
  },
  citys: function (code,index){
    let that = this
    api.postJSON('api/user/get_address', {
      token: app.globalData.token,
      parent_id:code
    },
    function (res) {
      if(res.data.data.length==0){
        that.setData({
          areas: '',
          citys: ''
        })
        return false;
      }
      that.setData({
        citys: res.data.data,
        city: res.data.data[that.data.value[1]]
      })
      that.areas(res.data.data[index].code);
    })
  },
  areas: function (code) {
    let that = this
    api.postJSON('api/user/get_address', {
      token: app.globalData.token,
      parent_id: code
    },
      function (res) {
        that.setData({
          areas: res.data.data,
          area: res.data.data[that.data.value[2]]
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.provinces(0,0);
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },

  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    console.log(that.animation.export())
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },

  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },

  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    let areaInfo = that.data.province.area_name + ',' + that.data.city.area_name + ',' + that.data.area.area_name
    that.setData({
      areaInfo: areaInfo
    })
  },

  // 处理省市县联动逻辑
  cityChange: function (e) {
    console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      this.provinces(provinceNum,0);
      this.setData({
        value: [provinceNum, 0, 0]
      })
      console.log(this.data.value[0], provinceNum)
    } else if (this.data.value[1] != cityNum) {
      this.provinces(provinceNum,cityNum);
      this.setData({
        value: [provinceNum, cityNum, 0]
      })
    } else {
      this.provinces(provinceNum, cityNum);
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
    console.log(this.data)
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
  onHdie: function () {

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