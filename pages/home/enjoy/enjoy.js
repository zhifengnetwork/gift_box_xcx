var api = require('../../../utils/api');
var app = getApp();
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight, // 获取手机状态栏高度
    imgWidth: 0,
    imgHeight: 0,
    scroll_height: 0,
    currentTab: 0,
    note: [],
    nav_title: [],
    list: [],
    bujia: true,
    goodslist: [],
    topic_id:0,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //缓冲提醒
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 400
    })
    //分页代码:获取系统的参数，scrollHeight数值,微信必须要设置style:height才能监听滚动事件
    wx.getSystemInfo({
      success: function(res) {
        console.info(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    });
    api.getJSON('/api/Sharing/get_sharing_topic', function(res) {
      if (res.data.status == 1) {
        console.log(res.data.data);
        that.setData({
          nav_title: res.data.data
        });
      }
    })
    
  },


  GetList: function(that) {

    api.getJSON('/api/sharing/sharing_list?num=10' + '&topic_id='+that.data.topic_id+ '&page=' + that.data.page + '&token=' + app.globalData.token, function(res) {
      if (res.data.status == 1) {
        if (res.data.data.length > 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.goodslist.push(res.data.data[i])
          }
          that.setData({
            note: that.data.goodslist
          })
          console.log(that.data.note)
          that.data.page++;
        } else {
          that.setData({
            bujia: false
          })
        }

      }
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
    var that=this
    this.GetList(that); //页面初次展示调用第一次数据，比如说5条记录
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
  // tab切换
  //点击切换
  clickTab: function(e) {
    var that = this;
    var arr = [];
    that.setData({ goodslist: arr});

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    that.setData({topic_id:e.target.dataset.id});
    that.setData({bujia: true, page: 1})

    api.getJSON('/api/sharing/sharing_list?num=10' + '&topic_id=' + that.data.topic_id + '&page=1&token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
       
        if (res.data.data.length > 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.goodslist.push(res.data.data[i])
          }
          that.setData({
            note: that.data.goodslist
          })
          that.data.page++;
        } else {
          var kong=[]
          that.setData({
            bujia: false
          })
          that.setData({
            note:kong
          })
        }

      }
    })


  },
  dianji: function(e) {
    var that = this;
    var id = e.target.dataset.id;
    var index = e.target.dataset.index;
    console.log(index)

    if (that.data.note[index].count == 1) {
      api.getJSON('/api/sharing/add_point?token=' + app.globalData.token + '&sharing_id=' + id, function(res) {
        if (res.data.status == 1) {
          console.log("取消点赞");
          console.log(res.data)
          that.onLoad()
        }
      })
      return;
    }
    if (that.data.note[index].count == 0) {
      api.getJSON('/api/sharing/add_point?token=' + app.globalData.token + '&sharing_id=' + id, function(res) {
        if (res.data.status == 1) {
          console.log("点赞成功");
          console.log(res.data)
          that.onLoad()
        }
      })
    }
  },
  // 跳转到商品详情
  details: function() {
    wx.navigateTo({
      url: '../../home/enjoy/detail/detail',
    })
  },
  // 搜索框跳转页面
  search: function() {
    wx.navigateTo({
      url: '../../home/enjoy/searchfirst/searchfirst',
    })
  },
  bindDownLoad: function() {
    //该方法绑定了页面滑动到底部的事件,下拉一次请求一次数据
    if (this.data.bujia) {
      console.log("hhh")
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 400
      })
      var that = this;
      that.GetList(that); //页面拉一次，加载一次
    }
  }




})