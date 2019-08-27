// pages/card/makecard.js
var api = require('../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: '1',
        url: 'music/music',
        text: '选择音乐',
        tips: '请选择歌曲',
        img: '../../public/images/card/music.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '2',
        url: 'picture/picture',
        text: '选择照片',
        tips: '请选择照片',
        img: '../../public/images/card/picture.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '3',
        url: 'record/record',
        text: '录入语音',
        tips: '请录入语音',
        img: '../../public/images/card/record.png',
        icon: '../../public/images/card/revision.png'
      },
      {
        id: '4',
        url: 'blessing/blessing',
        text: '写下祝福',
        tips: '请填写祝福',
        img: '../../public/images/card/blessing.png',
        icon: '../../public/images/card/revision.png'
      },
    ],
    blessing: false,
    blessText:'',
    order_type:'',
    music_id:'',
    // 子页面返回值
    music: '',
    picture: '',
    record: '',
    recordTime: '',
    bless: '',
    box_id:0,
    cate_id:''//类型封面
  },
  // 跳转子页面
  skip: function(e) {
    console.log(e.currentTarget.dataset.url)
    let url = e.currentTarget.dataset.url;
    if (url == 'blessing/blessing') {
      this.setData({
        blessing: true
      })
      return false;
    }
    wx.navigateTo({
      url: url + '?music_id=' + this.data.music_id + '&picture=' + this.data.picture
    })
  },
  // 关闭祝福弹出层
  back: function() {
    this.setData({
      blessing: false
    })
  },
  // 提交祝福
  bleSend:function(){
    let that = this;
    api.postJSON('api/box/set_box', {
      'token': app.globalData.token,
      'id': app.globalData.makecard,
      'content': that.data.blessText
    },
    function(res){

      if(res.data.status==1){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        if (that.data.blessText != '') {
          that.data.list[3].tips = that.data.blessText;

        }
        that.setData({
          blessing: false,
          bless: that.data.blessText,
          blessText: '',
          list: that.data.list
        })

      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg
        })
      }
    })
  },
  // 监听祝福内容
  blessText: function(e) {
    this.setData({
      blessText: e.detail.value
    })
  },
  // 预览判断
  preview: function() {
    var str = '';
    if (this.data.music == '') {
      str = '音乐';
    } else if (this.data.picture == '') {
      str = '照片/视频';
    } else if (this.data.record == '') {
      str = '语音';
    } else if (this.data.bless == '') {
      str = '祝福语';
    }
    if (str != '') {
      wx.showModal({
        title: '提示',
        content: '您未添加自己专属的' + str + '，继续浏览将展示默认内容;',
        cancelText: '返回编辑',
        confirmText: '任性预览',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../go?id=' + app.globalData.makecard + '&preview=1'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 跳转预览
      console.log('跳转')
      wx.navigateTo({
        url: '../go?id=' + app.globalData.makecard + '&preview=1'
      })
    }
  },
  succeed:function(){
    wx.navigateTo({
      url: '../../commodity/detalis/give/cashgift/cashgift?order_type=' + this.data.order_type
    })
  },
  back_white:function(){
    wx.navigateBack({
      delta: 2,
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    
    let that = this;
    
    let cate_id = options.type_id == undefined ? '' : options.type_id;
    let order_type = options.order_type == undefined ? '' : options.order_type;
    let giveothers = options.giveothers == undefined ? '' : options.giveothers;

    this.setData({
      order_type: order_type,
      cate_id: cate_id,
      giveothers: giveothers
    })

  },

  /**
   * 加载数据
   */
  loadData:function(){

    var that = this

    api.postJSON('api/box/get_box', {
      'token': app.globalData.token,
      'cate_id': that.data.cate_id,
      'advice': that.data.giveothers,
      'id': app.globalData.makecard
    },
      function (res) {

        console.log(res.data)

        //if (!app.globalData.makecard) {

          app.globalData.makecard = res.data.data.id;
          that.setData({
            box_id: res.data.data.id,
            music_id: res.data.data.music_id,
            picture: res.data.data.photo_url
          })

          var datalist=[]
          datalist=that.data.list
          
          // 截取字符串前面18位
          var photourlurlqian = res.data.data.photo_url.substring(0, 12)
          // 截取字符串后面八位
          var photourlurlhou = res.data.data.photo_url.slice(-10)
          var photourl = photourlurlqian + '...' + photourlurlhou
          
          var voice_urlqian = res.data.data.voice_url.substring(0, 12)
          // 截取字符串后面八位
          var voice_urlhou = res.data.data.voice_url.slice(-10)
          var voice_url = voice_urlqian + '...' + voice_urlhou


          datalist[0].tips = res.data.data.music_name == '' ? '请选择歌曲' : res.data.data.music_name;//音乐
          datalist[1].tips = res.data.data.photo_url == '' ? '请选择照片' : photourl;//图片
          datalist[2].tips = res.data.data.voice_url == '' ? '请录入语音' : voice_url;//录音
          datalist[3].tips = res.data.data.content == '' ? '请填写祝福' : res.data.data.content;//祝福
          
          that.setData({ list: datalist })

       // } else {
       //     return false;
       // }

      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('渲染makecard')
    //加载数据
  
    if(this.data.music!=''){
      this.data.list[0].tips = this.data.music;
    }
    if (this.data.picture!=''){
      // this.data.list[1].tips = this.data.picture;
      this.data.list[1].tips = '已选择照片';
    }
    if (this.data.record!='') {
      // this.data.list[2].tips = this.data.record;
      this.data.list[2].tips = '已录入语音';
    }
    this.setData({
      list:this.data.list
    })

    this.loadData();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})