
var api = require('../../utils/api');
const app = getApp()
Page({
  data: {


    navLeftItems: [],
    selectMenuID: 0,
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
    isIPX: app.globalData.isIPX,
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
          var scrollheight = res.windowHeight - 94
          that.setData({
            tbodyHeight: scrollheight
          })
        } 
      }
  })
  },
  onLoad: function() {
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象  
    var that = this
    api.getJSON('/api/goods/categoryList', function(res) {
      if (res.data.status == 1) {
        that.setData({
          navLeftItems: res.data.data
        })
        console.log(res.data.data)
        console.log("ss" + that.data.navLeftItems[0].cat_name)

      }
    }),
      api.getJSON('/api/goods/brand', function (res) {
        if (res.data.status == 1) {
         console.log(res.data.data);
         that.setData({city:res.data.data})

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
    api.getJSON('/api/goods/categoryList?pid=' + id, function(res) {
      if (res.data.status == 1) {
        console.log(res.data)
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
  //选择城市
  bindCity: function (e) {
    console.log("bindCity")
    this.setData({
      city: e.currentTarget.dataset.city
    })
  },
  //选择热门城市
  bindHotCity: function (e) {
    console.log("bindHotCity")
    this.setData({
      city: e.currentTarget.dataset.city
    })
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  }
  // 字母检索方法 --e



})