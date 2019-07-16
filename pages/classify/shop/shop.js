var api = require('../../../utils/api')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhanshi:true,
    zhanshidd:false,
    sort:'排序',
    color:'black',
    guanjian:'',
    goods_list:[],
    info:[],
    checkboxArr: [
      {
      name: '新品優先',
      checked: false,
      sortting:'new'

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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 另外一个页面传递过来的参数
    console.log(options.id)
    this.setData({guanjian: options.id});
    var that = this;
    // 根据传过来的品牌的id来做一个商品的品牌列表
     api.getJSON(
      '/api/Brand/brand_info?id=' + this.data.guanjian
      , function (res) {
      if (res.data.status == 1) {
        console.log("55")
        console.log(res.data.data)
        var goodlist = res.data.data.goods_list
        var infopaizi = res.data.data.info
        that.setData({goods_list:goodlist})
        that.setData({info: infopaizi })
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
  },
  zhanchu:function(){
    this.setData({zhanshi:false})
  },
  shouhui:function(){
    this.setData({ zhanshi: true })
  },
  // 选择商品排序方式
  xuanze:function(e){
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var sortfangshi = e.currentTarget.dataset.sortfangshi; //获取当前点击的项的排列方式
    var checkboxArr = this.data.checkboxArr;//选项集合
    if (checkboxArr[index].checked) return;//如果点击的当前已选中则返回
    checkboxArr.forEach(item => {
      item.checked = false
    })
    checkboxArr[index].checked = true;//改变当前选中的checked值
    this.setData({
      checkboxArr: checkboxArr
    });
    this.setData({ zhanshidd: false }) 
    this.setData({ sort: checkboxArr[index].name }) 
    this.setData({ color: 'red'});
    var that = this;
    // 在品牌详情中选择排序方式
    api.getJSON('/api/Brand/brand_info?id=' + this.data.guanjian+'&order='+sortfangshi, function (res) {
      if (res.data.status == 1) {
         console.log("ssss");
         console.log(res.data.data.goods_list)
         var goods=res.data.data.goods_list;
         that.setData({goods_list: goods})
      }
    }) 
  },
  //排序的方式---区块的显示和隐藏
  xialakuang:function(){
    if(this.data.zhanshidd==false){
      this.setData({ zhanshidd: true })
    }else{
      this.setData({ zhanshidd: false })  
    }
  }

 

})