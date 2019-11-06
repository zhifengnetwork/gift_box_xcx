var api = require('../../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentSwiper: 0,
    liang: true,
    zang: true,
    priture: [],
    detaillist: [],
    comments: [],
    status: true,
    placeholder: "添加評論",
    focus: false,
    pid: null,
    hhh: '',
    id: '',
    user_id: '',
    follow_count: '',
    type: '',
    note: [],
    nickname:"",
    biaoqing:'',
    biaoqian:'',
    xianshi:true,
    forward_num:0,
    note:[],
    topic_id:null,
    pName: '',
    showProup: false,
    proupText:'',
    isShowDete: true,
    proupIndex: [0,0],
    deleteId:'',
    replyId:''
  },
  onCloseProup(){
    this.setData({ showProup: !this.data.showProup });
  },
  // 视频播放函数
  audioplay: function(){
    let taht = this
    // 视频播放，配乐播放
    console.log(123)
    that.audioCtx.play()
  },

  // 视频暂停播放函数
  audiopause: function(){
    let that = this
    console.log(456)
    that.audioCtx.pause()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // 获取屏幕的宽度 单位是px
    var windowWidth = wx.getSystemInfoSync().windowWidth
    windowWidth = windowWidth * 0.9
    var geshu = windowWidth /11
    geshu = parseInt(geshu) * 2 - 1
    console.log(geshu)

    that.setData({ nickname: app.globalData.userInfo.nickname}) 
    that.setData({
      id: options.id
    })
    api.getJSON('/api/sharing/sharing_info?id=' + that.data.id + '&token=' + app.globalData.token, function(res) {
      if (res.data.status == 1) {
        console.log(res.data.data);
        that.setData({
          detaillist: res.data.data,
          priture: res.data.data.priture,
          user_id: res.data.data.user_id,
          follow_count: res.data.data.follow_count,
          type: res.data.data.type,
          music: res.data.data.music,
          biaoqian: JSON.parse(res.data.data.text),
          biaoqing: JSON.parse(res.data.data.text2),
          forward_num: res.data.data.forward_num,
          topic_id: res.data.data.topic_id
        })
        console.log(that.data.detaillist.content.length)
      
        console.log(that.data.topic_id)
        console.log("个数为"+geshu)
        console.log("内容长度" + that.data.detaillist.content.length)
        console.log(that.data.detaillist.content)
        if (geshu > that.data.detaillist.content.length){
          that.setData({xianshi:false})
        }else{
          that.setData({ xianshi: true })
        } 

        // 相关推荐
        api.getJSON('/api/sharing/sharing_list?topic_id=' + that.data.topic_id + '&token=' + app.globalData.token + '&page=1&num=100000', function (res) {
          if (res.data.status == 1) {
            console.log(res.data.data);
            that.setData({ note: res.data.data })
          }
        }) 


      }
    })
    api.getJSON('/api/sharing/sharing_comment_list?sharing_id=' + that.data.id + '&token=' + app.globalData.token +'&page=1&num=100000' , function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data);
        that.setData({comments: res.data.data})
      }
    })
   

  },

  audioPlay: function() {
    console.log(123455)
    this.audioCtx.play()
  },
  // 跳转到商品详情
  details: function (e) {
    let that = this
    that.setData({
      id: e.currentTarget.dataset.id,
    })
    if (e.currentTarget.dataset.type == 0) {
      wx.navigateTo({
        url: '../../../home/enjoy/detail/detail?id=' + that.data.id,
      })
    } else if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: '../detailvideo/detailvideo?id=' + that.data.id,
      })
    }
  },
  pageTo(){
    wx.navigateTo({
      url: '/pages/my/other/other?user_id=' + this.data.user_id,
    })
  },
  pageToChat() {
    var obj = {
      my_id: getApp().globalData.userInfo.id,
      you_id: this.data.user_id
    }
    if (obj.my_id == obj.you_id){
      this.pageTo()
      return
    }
    wx.navigateTo({
      url: '/pages/message/chat/chat?obj=' + JSON.stringify(obj)
    })
  },
  pageToDetails(e){
    wx.navigateTo({
      url: '/pages/commodity/detalis/detalis?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.audioCtx = wx.createAudioContext('myAudio')
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
   // 分享
  onShareAppMessage: function(res) {
    var that=this
    // return {
    //   success: function (res) {
    //     //转发成功    
    //     api.getJSON('/api/sharing/add_forward?sharing_id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
    //       if (res.data.status == 1) {
    //        console.log("分享成功")
    //       }
    //     })
    //     //重新请求接口
    //     var num=that.data.forward_num
    //     num=num+1
    //     that.setData({forward_num:num})
    //   },

    //   fail: function (res) {
    //     // 转发失败      
    //     console.log("转发失败:" + JSON.stringify(res));
    //   }
    // }
    api.getJSON('/api/sharing/add_forward?sharing_id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
          if (res.data.status == 1) {
           console.log("分享成功")
          }
        })
    //重新请求接口
        var num=that.data.forward_num
        num=num+1
      setTimeout(function () {
        that.setData({ forward_num: num })
      }, 2000)
  },
  swiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    });

  },
  zhankai: function() {
    this.setData({
      liang: false
    })
  },
  shouqi: function() {
    this.setData({
      liang: true
    })
  },
 
  // 点赞
  dianji: function() {
    var that = this;
    api.getJSON('/api/sharing/add_point?sharing_id=' + that.data.id + '&token=' + app.globalData.token, function(res) {
      if (res.data.status == 1) {
        var num = 0;
        if (res.data.msg === "点赞成功") {
          console.log("点赞成功")
          var array = that.data.detaillist
          num = parseInt(array.point_num)
          if (parseInt(array.point_count) === 0) {
            num = num + 1
          } else {
            num = num
          }
          array.point_num = num
          array.point_count = 1
          that.setData({
            detaillist: array
          })
          console.log("加")
          console.log(array)
        } 
        
        else {
          console.log("取消点赞")
          var array = that.data.detaillist
          console.log(num)
          num = array.point_num
          if (parseInt(array.point_count) === 1) {
            num = num - 1
          }
          console.log(num)
          array.point_num = num
          array.point_count = 0
          that.setData({
            detaillist: array
          })
          console.log("减")
          console.log(array)
        }
      }
    })
  },
  //收藏
  collect:function(){
    var that=this
    api.getJSON('/api/sharing/add_collection?sharing_id='+that.data.id+'&token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
        // zhang是收藏显示的数字
        var zhang=0
        if (res.data.msg === "取消收藏"){
      
          var arr = that.data.detaillist;
          zhang = arr.collection_num
          if (arr.collection_count===1){
            zhang--
          }
          arr.collection_count = 0
          arr.collection_num = zhang
          that.setData({ detaillist: arr})

        }else{
          
          var arr = that.data.detaillist;
          zhang = arr.collection_num
          if (arr.collection_count === 0) {
            zhang++
          }
          arr.collection_count = 1
          arr.collection_num = zhang
          that.setData({ detaillist: arr })
        }         
      }
    })



  },
  // 文本域失去焦点
  changeContext: function(e) {
    var that = this
    console.log(e.detail.value);
    this.setData({
      context: e.detail.value
    })

    if (that.data.pid === null) {

      api.getJSON('/api/sharing/add_comment?sharing_id='+that.data.id+'&token=' + app.globalData.token + '&content=' + that.data.context, function(res) {
        if (res.data.status == 1) {
          that.setData({
            placeholder: "添加評論",
            hhh: ""
          })
          // 重新请求接口渲染数据
          api.getJSON('/api/sharing/sharing_comment_list?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&page=1&num=100000', function (res) {
            if (res.data.status == 1) {
              console.log(res.data.data);
              that.setData({ comments: res.data.data })
            }
          })
        }
      })
    } else {
      // that.data.context
      let text = ''
      if (this.data.context){
        text = '@' + this.data.pName + this.data.context
      }
      api.getJSON('/api/sharing/add_comment?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&content=' + text + '&pid=' + that.data.pid, function(res) {
        if (res.data.status == 1) {
          that.setData({
            placeholder: "添加評論",
            hhh: "",
            pid: null
          })
          // 重新请求接口渲染数据
          api.getJSON('/api/sharing/sharing_comment_list?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&page=1&num=100000', function (res) {
            if (res.data.status == 1) {
              console.log(res.data.data);
              that.setData({ comments: res.data.data })
            }
          })
        }
      })

    }

 

  },
  // 显示全部评论
  quanbu: function() {
    if (this.data.status == true) {
      this.setData({
        status: false
      })
      return;
    }
    if (this.data.status == false) {
      this.setData({
        status: true
      })
    }
  },
  //回复别人的评论
  huifu: function(e) {
    // var nickname = e.currentTarget.dataset.nickname;
    // var pid = e.currentTarget.dataset.pid;
    // var userId = e.currentTarget.dataset.userid
    
    var { index , idx } = e.currentTarget.dataset
    var obj = this.data.comments[index];
  console.log(idx)
    if (idx == undefined){
      if (obj.user_id == getApp().globalData.userInfo.id) {
        // this.data.proupIndex[0] = index
        this.setData({
          showProup: true,
          proupText: '你的评论: ' + obj.content,
          isShowDete: true,
          deleteId: obj.id,
          pName: obj.nickname
        })
      } else {
        this.setData({
          showProup: true,
          proupText: obj.nickname + '的评论: ' + obj.content,
          isShowDete: false,
          deleteId: obj.id,
          pName: obj.nickname
        })
      }
    }else{
      let ob = obj.list[idx]
      if (ob.user_id == getApp().globalData.userInfo.id) {
        this.setData({
          showProup: true,
          proupText: '你的评论: ' + ob.content,
          isShowDete: true,
          deleteId: ob.id,
          pName: ob.nickname
        })
      } else {
        this.setData({
          showProup: true,
          proupText: ob.nickname + '的评论: ' + ob.content,
          isShowDete: false,
          deleteId: ob.id,
          pName: ob.nickname
        })
      }
    }
  },

  // 关注按钮
  guanzhu: function() {
    let that = this
    if (that.data.follow_count) {
      wx.showModal({
        content: '確認不再關注?',
        success(res) {
          if (res.confirm) {
            that.setData({
              follow_count: !that.data.follow_count
            })
            api.postJSON('api/sharing/add_follow', {
              token: app.globalData.token,
              follow_user_id: that.data.user_id
            }, function(res) {
              if (res.data.status == 1) {
                console.log(res)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      that.setData({
        follow_count: !that.data.follow_count
      })
      api.postJSON('api/sharing/add_follow', {
        token: app.globalData.token,
        follow_user_id: that.data.user_id
      }, function(res) {
        if (res.data.status == 1) {
          console.log(res)
        }
      })
    }
  },
  // 点击回复
  replyComment(){
    // nickname = "回复" + nickname + ":"

    // this.setData({
    //   placeholder: nickname,
    //   pName: e.currentTarget.dataset.nickname,
    //   focus: true,
    //   pid
    // });
    this.setData({
      showProup: false,
      focus: true,
      pid: this.data.deleteId,
      placeholder: '回复' + this.data.pName + ':'
    })
  },
  //删除评论
  deleteComment(){
    var that = this
    api.postJSON('api/Sharing/del_comment', {
      token: app.globalData.token,
      id: this.data.deleteId,
      sharing_id: this.data.id
    }, function (res) {
      console.log(res.data)
      if (res.data.status == 1) {
        that.setData({
          showProup: false
        })
        api.getJSON('/api/sharing/sharing_comment_list?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&page=1&num=100000', function (res) {
          if (res.data.status == 1) {
            // console.log(res.data.data);
            that.setData({ comments: res.data.data })
          }
        })
      }
    })
  }

})