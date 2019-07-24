var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    bar_Height: wx.getSystemInfoSync().statusBarHeight		// 获取手机状态栏高度
  },
  //  点击返回键
  goBack:function(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.items.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
      
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function(e) {
    var that=this;
    var shuliang = 0
    var idde = e.currentTarget.dataset.idde
    api.getJSON('/api/Cart/delCart?token=' + app.globalData.token + '&cart_id=' + idde, function (res) {
      if (res.data.status == 1) {
        console.log("成功laya")
      }
    })


    let carts = this.data.carts;
    carts[e.currentTarget.dataset.index].selected = false;
    console.log(e.currentTarget.dataset.index)
    carts.splice(e.currentTarget.dataset.index, 1)
    console.log("carts:", carts)
    this.setData({
      items: carts
    });
    console.log('items')
    console.log(this.data.items)


    var shuliang=0;
    for (var i = 0; i < that.data.items.length; i++) {
      if (that.data.items[i].selected === 1) {
        shuliang++
      }
    }
    if (shuliang === that.data.items.length) {
      that.setData({ selectAllStatus: true })
    }else{
      that.setData({ selectAllStatus: false })
    }
    if (that.data.items.length==0){
      that.setData({ selectAllStatus: false })
    }


    this.getTotalPrice()

 











    // var that = this;
    // api.getJSON('/api/Cart/cartlist?page=1&num=300&token=' + app.globalData.token, function (res) {
    //   if (res.data.status == 1) {
    //     console.log(res.data.data)
    //     that.setData({
    //       carts: res.data.data
    //     });
    //     that.setData({
    //       items: that.data.carts
    //     });
    //     that.getTotalPrice();
    //   }
    // })






















   
    





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
    // 隐藏底部导航条
    wx.hideTabBar()
    var that = this;
    var shuliang = 0
    //先获取用户信息
    app.getUserInfo(userinfo => {
      api.getJSON('/api/Cart/cartlist?page=1&num=300&token=' + app.globalData.token, function (res) {
        if (res.data.status == 1) {
          console.log(res.data.data)
          that.setData({
            carts: res.data.data
          });
          that.data.items.push({
            content: that.data.carts,
            isTouchMove: false //默认全隐藏删除
          })
          console.log(that.data.items[0].content)
          that.setData({
            items: that.data.carts
          });
          for (var i = 0; i < that.data.items.length; i++) {
            if (that.data.items[i].selected === 1) {
              shuliang++
            }
          }
          if (shuliang === that.data.items.length) {
            that.setData({ selectAllStatus: true })
          }else{
            that.setData({ selectAllStatus: false })
          }
          if (that.data.items.length == 0) {
            that.setData({ selectAllStatus: false })
          }
          that.getTotalPrice();
        }
      })

    })
    console.log(that.data.carts)
  
    this.setData({
      hasList: true, // 既然有数据了，那设为true吧
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 计算总价
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].goods_num * carts[i].goods_price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  // 选择事件
  selectList(e) {
    const goodid = e.currentTarget.dataset.goodid
    api.getJSON('/api/Cart/selected?token=' + app.globalData.token + '&cart_id=' + goodid, function (res) {
      if (res.data.status == 1) {
        console.log("成功lage")
      }
    })
    var xuanzhongshu = 0
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.carts; // 获取购物车列表
    const selected = carts[index].selected; // 获取当前商品的选中状态
    carts[index].selected = !selected; // 改变状态
    this.setData({
      items: carts
    });
    this.getTotalPrice(); // 重新获取总价
    var that = this;
    for (var i = 0; i < that.data.items.length; i++) {
      if (!that.data.items[i].selected) {
        that.setData({
          selectAllStatus: false
        })
      }
      if (that.data.items[i].selected) {
        xuanzhongshu++
      }
    }
    console.log("xiiiiiiiiiiiiiiiiiiiii")
    console.log(that.data.items)
    console.log(xuanzhongshu)
    if (xuanzhongshu === that.data.items.length) {
      that.setData({
        selectAllStatus: true
      })
    }else{
      that.setData({
        selectAllStatus: false
      })
    }

  },
  //全选事件
  selectAll(e) {

    api.getJSON('/api/Cart/all_select?token=' + app.globalData.token, function (res) {
      if (res.data.status == 1){
        console.log("成功")
      }
    })




    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      items: carts
    });
    this.getTotalPrice(); // 重新获取总价
  },
  // 增加数量
  addCount(e) {
    const id = e.currentTarget.dataset.id;
    api.getJSON('/api/Cart/addCart?token=' + app.globalData.token + '&sku_id=' + id +'&cart_number=1', function (res) {
      if (res.data.status == 1) {  
       console.log("商品数量增加成功")
      }
    })
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let goods_num = carts[index].goods_num;
    goods_num = goods_num + 1;
    carts[index].goods_num = goods_num;
    this.setData({
      items: carts
    });
    this.getTotalPrice();

  },
  // 减少数量
  minusCount(e) {
    const id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let goods_num = carts[index].goods_num;
    if (goods_num <= 1) {
      return false;
    }
    api.getJSON('/api/Cart/addCart?token=' + app.globalData.token + '&sku_id=' + id + '&cart_number=-1', function (res) {
      if (res.data.status == 1) {
        console.log("商品数量减少成功")
      }
    })
    goods_num = goods_num - 1;
    carts[index].goods_num = goods_num;
    console.log(carts)
    this.setData({
      items: carts
    });
    console.log(this.data.carts)
    this.getTotalPrice();
  }

})