var app = getApp()
var api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site: [],
    award: false,
    again: false,
    bar_Height: wx.getSystemInfoSync().statusBarHeight,		// 获取手机状态栏高度
    invoice_id: '',
    order_id: '',
    pwdstr: '',
    addressid: null,
    hao: null,

  },
  // 跳转到添加地址
  newsite: function () {
    if (this.data.award && this.data.again) {
      wx.redirectTo({
        url: 'newsite/newsite?backurl=again=' + true + '&award=' + true + '&pwdstr=' + this.data.pwdstr + '&joinid=' + this.data.joinid,
      })
    } else if (this.data.award) {
      wx.redirectTo({
        url: 'newsite/newsite?award=' + true,
      })
    } else {
      wx.redirectTo({
        url: 'newsite/newsite',
      })
    }
  },
  award: function (e) {
    var that = this
    let address_id = e.currentTarget.dataset.address_id

    if (this.data.award && this.data.again) {
      wx.redirectTo({
        url: '../commodity/detalis/give/GetTheGift/GetTheGift?address_id=' + address_id + '&order_id=' + that.data.order_id + '&pwdstr=' + that.data.pwdstr + '&type=1&joinid=' + that.data.joinid,
      })
      getCurrentPages()[getCurrentPages().length - 2].show();
    } else if (this.data.award) {
      console.log('++++++++++')
      console.log(address_id)
      wx.redirectTo({
        url: '../commodity/detalis/payment/award/award?address_id=' + address_id + '&invoice_id=' + that.data.invoice_id,
      })
    }
  },
  // 默认按钮


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("site line 59 ", options)
    this.setData({
      hao: options.hao == undefined ? null : options.hao,
    })

    var redirect_url = options.redirect_url == undefined ? null : options.redirect_url;
    if ( redirect_url != undefined && redirect_url != null ){
      app.globalData.address_redirect_url = redirect_url
    }

    console.log("app.globalData.address_redirect_url::::::", app.globalData.address_redirect_url)

    if (options) {
      this.setData({
        invoice_id: options.invoice_id == undefined ? "" : options.invoice_id,
        order_id: options.order_id == undefined ? "" : options.order_id,
        pwdstr: options.pwdstr == undefined ? "" : options.pwdstr,
        joinid: options.joinid == undefined ? "" : options.joinid
      })
    }

    let that = this;
    api.postJSON('api/user/address_list',
      {
        token: app.globalData.token
      },
      function (res) {
        if (res.data.status == 1) {
          that.setData({
            site: res.data.data
          })

        }

      })
    if (options != undefined) {
      if (options.award) {
        this.setData({
          award: true
        })
      }
    } else {
      this.setData({
        award: false
      })
    }
    if (options.again) {
      this.setData({
        award: true,
        again: true
      })
    }

  },
  remove: function (e) {
    let that = this;
    api.postJSON('api/user/del_address',
      {
        token: app.globalData.token,
        address_id: e.currentTarget.dataset.address_id
      },
      function (res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            console.log("666")
            that.onLoad()
          }, 100)
        }
        console.log(res)
      })
  },
  goBack: function () {

    if (app.globalData.address_redirect_url != null) {
      wx.navigateTo({
        url: app.globalData.address_redirect_url,
      })
    } else {
      wx.navigateBack({
        delta: 1,
      })
    }

  },
  redact: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.redirectTo({
      url: 'newsite/newsite?item=' + JSON.stringify(item),
    });
  },
  
  // 设置默认地址打钩
  shezhi: function (e) {
    var that = this
    var addressid = e.currentTarget.dataset.addressid
    that.setData({ addressid: addressid })
    console.log(e.currentTarget.dataset.addressid)
    api.getJSON('/api/user/edit_address_default?address_id=' + that.data.addressid + '&token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
        console.log("设置默认地址成功")
        //  重新请求接口,渲染数据
        api.postJSON('api/user/address_list',
          {
            token: app.globalData.token
          },
          function (res) {
            if (res.data.status == 1) {
              that.setData({
                site: res.data.data
              })
              console.log(that.data.site)
            }

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