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
    pwdstr:'',
    give:true,
    givetext:''
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
          url: '/pages/authorize/authorize', //授权页面
        })
      }
      that.loadData(options);
    })
    if (options.ispopup){
      this.setData({
        flag: false
      })
    }
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
    // https://www.9pointstars.com/card?card_id=506&type=1&order_id=2895&pwdstr=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2NDMwNzY3NSwiZXhwIjoxNTY0MzQzNjc1LCJ1c2VyX2lkIjoyODk1fQ.A-57frG7cyDBD5FBiVbI3PPmMBY28qLyMw2eLz_7GOQ

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

    if (address_id == "" || address_id == undefined) {
      api.postJSON('api/user/get_default_address', {
        'token': app.globalData.token,
      },function(res){
        that.setData({
          address: res.data.data,
          address_id: res.data.data.address_id
        })
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
        // console.log(res.data)
      })
      if (this.data.type != 1) {
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
                joinid: res.data.data
              })
            } else {
              that.setData({
                give: false,
                givetext: res.data.msg
              })
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
            console.log(res);
          })
      } else {
        if (!this.data.active) {
          that.setData({
            give:false
          })
          wx.showToast({
            icon: 'none',
            title: '该订单已经领取过啦!',
            duration: 2500
          })
          return false;
        }
      }
      // if(){
      //   this.setData({

      //   })
      // }
  },
  pageTo:function(){
    wx.navigateTo({
      url: '/pages/commodity/detalis/detalis?id=' + this.data.goods.goods_id,
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
  give:function(){
    let that = this;
    api.postJSON('api/gift/share_callback', {
      'token': app.globalData.token,
      'order_id': that.data.order_id,
      'act': 2
    },
      function (res) {
        if (res.data.status == 1) {
          console.log(res.data.data)
          that.setData({
            flag: true
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        console.log(res);
      })
  },
  show: function() {

    if(!this.data.give){
      wx.showToast({
        title: this.data.givetext,
        icon: 'none'
      })
      return false;
    }
    console.log(2222)
    this.setData({
      flag: false
    })
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
      url: '../../../../site/site?redirect_url=/pages/commodity/detalis/give/GetTheGift/GetTheGift&again=' + true + '&order_id=' + this.data.order_id + '&pwdstr=' + this.data.pwdstr + '&joinid=' + this.data.joinid,
    })
  },
  /**
   * 确认无误
   */
  querenwuwu: function() {
    console.log('======')
    var address_id = this.data.address_id;
    console.log(address_id)
    if (!address_id){
      wx.showToast({
        icon: 'none',
        title: '请填写地址!',
        duration: 2500
      })
    }
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
              url: '../GetTheSuccess/success?joinid=' + joinid,
            })
          }else{
            wx.showModal({
              title: res.data.msg,
              content: res.data.msg,
            })
          }

        })

    }

  },
  onShareAppMessage: function () {
    console.log('share')
    var nickname = app.globalData.userInfo.nickname;
    nickname = nickname == undefined ? '' : nickname;
    console.log(nickname)
    return {
      title: nickname + '为你准备了一份惊喜,请火速查收!',
      imageUrl: 'https://www.9pointstars.com/image/back.png',
    }
  }
})