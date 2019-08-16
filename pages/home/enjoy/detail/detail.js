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
    placeholder: "選填，請先和商家協商一致",
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
  onShareAppMessage: function() {

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
            placeholder: "選填，請先和商家協商一致"
          })
          that.setData({
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

      api.getJSON('/api/sharing/add_comment?sharing_id='+that.data.id+'&token=' + app.globalData.token + '&content=' + that.data.context + '&pid=' + that.data.pid, function(res) {
        if (res.data.status == 1) {
          that.setData({
            placeholder: "選填，請先和商家協商一致"
          })
          that.setData({
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

    }

 

  },
  // 显示全部评论
  quanbu: function() {
    if (this.data.status == true) {
      this.setData({
        status: false
      })
      console.log("aaaa")
      return;
    }
    if (this.data.status == false) {
      this.setData({
        status: true
      })
      console.log("bbbb")
    }
  },
  //回复别人的评论
  huifu: function(e) {
    var nickname = e.currentTarget.dataset.nickname;
    var pid = e.currentTarget.dataset.pid;
    nickname = "回复" + nickname + ":"
    console.log(nickname)
    this.setData({
      placeholder: nickname
    });
    this.setData({
      focus: true
    });
    this.setData({pid:pid});
    console.log(this.data.hhh)
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

})