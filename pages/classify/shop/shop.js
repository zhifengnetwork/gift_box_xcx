var api = require('../../../utils/api')
var app = getApp();
var page = 2; //分页代码
var goodslist = [] //分页代码
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhanshi: true,
    zhanshidd: false,
    sort: '排序',
    color: 'black',
    guanjian: '',
    goods_list: [],
    info: [],
    diyiye:[],
    fsya:"goods_id",
    checkboxArr: [{
        name: '新品優先',
        checked: false,
        sortting: 'new'

      },
      {
        name: '銷量優先',
        checked: false,
        sortting: 'sales_volume'
      },
      {
        name: '價格從高到低',
        checked: false,
        sortting: 'price_desc'
      },
      {
        name: '價格從低到高',
        checked: false,
        sortting: 'price'
      }
    ],
    bujia: true //分页需要用到的变量

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 另外一个页面传递过来的参数
    console.log(options.id)
    this.setData({
      guanjian: options.id
    });
   
  },
  // 获取数据的方法，具体怎么获取列表数据大家自行发挥
  //分页代码
  GetList: function (that) {
    api.getJSON({
      url: '/api/Brand/brand_info?id=' + this.data.guanjian + '&page=' + page + '&order=' + that.data.fsya,
      method: 'POST',
      success: function(res) {
        // 加载的数据有长度的时候
        if (res.data.data.goods_list.length > 0) {
          for (var i = 0; i < res.data.data.goods_list.length; i++) {
            goodslist.push(res.data.data.goods_list[i])
          }
         
          that.setData({
            goods_list: goodslist
          })
          page++;
        }
        // 加载的数据长度为0的时候
        else {
          that.setData({
            bujia: false
          }) 
          goodslist=that.data.diyiye
         
          
          
        }
      },
      fail: function(res) {},
      complete: function(res) {},
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
    var that = this;
    // 根据传过来的品牌的id来做一个商品的品牌列表
    //默认先加载第一页的数据,如果触碰到底部,再调用GetList()方法加载下一页
    api.getJSON(
      '/api/Brand/brand_info?id=' + this.data.guanjian + '&page=1',
      function (res) {
        if (res.data.status == 1) {
          console.log("55")
          console.log(res.data.data)
          var goodlist2 = res.data.data.goods_list
          var infopaizi = res.data.data.info
          that.setData({ diyiye: goodlist2 })
          console.log(that.data.diyiye)
          that.setData({
            goods_list: goodlist2
          })
          that.setData({
            info: infopaizi
          })


          //分页代码:定义了一个全局的goodslist目的是为了存分页加载的数据,数据增加就往里面push
          for (var i = 0; i < res.data.data.goods_list.length; i++) {
            goodslist.push(res.data.data.goods_list[i])
          }
          page=2
          that.setData({bujia: true})
          
        }
      }),
      //分页代码:页面一加载进来进行缓冲提醒
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 400
      })
    //分页代码:获取系统的参数，scrollHeight数值,微信必须要设置style:height才能监听滚动事件
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    });
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

  /*用户点击右上角分享*/
  onShareAppMessage: function() {},
  zhanchu: function() {
    this.setData({
      zhanshi: false
    })
  },
  shouhui: function() {
    this.setData({
      zhanshi: true
    })
  },
  // 选择商品排序方式
  xuanze: function(e) {
    goodslist=this.data.diyiye
    page=2
    this.setData({
      bujia: true
    })
    this.setData({
      zhanshidd: false
    })
    var index = e.currentTarget.dataset.index; //获取当前点击的下标
    var sortfangshi = e.currentTarget.dataset.sortfangshi; //获取当前点击的项的排列方式
    this.setData({ fsya:sortfangshi})
    var checkboxArr = this.data.checkboxArr; //选项集合
    if (checkboxArr[index].checked) return; //如果点击的当前已选中则返回
    checkboxArr.forEach(item => {
      item.checked = false
    })
    checkboxArr[index].checked = true; //改变当前选中的checked值
    this.setData({
      checkboxArr: checkboxArr
    });
    this.setData({
      zhanshidd: false
    })
    this.setData({
      sort: checkboxArr[index].name
    })
    this.setData({
      color: 'red'
    });
    var that = this;
    //在品牌详情中选择排序方式
    api.getJSON('/api/Brand/brand_info?page=1&id=' + this.data.guanjian + '&order=' + sortfangshi, function(res) {
      goodslist=[]
      if (res.data.status == 1) {
        var goods = res.data.data.goods_list;
        for(var i=0;i<goods.length;i++){
          goodslist.push(goods[i])
           that.setData({
             goods_list: goods
             })
        }
      
      }
    });
    
  },
  //排序的方式---区块的显示和隐藏
  xialakuang: function() {
    if (this.data.zhanshidd == false) {
      this.setData({
        zhanshidd: true
      })
    } else {
      this.setData({
        zhanshidd: false
      })
    }
  },
  bindDownLoad: function() {
    // console.log("666666666")
    console.log(this.data.bujia)
    //该方法绑定了页面滑动到底部的事件,下拉一次请求一次数据
    var that = this;
    // that.data.bujia这个是上一次如果它没有数据,它就会false
    if (that.data.bujia) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 400
      })
      var that = this;
      that.GetList(that); //页面拉一次，加载一次
    }
  },
  detail:function(e){
    var id = e.currentTarget.dataset.id;
    console.log('商品' + id)
    wx.navigateTo({
      url: '../../commodity/detalis/detalis?id=' + id,
    })
  }



})