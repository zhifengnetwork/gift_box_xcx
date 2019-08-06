var app = getApp()
var api = require('../../../utils/api');
// pages/my/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    currentTab: 0,
    page: 1,
    pagesc: 1,
    pagedg:1,
    rows: 6,
    isLastPage: false,
    isLastPagesc:false,
    isLastPagedg: false,
    isLoadInterface: false,
    isLoadInterfacesc: false,
    isLoadInterfacedg: false,
    datalist: '',
    list:'',
    datalistdg:'',
    wenzhang:[],
    shoucang:[],
    zanguo:[],
  },

  // 点击切换tab
  clickTab: function (e) {
    var that = this;
    console.log(e)
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }

    // if (e.target.dataset.current == 0){
    //   if(!that.data.wenzhang){
    //     that.searchDataList()
    //   }
    // }
    if(e.target.dataset.current == 1){
      let pagesc = that.data.pagesc
      that.shoucangbiao(pagesc)
    }
    if (e.target.dataset.current == 2) {
      let pagedg = that.data.pagedg
      that.zanguobiao(pagedg)
    }
  },

  //查询文章数据列表
  searchDataList: function (pageNum) {
    let that = this;
    if(that.data.currentTab == 0){
    let pageIndex = pageNum;
      api.postJSON({
        url: 'api/sharing/my_sharing_list',
        method: "POST",
        data: {
          token: app.globalData.token,
          "page": pageIndex,
          "num": that.data.rows
        },
        success: function (res) {

          that.setData({
            isLastPage: res.data.status,
            page: pageIndex,
            isLoadInterface: false,
            datalist: res.data.data
          })
          if (res.data.data != undefined) {
            if (pageIndex > 1) {
              var listBefore = that.data.wenzhang;
              var currentList = res.data.data;
              that.setData({
                wenzhang: listBefore.concat(currentList)
              })
            } else {
              that.setData({
                wenzhang: res.data.data
              })
            }
          }
        }, complete(e) {
          that.setData({
            isShowLoadPage: false
          })
        }
      })
    }
  },

  //查询收藏数据列表
  shoucangbiao: function (pageNum) {
    let that = this;
    if (that.data.currentTab == 1) {
      let pageIndex = pageNum;
      api.postJSON({
        url: 'api/sharing/my_collection_list',
        method: "POST",
        data: {
          token: app.globalData.token,
          "page": pageIndex,
          "num": that.data.rows
        },
        success: function (res) {
          that.setData({
            isLastPagesc: res.data.status,
            pagesc: pageIndex,
            isLoadInterfacesc: false,
            list: res.data.data
          })
          if (res.data.data != undefined) {
            if (pageIndex > 1) {
              var listBefore = that.data.shoucang;
              var currentList = res.data.data;
              that.setData({
                shoucang: listBefore.concat(currentList)
              })
            } else {
              that.setData({
                shoucang: res.data.data
              })
            }
          }
        }, complete(e) {
          that.setData({
            isShowLoadPage: false
          })
        }
      })
    }
  },


  //查询赞过文章数据列表
  zanguobiao: function (pagedg) {
    console.log(pagedg)
    let that = this;
    if (that.data.currentTab == 2) {
      let pageIndex = pagedg;
      api.postJSON({
        url: 'api/sharing/my_log_list',
        method: "POST",
        data: {
          token: app.globalData.token,
          "page": pageIndex,
          "num": that.data.rows
        },
        success: function (res) {

          that.setData({
            isLastPagedg: res.data.status,
            pagedg: pageIndex,
            isLoadInterfacedg: false,
            datalistdg: res.data.data
          })
          console.log(that.data.datalistdg)
          if (res.data.data != undefined) {
            if (pageIndex > 1) {
              var listBefore = that.data.zanguo;
              var currentList = res.data.data;
              that.setData({
                zanguo: listBefore.concat(currentList)
              })
            } else {
              that.setData({
                zanguo: res.data.data
              })
            }
          }
        }, complete(e) {
          that.setData({
            isShowLoadPage: false
          })
        }
      })
    }
  },

  //触底加载下一页
  nextDataPage: function () {
    let that = this;
    if(that.data.currentTab == 0){
    if (that.data.datalist.length > 0) {
      console.log(1)
      let islastVar = that.data.isLastPage;

      if (!that.data.isLoadInterface) {
        // console.log(456)
        if (islastVar) {
          //防止在接口未执行完再次调用接口
          // console.log(that.data.datalist)
          that.setData({
            isLoadInterface: true
          })
          let page = that.data.page * 1 + 1;
          that.searchDataList(page);
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 200
          })
        }
      }
    } else {
      console.log(2)
      wx.showToast({
        title: '我是有底线的',
        icon: 'none',
        duration: 600
      })
    }
  }
    
    if(that.data.currentTab == 1){
      console.log(that.data.list)
      let islastVar = that.data.isLastPagesc;
      if(that.data.list.length > 0){
      if (!that.data.isLoadInterfacesc) {
        console.log(islastVar)
        if (islastVar) {
          console.log(1)
          //防止在接口未执行完再次调用接口
          // console.log(that.data.datalist)
          that.setData({
            isLoadInterfacesc: true
          })
            let pagesc = that.data.pagesc * 1 + 1;
            that.shoucangbiao(pagesc);
          // }

          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 200
          })
        } 
      
     }
    } else {
      console.log(2)
      wx.showToast({
        title: '我是有底线的',
        icon: 'none',
        duration: 600
      })
    }
    }


    if (that.data.currentTab == 2) {
      let islastVar = that.data.isLastPagedg;
      if(that.data.datalistdg.length > 0){
      if (!that.data.isLoadInterfacedg) {
        console.log(1)
        console.log(islastVar)
        if (islastVar) {
          console.log(1)
          //防止在接口未执行完再次调用接口
          // console.log(that.data.datalist)
          that.setData({
            isLoadInterfacedg: true
          })
          
          let page = that.data.pagedg * 1 + 1;
          that.zanguobiao(page);
          // }
          
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 200
          })
        } 
      } 
      } else {
        console.log(2)
        wx.showToast({
          title: '我是有底线的',
          icon: 'none',
          duration: 600
        })
      }
    }



  },


  //请求收藏接口
  shoucang: function () {
    let that = this;
    api.postJSON('api/sharing/my_collection_list', {
      token: app.globalData.token,
      page: that.data.pagesc,
      num: that.data.rows,
    }, function (res) {
      if (res.data.status == 1) {
        that.setData({
          shoucang: res.data.data,
        })
      }
      console.log(res)
    })
  },

  //请求读过文章接口
  // zanguo: function () {
  //   let that = this;
  //   api.postJSON('api/sharing/my_log_list', {
  //     token: app.globalData.token,
  //     page: that.data.pagedg,
  //     num: that.data.rows,
  //   }, function (res) {
  //     if (res.data.status == 1) {
  //       that.setData({
  //         zanguo: res.data.data,
  //         isLastPagedg: res.data.status
  //       })
  //     }
  //     console.log(res)
  //   })
  // },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // that.shoucang();
    let page = that.data.page;
    that.searchDataList(page);
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

  }
})