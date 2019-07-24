var api = require('./utils/api');

App({
  onLaunch: function () {

    // 判断设备是否为 iPhone X
    this.checkIsIPhoneX();

    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })

  },

  // 获取用户信息
  getUserInfo: function (cb) {

    //如果数组是空的
    if (this.globalData.userInfo.length == 0) {

      var that = this
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          api.getJSON('api/login/index?code=' + res.code, function (res) {
            if (res.data.status == 1) {

              that.globalData.userInfo = res.data.data
              that.globalData.token = res.data.data.token

              //回调
              cb && cb(that.globalData.userInfo)
              console.log('登录成功')
              console.log(that.globalData.userInfo)
            }
          })
        }
      })

    } else {

      console.log('已登录')
      cb && cb(this.globalData.userInfo)

    }
  },

  //判断设备是否为 iPhone X
  checkIsIPhoneX: function () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') != -1) {
          self.globalData.isIPX = true;

        }
        // 或者根据 screenHeight 进行判断
        // if (res.screenHeight == 812) {
        //   self.globalData.isIPX = true
        // }
      }


    })
  },

  globalData: {
    userInfo: [],
    token: '',
    height: 0,
    makecard: '',
    give:{},
    sku_id:0,
    productNum: 0,
    dingdang_id:0,
    jizhu:0

  }


})