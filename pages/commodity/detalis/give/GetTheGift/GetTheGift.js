// pages/commodity/detalis/give/GetTheGift/GetTheGift.js
var api = require('../../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    goods: '',
    address: '',
    active: true,
    address_id:'',
    order_id:'',
    pwdstr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    app.getUserInfo(userinfo => {
      //昵称、头像 不存在，跳转去授权
      if (userinfo.nickname == '' && userinfo.avatar == '') {
        wx.redirectTo({
          url: '../authorize/authorize', //授权页面
        })
      }
      that.loadData(options);
    })
  },

  /**
   * 加载数据
   */
  loadData: function(options) {
    var that = this

    let address_id = options.address_id == undefined ? '' : options.address_id;
    let order_id = options.order_id == undefined ? '' : options.order_id;
    let pwdstr = options.pwdstr == undefined ? '' : options.pwdstr;
    let type = options.type == undefined ? '' : options.type;
    let joinid = options.joinid == undefined ? '' : options.joinid;
    //3个参数
    //如果是调试
    //https://giftbox.zhifengwangluo.com/card?card_id=506&type=1&order_id=2895&pwdstr=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2NDMwNzY3NSwiZXhwIjoxNTY0MzQzNjc1LCJ1c2VyX2lkIjoyODk1fQ.A-57frG7cyDBD5FBiVbI3PPmMBY28qLyMw2eLz_7GOQ

    // let address_id = '506';
    // let order_id = '2895';
    // let pwdstr = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2NDMwNzY3NSwiZXhwIjoxNTY0MzQzNjc1LCJ1c2VyX2lkIjoyODk1fQ.A-57frG7cyDBD5FBiVbI3PPmMBY28qLyMw2eLz_7GOQ';


    if (order_id == "" || order_id == undefined) {
      wx.showModal({
        title: 'order_id不能为空',
        content: '',
      })
    }

    if (pwdstr == "" || pwdstr == undefined) {
      wx.showModal({
        title: 'pwdstr不能为空',
        content: '',
      })
    }

   
    //存起来
    this.setData({
      address_id: address_id,
      order_id: order_id,
      pwdstr: pwdstr,
      type: type,
      joinid: joinid,
    })

    api.postJSON('api/order/get_order_info', {
        'order_id': order_id,
        'address_id': address_id,
        'token': app.globalData.token,
      },
      function(res) {
        console.log(res.data);
        if (res.data.status == 1) {
          api.postJSON('api/user/get_address_info', {
            'address_id': res.data.data.address.address_id,
            'token': app.globalData.token,
          },function(res){
            console.log(res)
          })
          that.setData({
            goods: res.data.data.order,
            address: res.data.data.address,
            address_id:res.data.data.address.address_id
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: 'error:' + res.data.msg,
            duration: 2500
          })
          that.setData({
            active: false
          })
        }
        console.log(res.data)
      })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  show: function() {
    if(this.data.type!=1){
      let that = this;
      api.postJSON('api/gift/receive_join', {
        'token': app.globalData.token,
        'order_id': that.data.order_id,
        'join_type': 1,
        'pwdstr': that.data.pwdstr
      },
      function (res) {
        if (res.data.status == 1) {
          console.log(res.data.data)
          that.setData({
            flag: false,
            joinid: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        console.log(res);
      })
    }else{
      if (!this.data.active) {
        wx.showToast({
          icon: 'none',
          title: '该订单已经领取过啦!',
          duration: 2500
        })
        return false;
      }
      this.setData({
        flag: false
      })
    }
  },

  hide: function() {
    this.setData({
      flag: true
    })
  },
  /**
   * 重新选择
   */
  again: function() {
    console.log(this.data.joinid)
    wx.navigateTo({
      url: '../../../../site/site?again=' + true + '&order_id=' + this.data.order_id + '&pwdstr=' + this.data.pwdstr + '&joinid=' + this.data.joinid,
    })
  },
  /**
   * 确认无误
   */
  querenwuwu: function() {
    console.log('======')
    var address_id = this.data.address_id;
    console.log(address_id)
    var joinid = this.data.joinid

    if (address_id && address_id != undefined) {
      console.log('地址id:'+address_id,'参与id:'+joinid)
      api.postJSON('api/gift/set_address', {
        'token': app.globalData.token,
        'addressid': address_id,
        'joinid': joinid
      },function (res) {

          if(res.data.status == 1 ){
            wx.navigateTo({
              url: '../GetTheSuccess/success',
            })
          }else{
            wx.showModal({
              title: res.data.msg,
              content: res.data.msg,
            })
          }

        })

    }

  }
})