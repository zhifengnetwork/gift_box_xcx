// pages/commodity/detalis/detalis.js
var api = require('../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advImage: [{
      url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
    },
    {
      url: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'
    },
    {
      url: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    },
    {
      url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
    }
    ],
    currentSwiper: 0,
    indicatorColor: 'white',
    indicatorActivecolor: 'red',
    currentTab: 0,
    list: 3,
    listdata: 8,
    spec_attr:[],
    spec:[],
    xuan:[],
    guige_id:[],
    justifyAnswer:[],
    // 头部导航栏的高度
    // statusBarHeight: app.globalData.statusBarHeight,
    height: app.globalData.height * 2 + 25,
    navbarData: {
      name: '我是标题'
    },
  

  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  // 犒劳自己的商品选择事件
  my_goods: function () {
    wx.navigateTo({
      url: 'payment/award/award',
    })


  },
  GiveOthers: function () {
    wx.navigateTo({
      url: 'give/GiveOthers/GiveOthers',
    })
  },
  preventTouchMove: function () {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      advimg: this.data.advImage,
    })
   
    var id = 57;
   
    // 请求数据,渲染商品页面
    api.getJSON('/api/goods/goodsDetail?goods_id='+id+'&token=' + app.globalData.token, function (res) { 
      
      console.log(res.data.data)

      that.setData({ spec_attr: res.data.data.spec.spec_attr});
      that.setData({ spec:res.data.data.spec})
     })


  },

  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
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

  },



 
  justifyAnswer: function (e) {

    let enable = e.currentTarget.dataset.enable;
    if(enable == 0){
      wx.showToast({
        title: '没有库存',
      })
    }

    let findex = e.currentTarget.dataset.findex;
    let index2 = e.currentTarget.dataset.index;
    let index = "justifyAnswer[" + findex + "]";

    console.log(findex)
    console.log(index)

    this.setData({
      [index]: e.currentTarget.dataset.index
    });

    console.log(this.data.spec.spec_attr[findex].res[index2].attr_name);
    //值
    var xuangui=this.data.spec.spec_attr[findex].res[index2].attr_name;
    var xuangui_id = this.data.spec.spec_attr[findex].res[index2].attr_id
    var that=this;
  
    // 将选择的规格 具体的值  赋值在xuan这个数组里面
    console.log(that.data.xuan[findex])
    var attr_id=0
    if (that.data.xuan[findex]===undefined){
      that.data.xuan.push(xuangui);
    }
    else{
      that.data.xuan[findex] = xuangui
    }
    console.log(that.data.xuan);
  

   // 将选择的规格 具体的id  赋值在xuangui_id这个数组里面
    console.log("guige_id");
    if (that.data.guige_id[findex] === undefined) {
      that.data.guige_id.push(xuangui_id);
    }
    else {
      that.data.guige_id[findex] = xuangui_id
    }
    console.log(this.data.guige_id)


   //每点击一个获取它的 spec_id 和 attr_id
    var spec_idla = this.data.spec.spec_attr[findex].spec_id;
    var attr_idla = this.data.spec.spec_attr[findex].res[index2].attr_id;
    console.log("hhh"+spec_idla) 
    console.log("hhh"+attr_idla)


  //请求接口,渲染出来,设计库存
    api.getJSON('/api/goods/getGoodsAttrSpec?goods_id=57&spec_id=' + spec_idla + '&attr_id=' + attr_idla +'&token='+ app.globalData.token, function (res) {


      





      /*
      console.log(res.data.data)
      console.log(res.data.data[0].attributes.length)

      var changdu=res.data.data[0].attributes.length
      console.log("xixi")

      //以一行为单位 获取一行中所有的id
      console.log("niubi")
      var cdss = [];
      console.log(that.data.spec_attr)
      for (var k = 0; k < that.data.spec_attr.length; k++) {
        var cd_id = [];
        for (var q = 0; q < that.data.spec_attr[k].res.length; q++) {
          cd_id.push(that.data.spec_attr[k].res[q].attr_id)
        }
        console.log("每一行id的集合:", cd_id);
      }
      var idji=[];
      for (var j = 0; j < res.data.data.length;j++){
        for (var i = 0; i < changdu; i++) {
          console.log(res.data.data[j].attributes[i].attr_id);
          idji.push(res.data.data[j].attributes[i].attr_id)
        }     
      }
      console.log(idji)
      for(var u=0;u<idji.length;u++){
         console.log(idji[3*u])
      }
     */


    })

  },
  // 商品规格选择 --e

})