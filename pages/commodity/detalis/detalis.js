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
    attrList: [
      {
        attrName: '空调类型',                    // 规格名称
        attrType: '1',                          // 规格类型
        id: '915859d5376a46d5834f27edcf3dc114', // 规格id------
        attr: [                                 // 规格属性列表
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',   // 规格id --------
            id: '5',                                           // 此规格属性id
            attributeValue: '正1匹',                           // 属性名称
            enable: false,                                     // 是否可选--------
            select: false,                                     // 是否选择--------
          },
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            id: '6',
            attributeValue: '正1.5匹',
            enable: false,
            select: false,
          },
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            id: '7',
            attributeValue: '小1.5匹',
            enable: false,
            select: false,
          },
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            id: '8',
            attributeValue: '正2匹',
            enable: false,
            select: false,
          },
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            id: '9',
            attributeValue: '正3匹',
            enable: false,
            select: false,
          },
        ],
      },
      {
        attrName: '颜色',
        attrType: 'text',
        id: 'e95a7777c08c41769d5207c075a25ddc',
        attr: [
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            id: '236bbb1d5c654e9cb3a1493a2bb4785b',
            attributeValue: '红色',
            enable: false,
            select: false,
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            id: 'bc6aa3592ab94ad9bd81a319a72c25fe',
            attributeValue: '白色',
            enable: false,
            select: false,
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            id: 'f52cf21afd2c42b68cfc3f9c601458f7',
            attributeValue: '黑色',
            enable: false,
            select: false,
          },
        ],
      }
      
    ], // 清单列表
    skuBeanList: [
      {
        name: '正1匹_红色_', // 名称
        price: '1002',      // 价钱
        count: 100,         // 库存量
        attributes: [
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114', // 规格id
            attributeValId: '5',                             // 属性id
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            attributeValId: '236bbb1d5c654e9cb3a1493a2bb4785b',
          },
        ]
      },
      {
        name: '正1匹_白色_',
        price: '1002',
        count: 100,
        attributes: [
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            attributeValId: '5',
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            attributeValId: 'bc6aa3592ab94ad9bd81a319a72c25fe',
          }
        ]
      },
      {
        name: '正1.5匹_红色_',
        price: '1002',
        count: 100,
        attributes: [
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            attributeValId: '6',
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            attributeValId: '236bbb1d5c654e9cb3a1493a2bb4785b',
          }

        ]
      }
    ], // 存库列表
    infoText: "请点击获取属性，获取详细",
    attrListjj:[]
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
    }),
    // sku算法初始化数据
    // this.onData();
    // jjjzzz
    // api.getJSON('/api/goods/getGoodsAttrSpec?goods_id=57', function (res) {
    //   this.attrListjj=res.data.data.spec_attr
    //   console.log(res.data.data.spec_attr)
    // })
    
   
    // 请求数据,渲染商品页面
    api.getJSON('/api/goods/goodsDetail?goods_id=57&token=' + app.globalData.token, function (res) { 
      console.log(res.data.data.spec.spec_attr)
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
  // 商品规格选择 --s
  /**
  * Sku核心算法
  * 根据所有出当前类别之外的选择 判断按钮的enable ？ false or true
  */
  onData: function () {

    var attrListIn = this.data.attrList;

    console.log(this.data.attrList, "待扫描 列表清单");
    console.log(this.data.skuBeanList, "待扫描 库存清单");

    for (var i = 0; i < attrListIn.length; i++) {
      var attrListBig = attrListIn[i];

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

            if (attrListBig.id == goodAttrBean.attributeId) {
              enableIds.push(goodAttrBean.attributeValId);
            }
          }
        }
      }

      console.log(enableIds, "sku算法 扫描结果");

      var integers = enableIds;
      for (var s = 0; s < attrListBig.attr.length; s++) {
        var attrItem = attrListBig.attr[s];

        attrItem.enable = integers.indexOf(attrItem.id) != -1;

      }
    }

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

    // 重新sku运算
    this.onData();
  },
  justifyAnswer: function (e) {
    let findex = e.currentTarget.dataset.findex;
    let index2 = e.currentTarget.dataset.index;
    let index = "justifyAnswer[" + findex + "]";
    console.log(e.currentTarget.dataset.findex)
    console.log(e.currentTarget.dataset.index)
    this.setData({
      [index]: e.currentTarget.dataset.index
    });
    console.log(this.data.spec.spec_attr[findex].res[index2].attr_name);
    //值
    var xuangui=this.data.spec.spec_attr[findex].res[index2].attr_name;
    var xuangui_id = this.data.spec.spec_attr[findex].res[index2].attr_id
    var that=this;
    console.log("sss")
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
     
   
     





     
     
    })






    
    







  },
  // 商品规格选择 --e

})