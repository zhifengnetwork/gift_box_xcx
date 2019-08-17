var api = require('../../../utils/api')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: '排序',
    color: 'black',
    guanjian: '',
    goods_list: [],
    info: [],
    shopzu:[],
    xianshi:false,
    checkboxArr: [
      {
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
    headtitle:'搜索',
    cat_id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log('上个页面传过来的keywords是',options.keywords)
    that.setData({ headtitle: options.keywords});
    that.setData({ cat_id:options.cat_id})
    if (options.classify){
      api.getJSON(
        '/api/Category/category_goods?cat_id2=' + options.cat_id + "&token=" + app.globalData.token+'&page=1&num=100000', function (res) {
          if (res.data.status == 1) {
            console.log(res.data.data)
            that.setData({ shopzu: res.data.data })
            if (that.data.shopzu.length > 0) {
              that.setData({ xianshi: true })
            } else {
              that.setData({ xianshi: false })
            }

          }
        })
        return false;
    }
    api.getJSON(
      '/api/Category/search_goods?keyword=' + this.data.headtitle + "&token=" + app.globalData.token, function (res) {
        if (res.data.status == 1) {
          console.log(res.data.data)
          that.setData({shopzu:res.data.data})
          if(that.data.shopzu.length>0){
            that.setData({xianshi:true})
          }else{
            that.setData({xianshi: false })
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
  // 选择商品排序方式
  xuanze: function (e) {
    this.setData({ zhanshidd: false })
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var sortfangshi = e.currentTarget.dataset.sortfangshi; //获取当前点击的项的排列方式
    console.log("排序方式", sortfangshi)
    var checkboxArr = this.data.checkboxArr;//选项集合
    if (checkboxArr[index].checked) return;//如果点击的当前已选中则返回
    checkboxArr.forEach(item => {
      item.checked = false
    })
    checkboxArr[index].checked = true;//改变当前选中的checked值
    this.setData({
      checkboxArr: checkboxArr
    });
    this.setData({ sort: checkboxArr[index].name })
    this.setData({ color: 'red' });
    var that = this;
    api.getJSON(
      '/api/Category/category_goods?keyword=' + this.data.headtitle + "&token=" + app.globalData.token + '&num=1000000000000' + '&page=1' + '&order=' + sortfangshi + '&cat_id2=' + that.data.cat_id, function (res) {
        if (res.data.status == 1) {
          console.log(res.data.data)
          that.setData({ shopzu: res.data.data })
          if (that.data.shopzu.length > 0) {
            that.setData({ xianshi: true })
          } else {
            that.setData({ xianshi: false })
          }

        }
      }) 
    // api.getJSON(
    //   '/api/Category/category_goods?cat_id2=' + options.cat_id + "&token=" + app.globalData.token, function (res) {
    //     if (res.data.status == 1) {
    //       console.log(res.data.data)
    //       that.setData({ shopzu: res.data.data })
    //       if (that.data.shopzu.length > 0) {
    //         that.setData({ xianshi: true })
    //       } else {
    //         that.setData({ xianshi: false })
    //       }

    //     }
    //   })








  },
  //排序的方式---区块的显示和隐藏
  xialakuang: function () {
    if (this.data.zhanshidd == false) {
      this.setData({ zhanshidd: true })
    } else {
      this.setData({ zhanshidd: false })
    }
  },
  detail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log('商品' + id)
    wx.navigateTo({
      url: '../../commodity/detalis/detalis?id=' + id,
    })
  }
})