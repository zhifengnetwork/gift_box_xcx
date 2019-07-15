// pages/commodity/detalis/detalis.js
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
        // 商品规格选择数据结构
        // 01.规格选择
        selectArr: [], //存放被选中的值
        shopItemInfo: {}, //存放要和选中的值进行匹配的数据
        subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
        // 02.规格显示
        skuShow: null,
        guigedata: {},
       
        },
        clickTab: function(e) {
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
        my_goods: function() {
          wx.navigateTo({
            url: 'payment/award/award',
          })

        },
        GiveOthers: function() {
          wx.navigateTo({
            url: 'give/GiveOthers/GiveOthers',
          })
        },
        preventTouchMove: function() {},
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
          this.setData({
            advimg: this.data.advImage,
          }),
            uni.request({
              url: 'https://www.easy-mock.com/mock/5cdd6b00fd487e51be5eb0a0/',
              data: {},
              header: {},
              success: (res) => {
                this.guigedata = res.data.guige_data
                // this.setData()
              },
              fail: (err) => {
                console.log(err)
              }
            });
         
        },

        swiperChange: function(e) {
          this.setData({
            currentSwiper: e.detail.current
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
       

        //商品选择--s
  // setData() {
  //   let sku = this.guigedata.sku;
  //   for (let i = 0, len = sku.length; i < len; i++) {
  //     this.shopItemInfo[sku[i].attr_ids.replace(/\//g, ",")] = sku[i];
  //     /* 
  //     * 修改数据结构格式，用规格组成的id用逗号分割作属性名
  //     *  */
  //   }
  //   this.checkItem();
  // },

  // 01.规格选择
  specificationBtn(item, n, event, index) {
    /* 
     * n是外层循环，index是内层循环
     * item是数据项
     * event事件对象
     *  */
    if (this.selectArr[n] != item) {
      /* 
      * n是外层索引，也就是颜色、尺寸这样的规格类别
      * (this.selectArr[n] != item) 也就是这一类规格没有再点击一样的
      *  */
      this.selectArr[n] = item;
      this.subIndex[n] = index;
    } else {
      /* 
      * 如果是点击了这一类里刚点击了的规格，则去除选中态
      * 也就是点击了选中再点击去除选中
      * */
      this.selectArr[n] = "";
      this.subIndex[n] = -1; //去掉选中的颜色
    }
    this.checkItem();
  },
  checkItem() {
    let option = this.guigedata.apec_attr;
    let result = []; //定义数组存储已经被选中的值
    let len = option.length;
    for (let i = 0; i < len; i++) {
      result[i] = this.selectArr[i] ? this.selectArr[i] : "";
    }
    for (let i = 0; i < len; i++) {
      let last = result[i]; //把选中的值存放到字符串last去
      let leng = option[i].attrs.length;
      for (let k = 0; k < leng; k++) {
        result[i] = option[i].attrs[k].id; //赋值，存在直接覆盖，不存在往里面添加id值
        /* 
        * 循环判断每一个规格项
        * 在数据里面添加字段isShow来判断是否可以选择
        * 
        *  */
        option[i].attrs[k].isShow = this.isMay(result);
        /* 
        *  因为this.guigedata.apec_attr是一个对象，
        * option是指向这个对象的引用
        * 对option数据改动this.guigedata.apec_attr也会跟着改动
        * 用this.guigedata.apec_attr来渲染的oItem项数据也跟着变动
        * 
        *  */
        // console.log(this.guigedata.apec_attr[i].attrs[k].isShow,'===',option[i].attrs[k].isShow)
      }
      result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
    }
    this.$forceUpdate(); //重绘
  },
  isMay(result) {
    console.log(result)
    let len = result.length;
    for (let i = 0; i < len; i++) {
      if (result[i] == "") {
        return true; //如果数组里有为空的值，那直接返回true
      }
    }
    return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
  },
},
 
        // 商品规格选择--e
        

      )