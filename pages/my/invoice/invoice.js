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
      checked: true
    },
    {
      name: 'unit',
      value: '单位',
      checked: false
    },
    ],
    unit_show: true,
    footer_show: true,
    award: '',
    gerren: "",
    address_id: '',
    source: '',
    invoice_desc: "礼品卡",
    invoice_email: "",
    invoice_mobile: "",
    invoice_title: "",
    taxpayer: "",
    is_lipinka: '',
    is_gouwuka: ''
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    var that = this

    this.setData({
      award: options.award == undefined ? "" : options.award,
      address_id: options.address_id == undefined ? "" : options.address_id,
      source: options.source == undefined ? "" : options.source,//一个是?source=cashgift
    });

    this.get_invoice();
    
    console.log("来源"+this.data.source)

  },

  show: function () {
    this.setData({
      footer_show: !this.data.footer_show
    })
  },

  footer_hidden: function () {
    this.setData({
      footer_show: !this.data.footer_show
    })
  },
  radioChange: function (e) {
    var that = this;
    that.setData({
      dangwei: ""
    })
    that.setData({
      gerren: ""
    })
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == "unit") {
      that.setData({
        dangwei: "单位"
      })
      this.setData({
        unit_show: false
      })

    } else if (e.detail.value == "person") {
      that.setData({
        gerren: "个人"
      })
      this.setData({
        unit_show: true
      });
    }
  },
  // 获取单位的名称
  getInput_name: function (e) {
    this.setData({
      invoice_title: e.detail.value
    })
  },
  // 获取纳税人的别号
  getInput_num: function (e) {
    this.setData({
      taxpayer: e.detail.value
    })
  },
  // 获取手机号
  getiphone: function (e) {

    this.setData({
      invoice_mobile: e.detail.value
    });
   
  },
  // 获取邮箱
  getemail: function (e) {

    this.setData({
      invoice_email: e.detail.value
    })
  },
  // 第二个单选框
  radioChangela: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      invoice_desc: e.detail.value
    });
    console.log(e.detail.value)

    if (e.detail.value === '购物卡') {
      this.setData({
        is_lipinka: false,
        is_gouwuka: true
      });

    }
    if (e.detail.value === '礼品卡') {
      this.setData({
        is_lipinka: true,
        is_gouwuka: false
      })

    }

  },

  /**
   * 获取发票内容
   */
  get_invoice: function () {
    var that = this
    api.getJSON('/api/order/get_invoice?token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {

        // 发票title
        that.setData({

          invoice_desc: res.data.data.invoice_desc,
          invoice_email: res.data.data.invoice_email,
          invoice_mobile: res.data.data.invoice_mobile,
          invoice_title: res.data.data.invoice_title,
          taxpayer: res.data.data.taxpayer,

        })

        if (res.data.data.invoice_title === "") {

          that.setData({
            gerren: "个人"
          });
          that.setData({
            unit_show:true
          });
          var xiang = that.data.items;
          xiang[1].checked = false;
          xiang[0].checked = true

          that.setData({
            items: xiang
          })


        } else {
          that.setData({
            gerren: "单位"
          });
          that.setData({
            unit_show: false
          });
          var xiang = that.data.items;
          xiang[1].checked = true;
          xiang[0].checked = false

          that.setData({
            items: xiang
          })
         

        }
        if (res.data.data.invoice_desc === "购物卡") {
          that.setData({
            is_lipinka: false
          })
          that.setData({
            is_gouwuka: true
          })
        }
        if (res.data.data.invoice_desc === "礼品卡") {
          that.setData({
            is_lipinka: true
          })
          that.setData({
            is_gouwuka: false
          })
        }
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
    var that = this

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
  /**
   * 保存
   */
  save_invoice: function () {
    var that = this
    // 正则验证手机号格式
    if (!(/^1[34578]\d{9}$/.test(that.data.invoice_mobile))) {
      wx.showModal({
        title: '提示',
        content: '請輸入正確的手機號碼',
        showCancel: false
        
      })
      return false;
    } 
    
    if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(that.data.invoice_email))){
      wx.showModal({
        title: '提示',
        content: '請輸入正確的Email',
        showCancel: false
      })
      return false;
    }
     
    



    if ((that.data.unit_show == false && that.data.invoice_title == '') || (that.data.unit_show == false && that.data.taxpayer == '')) {
      wx.showToast({
        title: '请填写纳税人识别号和单位名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.unit_show == true){

      api.postJSON('/api/order/edit_invoice?token=' + app.globalData.token +'&invoice_mobile=' + this.data.invoice_mobile + '&invoice_email=' + this.data.invoice_email + '&invoice_desc=' + this.data.invoice_desc,
        function (res) {
          if (res.data.status == 1) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })

            console.log('来源555555555555 ' + that.data.source)

            if (that.data.source == 'cashgift'){
              wx.navigateTo({
                url: '../../commodity/detalis/give/cashgift/cashgift?invoice_id=' + res.data.data
              })

            }else{
              wx.navigateTo({
                url: '../../commodity/detalis/payment/award/award?address_id=' + that.data.address_id + '&invoice_id=' + res.data.data
              })

            }


            


          } else {
            wx.showModal({
              title: res.data.msg,
              content: '',
            })
          }
        })

    }else{
       
      api.postJSON('/api/order/edit_invoice?token=' + app.globalData.token + '&invoice_title=' + this.data.invoice_title + '&taxpayer=' + this.data.taxpayer + '&invoice_mobile=' + this.data.invoice_mobile + '&invoice_email=' + this.data.invoice_email + '&invoice_desc=' + this.data.invoice_desc,
        function (res) {
          if (res.data.status == 1) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })


            if (that.data.source == 'cashgift') {
              wx.navigateTo({
                url: '../../commodity/detalis/give/cashgift/cashgift?invoice_id=' + res.data.data
              })

            } else {
              wx.navigateTo({
                url: '../../commodity/detalis/payment/award/award?address_id=' + that.data.address_id + '&invoice_id=' + res.data.data
              })

            }



          } else {
            wx.showModal({
              title: res.data.msg,
              content: '',
            })
          }
        })


    }
    
  }

})