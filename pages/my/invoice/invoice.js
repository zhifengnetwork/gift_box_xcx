// pages/my/invoice/invoice.js
var app = getApp()
var api = require('../../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: 'person',
        value: '个人',
        checked:true
      },
      {
        name: 'unit',
        value: '单位',
        checked: false
      },
    ],
    unit_show: true,
    footer_show: true,
    yedingdang_id:"",
    gerren:"",
    dangwei:"",
    namevalue:"",
    bianvalue:"",
    dierge:"礼品卡",
    iphone:"",
    email:"",
    invoice_title:"",
    unit_num:'',
    unit_name:'',
    pingguoipnum:'',
    youxiangna:''
  },

  show: function () {
    this.setData({
      footer_show : !this.data.footer_show
    })
  },

  footer_hidden:function () {
    this.setData({
      footer_show: !this.data.footer_show
    })
  },
  radioChange: function(e) {
    var that=this;
    that.setData({ dangwei: "" })
    that.setData({ gerren: "" })
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == "unit") {
      that.setData({dangwei:"单位"})
      this.setData({
        unit_show : false
      })
      console.log(this.data.unit_show)
    } else if (e.detail.value == "person"){
      that.setData({ gerren: "个人" })
      this.setData({
        unit_show: true
      });

      
    }
  },
  // 获取单位的名称
  getInput_name: function (e) {
    this.setData({ namevalue: e.detail.value })
  },
  // 获取纳税人的别号
  getInput_num: function (e) {
    this.setData({ bianvalue: e.detail.value })
  },
  // 获取手机号
  getiphone: function (e) {
    this.setData({ iphone: e.detail.value })
  },
  // 获取邮箱
  getemail:function(e){
    this.setData({ email: e.detail.value })
  },
  // 第二个单选框
  radioChangela: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({dierge: e.detail.value})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    // console.log("dingdang_id")
    // console.log(options.dingdang_id)
    this.setData({yedingdang_id: app.globalData.dingdang_id});
    // 渲染点击发票的数据--记忆
    console.log("记住的值")
    console.log(app.globalData.jizhu)
    if (app.globalData.jizhu===1){

      api.getJSON('/api/order/order_detail?order_id=' + app.globalData.dingdang_id + '&token=' + app.globalData.token, function (res) {
        if (res.data.status == 1) {
            console.log("电子发票渲染原来的数据");
          console.log(res.data.data)
            // 发票title
          that.setData({ invoice_title: res.data.data.invoice_title})
          if (that.data.invoice_title===""){
            that.setData({ gerren: "个人" });
            that.setData({
              unit_show: true
            });    
          }
          else{
            that.setData({ gerren: "单位" });
            that.setData({
              unit_show: false
            }); 
            var xiang=that.data.items;
            xiang[1].checked=true;
            xiang[0].checked = false
            console.log("xiang数组",xiang)
            that.setData({items:xiang})
            that.setData({ unit_name: res.data.data.invoice_title}) 
            that.setData({ unit_num: res.data.data.taxpayer })
            that.setData({ youxiangna: res.data.data.invoice_email }) 
            that.setData({ pingguoipnum: res.data.data.mobile})




          }
        }
      })


    }









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
    var that=this
      
    // api.getJSON('/api/order/order_detail?order_id=' + app.globalData.dingdang_id+'&token='+app.globalData.token, function (res) {
    //   if (res.data.status == 1) {
    //        console.log("获取发票消息")
    //        console.log(res.data.data)
    //   }
    // })


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
  tijiaofa:function(){
    
    console.log(this.data.dierge)
    console.log(this.data.iphone)
    console.log(this.data.email)
    console.log(this.data.namevalue)
    console.log(this.data.bianvalue);
    

    //  api.getJSON('/api/order/edit_invoice?token=' + app.globalData.token+'&', function (res) {
    //   if (res.data.status == 1) {


    //   }
    // })

    // console.log(this.data.unit_show)
    var that=this  
    if (that.data.unit_show===false){

      if (that.data.namevalue == "" || that.data.bianvalue == ""){
        wx.showToast({
          title: '请填写纳税人识别号和单位名称',
          icon: 'none',
          duration: 2000
        })
      }else{
        console.log("ssssss")
        api.postJSON('/api/order/edit_invoice?order_id=' + app.globalData.dingdang_id + '&token=' + app.globalData.token + '&invoice_title=' + that.data.namevalue + '&taxpayer=' + that.data.bianvalue + '&invoice_mobile=' + that.data.iphone + '&invoice_email=' + that.data.email + '&invoice_desc=' + that.data.dierge,
          function (res) {
            if (res.data.status == 1) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateTo({
                url: '../../commodity/detalis/payment/award/award'
              })
              app.globalData.jizhu = 1
            }
          })
      }

      }






    else{
      api.postJSON('/api/order/edit_invoice?order_id=' + app.globalData.dingdang_id + '&token=' + app.globalData.token + '&invoice_mobile=' + that.data.iphone + '&invoice_email=' + that.data.email + '&invoice_desc=' + that.data.dierge,
        function (res) {
          if (res.data.status == 1) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../../commodity/detalis/payment/award/award'
            })
            app.globalData.jizhu = 1
          }

        })
    }
    }
  
})