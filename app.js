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

    if (this.globalData.userInfo) {
      cb && cb(this.globalData.userInfo)
    }

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

          }
        })
      }
    })

  },

  //判断设备是否为 iPhone X
  checkIsIPhoneX: function () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') != -1) {
          self.globalData.isIPX = true;
          console.log("5555555555555")
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
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2MzE1NTUyMSwiZXhwIjoxNTYzMTkxNTIxLCJ1c2VyX2lkIjo4OX0.9bCLCxQnn_YPy58A2YVHSwOZ8sKq1f6w5jLEuez69Rs',

    height: 0
  }


})