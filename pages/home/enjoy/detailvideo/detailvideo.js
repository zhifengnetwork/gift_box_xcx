var api = require('../../../../utils/api');
var app = getApp();
// pages/home/enjoy/detailvideo/detailvideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    item:'',
    priture:'',
    music:'',
    biaoqing:'',
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    avatar:'',
    nickname:'',
    title:'',
    content:'',
    controls: false,
    placeholder: "说点什么...",
    hhh:'',
    point_num:null,
    collection_num:null,
    comments:[],
    maskstatus:false,
    focus:false,
    xianshistauts:true,
    context2:null,
    point_count:null,
    collection_count:null,
    user_id:null
  },

  // 返回按钮
  return:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
    })
    // 请求列表数据
    api.getJSON('/api/sharing/sharing_info?id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
    // api.getJSON('/api/sharing/sharing_info?id=97&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2NTkzNjQ3NiwiZXhwIjoxNTY1OTcyNDc2LCJ1c2VyX2lkIjo4OH0.Xgh12Dpijf2mt82vxEvWXlQMhWQEBiXITVUUatEjKVU', function (res) {
      if (res.data.status == 1) {
        that.setData({
          item: res.data.data,
          priture: res.data.data.priture,
          music: res.data.data.music,
          biaoqing: JSON.parse(res.data.data.text2),
          avatar: res.data.data.avatar,
          nickname: res.data.data.nickname,
          title: res.data.data.title,
          content: res.data.data.content,
          point_num: res.data.data.point_num,
          collection_num: res.data.data.collection_num,
          point_count: res.data.data.point_count,
          collection_count: res.data.data.collection_count,
          user_id: res.data.data.id
        })
        console.log("视频的数据")
        console.log(that.data.item)
      }
    })
    // 用户评论的内容
    api.getJSON('/api/sharing/sharing_comment_list?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&page=1&num=100000', function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data);
        that.setData({ comments: res.data.data })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   * 
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
    return {
      path: '/pages/home/enjoy/detailvideo/detailvideo?id=' + this.data.id
    }
  },
  // 文本域失去焦点
  changeContext: function (e) {
    var that = this
    console.log(e.detail.value);
    this.setData({
      context: e.detail.value
    })
  },
  // 实时获取第二个文本域里面的内容
  bind:function(e){
    var that = this
    console.log(e.detail.value);
    this.setData({
      context2: e.detail.value
    })
  },
  //点击显示用户的评论
  showcomments:function(){
    if (this.data.maskstatus === false){
      this.setData({ maskstatus: true, xianshistauts:false,focus:true});
    }else{
      this.setData({ maskstatus: false, xianshistauts: true, focus: false})
    }
  },
  //关闭评论
  guandiao:function(){
    this.setData({ maskstatus: false })
    this.setData({ xianshistauts:true})
  },
  //回复别人的评论
  huifu: function (e) {
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
    this.setData({ pid: pid });
    console.log(this.data.hhh)
  },
  // mask中点击发送信息
  song:function(){
    var that=this;
    console.log(that.data.context)
    api.getJSON('/api/sharing/add_comment?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&content=' + that.data.context2 + '&pid=' + that.data.pid, function (res) {
      if (res.data.status == 1) {
        that.setData({
          placeholder: "说点什么..."
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
    

    // 执行onload()
    // 请求列表数据
    api.getJSON('/api/sharing/sharing_info?id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
      // api.getJSON('/api/sharing/sharing_info?id=97&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2NTkzNjQ3NiwiZXhwIjoxNTY1OTcyNDc2LCJ1c2VyX2lkIjo4OH0.Xgh12Dpijf2mt82vxEvWXlQMhWQEBiXITVUUatEjKVU', function (res) {
      if (res.data.status == 1) {
        that.setData({
          item: res.data.data,
          priture: res.data.data.priture,
          music: res.data.data.music,
          biaoqing: JSON.parse(res.data.data.text2),
          avatar: res.data.data.avatar,
          nickname: res.data.data.nickname,
          title: res.data.data.title,
          content: res.data.data.content,
          point_num: res.data.data.point_num,
          collection_num: res.data.data.collection_num,
          point_count: res.data.data.point_count,
          collection_count: res.data.data.collection_count
        })
        console.log("视频的数据")
        console.log(that.data.item)
      }
    })
    // 用户评论的内容
    api.getJSON('/api/sharing/sharing_comment_list?sharing_id=' + that.data.id + '&token=' + app.globalData.token + '&page=1&num=100000', function (res) {
      if (res.data.status == 1) {
        console.log(res.data.data);
        that.setData({ comments: res.data.data })
      }
    }) 
  },
  //点赞
  dianzang:function(){
    var that=this
    api.getJSON('/api/sharing/add_point?sharing_id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
        console.log(res.data); 
            // 重新请求接口 相当于onload()
            api.getJSON('/api/sharing/sharing_info?id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
              if (res.data.status == 1) {
                that.setData({
                  item: res.data.data,
                  priture: res.data.data.priture,
                  music: res.data.data.music,
                  biaoqing: JSON.parse(res.data.data.text2),
                  avatar: res.data.data.avatar,
                  nickname: res.data.data.nickname,
                  title: res.data.data.title,
                  content: res.data.data.content,
                  point_num: res.data.data.point_num,
                  collection_num: res.data.data.collection_num,
                  point_count: res.data.data.point_count,
                  collection_count: res.data.data.collection_count
                })
                console.log("视频的数据")
                console.log(that.data.item)
              }
            }) 
      }
    }) 
    if (that.data.point_count === 1) {
      that.setData({ point_count: 0 })
    } else {
      that.setData({ point_count: 1 })
    }
  },
  // 关注按钮
  guanzhu: function () {
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
            }, function (res) {
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
      }, function (res) {
        if (res.data.status == 1) {
          console.log(res)
        }
      })
    }
  },
  // 收藏
  shoucang:function(){
    var that=this;
    api.getJSON('/api/sharing/add_collection?sharing_id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
      if (res.data.status == 1) {
        console.log(res.data);
        // 重新请求接口 相当于onload()
        api.getJSON('/api/sharing/sharing_info?id=' + that.data.id + '&token=' + app.globalData.token, function (res) {
          if (res.data.status == 1) {
            that.setData({
              item: res.data.data,
              priture: res.data.data.priture,
              music: res.data.data.music,
              biaoqing: JSON.parse(res.data.data.text2),
              avatar: res.data.data.avatar,
              nickname: res.data.data.nickname,
              title: res.data.data.title,
              content: res.data.data.content,
              point_num: res.data.data.point_num,
              collection_num: res.data.data.collection_num
            })
            console.log("视频的数据")
            console.log(that.data.item)
          }
        })    
      }
    })
    if (that.data.collection_count === 1) {
      that.setData({collection_count: 0 })
    } else {
      that.setData({collection_count: 1 })
    }
  }




  

})