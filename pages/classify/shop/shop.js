var api = require('../../../utils/api')
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
    goods_list:'',
    checkboxArr: [
      {
      name: '新品優先',
      checked: false
      }, 
      {
        name: '銷量優先',
        checked: false
      }, 
      {
        name: '價格從高到低',
        checked: true
      }, 
      {
        name: '價格從低到高',
      checked: false
      }
      ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 另外一个页面传递过来的参数
    console.log(options.keywords)
    this.setData({ guanjian: options.keywords});
    var that = this;
    api.getJSON('/api/search/search?keywords='+this.data.guanjian , function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data.goods_list)
        var goodlist = res.data.data.goods_list
        that.setData({goods_list:goodlist})
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


    api.getJSON('/api/search/search?sort='+price, function (res) {
      if (res.data.status == 1) {
         console.log("ssss")
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