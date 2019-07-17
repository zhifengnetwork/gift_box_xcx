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
    // 头部导航栏的高度
    // statusBarHeight: app.globalData.statusBarHeight,
    height: app.globalData.height * 2 + 25,
    navbarData: {
      name: '我是标题'
    },
     // 清单列表
    attrList:[],
    //库存列表
    skuBeanList:[],
    infoText: "请点击获取属性，获取详细"

  

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
  
    var that=this;
    that.setData({
      advimg: this.data.advImage,
    });
    var id = 57;
    // 请求数据,渲染商品页面
    api.getJSON('api/goods/detail?goods_id=' + id + '&token=' + app.globalData.token, function (res) {
    
      if (res.data.status===1){
        var list = res.data.data.attrList
        var sku = res.data.data.skuBeanList
     
        that.setData({ attrList: list })
        that.setData({ skuBeanList: sku })
        that.onData();
      }
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
  //商品选择开始 --s
  /**
  * Sku核心算法
  * 根据所有出当前类别之外的选择 判断按钮的enable ？ false or true
  */
  onData: function () {
    var attrListIn = this.data.attrList;
   // console.log(this.data.attrList, "待扫描 列表清单");
   // console.log(this.data.skuBeanList, "待扫描 库存清单");
    for (var i = 0; i < attrListIn.length; i++) {
      var attrListBig = attrListIn[i];
      //console.log("1111111")
     // console.log(attrListBig)
      //当前类别之外的选择列表
      var attrsOtherSelect = [];

      for (var j = 0; j < attrListIn.length; j++) {
        var attrListSmall = attrListIn[j];
  
        if (attrListSmall.id != attrListBig.id) {
        
          for (var k = 0; k < attrListSmall.attr.length; k++) {
            var attrListSmallAttr = attrListSmall.attr[k];
          
            if (attrListSmallAttr.enable && attrListSmallAttr.select) {
              attrsOtherSelect.push(attrListSmallAttr);
            }
          }
        }
      }
      var enableIds = [];
      var skuBeanListIn = this.data.skuBeanList;
     
      for (var z = 0; z < skuBeanListIn.length; z++) {
        var ism = true;
        var skuBean = skuBeanListIn[z];

        for (var j = 0; j < attrsOtherSelect.length; j++) {
          var enable = false;
          for (var k = 0; k < skuBean.attributes.length; k++) {
            var goodAttrBean = skuBean.attributes[k];
            if (attrsOtherSelect[j].attributeId == goodAttrBean.attributeId
              && attrsOtherSelect[j].id == goodAttrBean.attributeValId) {
              enable = true;
              break;
            }
          }
          ism = enable && ism;
        }

        if (ism) {
         
          for (var o = 0; o < skuBean.attributes.length; o++) {
            var goodAttrBean = skuBean.attributes[o];
            // console.log("goodAttrBean", goodAttrBean)
            // console.log('----')
            // console.log('attrListBig.id', attrListBig.id)

            if (attrListBig.id == goodAttrBean.attributeId) {
              enableIds.push(goodAttrBean.attributeValId);
            }
          }
        }
      }
      
     
     // console.log(enableIds, "sku算法 扫描结果");
      var integers = enableIds;
     // console.log('attrListBig.attr', attrListBig.attr)
      for (var s = 0; s < attrListBig.attr.length; s++) {
        var attrItem = attrListBig.attr[s];
       // console.log('attrItem', attrItem)
       // console.log('ididid',integers.indexOf(attrItem.id))
        attrItem.enable = integers.indexOf(attrItem.id) != -1;

        console.log(attrItem.enable)

      }
    }

    console.log(attrListIn)
    console.log(skuBeanListIn)


    // 重新赋值
    this.setData({
      attrList: attrListIn,
      skuBeanList: skuBeanListIn
    })
    
  },










  /**
   * 规格属性点击事件
   */
  onChangeShowState: function (event) {
    var listItem = this.data.attrList;
    var items = listItem[event.currentTarget.dataset.idx];
    var item = items.attr[event.currentTarget.dataset.index];

    if (!item.enable) {
      return;
    }

    var select = !item.select;

    for (var i = 0; i < items.attr.length; i++) {
      items.attr[i].select = false;
    }

    item.select = select;

    // 获取点击属性列表
    var canGetInfo = [];
    for (var skuIndex = 0; skuIndex < listItem.length; skuIndex++) {
      for (var skuIndexIn = 0; skuIndexIn < listItem[skuIndex].attr.length; skuIndexIn++) {
        if (listItem[skuIndex].attr[skuIndexIn].enable && listItem[skuIndex].attr[skuIndexIn].select) {
          canGetInfo.push(listItem[skuIndex].attr[skuIndexIn]);
        }
      }
    }

    console.log(canGetInfo, "目前点击的属性");

    var canGetInfoLog = "";

    var skuBeanList = this.data.skuBeanList;

    var haveSkuBean = [];
    // 对应库存清单扫描
    for (var skuBeanIndex = 0; skuBeanIndex < skuBeanList.length; skuBeanIndex++) {
      var iListCount = 0;
      for (var skuBeanIndexIn = 0; skuBeanIndexIn < skuBeanList[skuBeanIndex].attributes.length; skuBeanIndexIn++) {
        if (canGetInfo.length == skuBeanList[skuBeanIndex].attributes.length) {
          if (skuBeanList[skuBeanIndex].attributes[skuBeanIndexIn].attributeValId == canGetInfo[skuBeanIndexIn].id) {
            iListCount++;
          }
        } else {
          canGetInfoLog = "库存清单不存在此属性" + " ";
        }
      }
      if (iListCount == skuBeanList[skuBeanIndex].attributes.length) {
        haveSkuBean.push(skuBeanList[skuBeanIndex]);
      }
    }

    console.log(haveSkuBean, "存在于库存清单");

    for (var iox = 0; iox < canGetInfo.length; iox++) {
      canGetInfoLog += canGetInfo[iox].attributeValue + " ";
    }

    if (haveSkuBean.length != 0) {
      canGetInfoLog += "价钱:" + haveSkuBean[0].price + " 库存量:" + haveSkuBean[0].count;
    }

    // 重新赋值
    this.setData({
      attrList: listItem,
      infoText: canGetInfoLog,
    })

    //重新sku运算
    this.onData();
  }
  // 商品规格选择 --e

})


// if (res.data.status === 1) {
//   var attrListIn = that.data.attrList;
//   console.log(that.data.attrList, "待扫描 列表清单");
//   console.log(that.data.skuBeanList, "待扫描 库存清单");
//   for (var i = 0; i < attrListIn.length; i++) {
//     var attrListBig = attrListIn[i];
//     //当前类别之外的选择列表
//     var attrsOtherSelect = [];
//     for (var j = 0; j < attrListIn.length; j++) {
//       var attrListSmall = attrListIn[j];
//       if (attrListSmall.id != attrListBig.id) {
//         for (var k = 0; k < attrListSmall.attr.length; k++) {
//           var attrListSmallAttr = attrListSmall.attr[k];
//           if (attrListSmallAttr.enable && attrListSmallAttr.select) {
//             attrsOtherSelect.push(attrListSmallAttr);
//           }
//         }
//       }
//     }
//     var enableIds = [];

//     var skuBeanListIn = that.data.skuBeanList;

//     for (var z = 0; z < skuBeanListIn.length; z++) {
//       var ism = true;
//       var skuBean = skuBeanListIn[z];

//       for (var j = 0; j < attrsOtherSelect.length; j++) {
//         var enable = false;
//         for (var k = 0; k < skuBean.attributes.length; k++) {
//           var goodAttrBean = skuBean.attributes[k];
//           if (attrsOtherSelect[j].attributeId == goodAttrBean.attributeId
//             && attrsOtherSelect[j].id == goodAttrBean.attributeValId) {
//             enable = true;
//             break;
//           }
//         }
//         ism = enable && ism;
//       }
//       if (ism) {
//         for (var o = 0; o < skuBean.attributes.length; o++) {
//           var goodAttrBean = skuBean.attributes[o];

//           if (attrListBig.id == goodAttrBean.attributeId) {
//             enableIds.push(goodAttrBean.attributeValId);
//           }
//         }
//       }
//     }
//     console.log(enableIds, "sku算法 扫描结果");
//     var integers = enableIds;
//     for (var s = 0; s < attrListBig.attr.length; s++) {
//       var attrItem = attrListBig.attr[s];
//       attrItem.enable = integers.indexOf(attrItem.id) != -1;
//     }
//   }

//   // 重新赋值
//   that.setData({
//     attrList: attrListIn,
//     skuBeanList: skuBeanListIn
//   })

// }