
var api = require('../../utils/api');
const app = getApp()
Page({
  data: {


    navLeftItems: [],
    selectMenuID: 99,
    // 字母检索数据  --s
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0, //置顶高度
    scrollTopId: '', //置顶id
    tbodyHeight:'',
    city: [],
    vid: 8,
    diyi:true,
    dier:[],
    scroll_height: 0,
    scroll_height1: 0,
    scroll_height2:0,
    isIPX: app.globalData.isIPX,
    shopId:0,

    "result": {
      "goods": {
        "goods_spec_list": [
          [ 
            {
              "name": "A品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "A"
            },
            {
              "name": "A品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "A"
            },
            {
              "name": "A品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "A"
            },
            {
              "name": "A品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "A"
            },
            {
              "name": "A品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "A"
            },
            {
              "name": "A品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "A"
            }

          ],
          [
            {
              "name": "B品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "B"
            },
            {
              "name": "B品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "B"
            },
            {
              "name": "B品牌yy",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "B"
            },
            {
              "name": "B品牌yy",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "B"
            },
            {
              "name": "B品牌00",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "B"
            },
            {
              "name": "B品牌0088",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "B"
            } 
          ],
          [
            {
              "name": "G品牌",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌11",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌44",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌67",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌89",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌44",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌67",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌89",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌44",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌67",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌89",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌44",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌67",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            },
            {
              "name": "G品牌89",
              "img": "https://giftbox.zhifengwangluo.com/public/upload/images/category/20190625156139819085278.png",
              "key": "G"
            }

          ]
        ]
      },
    
    }
    
    //字母检索数据  --e


  },
  onReady:function(){

    var that=this;
   //判断设备是否为 iPhone X
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断  判断设备是否为 iPhone X
        if (res.model.search('iPhone X') != -1) {
          that.data.isIPX = true;
          console.log("55555555555558888");
          var scrollheight = res.windowHeight - 120
          that.setData({
            tbodyHeight: scrollheight
          })
        }
        else{
          var scrollheight = res.windowHeight - 100
          that.setData({
            tbodyHeight: scrollheight
          })
        } 
      }
  })
  },
  onLoad: function() {

    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    console.log("windowHeight" + windowHeight)
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    console.log("windowWidth" + windowWidth)
    // 236
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 250 - 30
    })
    this.setData({
      scroll_height1: windowHeight * 750 / windowWidth - 250 - 30
    })
    this.setData({
      scroll_height2: windowHeight * 750 / windowWidth - 325 - 30
    })
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象  
    var that = this
    // api.getJSON('/api/goods/categoryList', function(res) {
    //   if (res.data.status == 1) {
    //     that.setData({
    //       navLeftItems: res.data.data
    //     })
    //     console.log(res.data.data)
    //     console.log("ss" + that.data.navLeftItems[0].cat_name)
    //   }
    // }),
      
      // api.getJSON('/api/goods/brand', function (res) {
      //   if (res.data.status == 1) {
      //    console.log("--------+++");
      //    console.log(res.data.data);
      //     console.log("--------+++");
      //    that.setData({city:res.data.data})

      //   }
      // })

    api.getJSON('/api/Brand/getGoodsBrand', function (res) {
        if (res.data.status == 1) {
         console.log(res.data.data);
         that.setData({ city: res.data.data.brand_list})
          that.setData({navLeftItems: res.data.data.category_list})

        }
      })


      
    // 侧边索引表
    var sysInfo = wx.getSystemInfoSync();

    var winHeight = sysInfo.windowHeight;
    var tempObj = [];
    this.setData({
      winHeight: winHeight,  
      searchLetter: tempObj, 
    });
  },
  switchToRight: function(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      selectMenuID: index
    });
    this.setData({ diyi:false});
    var that=this;
    api.getJSON('/api/Category/getCategoryList?cat_id=' + id, function (res) {
      if (res.data.status == 1) {
        console.log( res.data.data)
        that.setData({dier:res.data.data})
      }
    })
  },
  // 字母检索方法--s
  clickLetter: function(e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function() {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  // 字母检索方法 --e
  quchu:function(e){
     var id = e.currentTarget.dataset.id;
     this.setData({ selectMenuID: id });
     this.setData({diyi:true})
  },
  sousuoyemian:function(){
    wx:wx.navigateTo({
      url: 'sousuo/sousuo'  
    })
  },
  dsis:function(){
    
  },
  binddetail:function(e){
    var id = e.currentTarget.dataset.id;
    this.setData({shopId:id})
  },
  //品牌详情页面,携带的参数,在另外的一个页面中的onload来获取参数
  xiang:function(){
   console.log("点击的id的值")
    console.log(this.data.shopId)
   wx.navigateTo({
     url: './shop/shop?id=' + this.data.shopId
   })
  }

  


})