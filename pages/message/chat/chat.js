
var app = getApp();
var socketOpen = false;
var SocketTask;
var url = 'wss://www.9pointstars.com:7272';
var api = require('../../../utils/api');
// var WxEmoji = require('../../../utils/WxEmojiView.js');
const { emojis, emojiToPath, textToEmoji } = require('../../../utils/emojis');

Page({
  data: {
    inputValue: '',     //输入框
    addImg: false,
    allContentList: [],//格式示例数据，可为空
    details_box:[],    //双方信息列表
    expressionHeight: 0 ,  //表情框高度
    title: '',         // 标题/用户名
    emojiList:[],
    // WxEmojiObjs: { showWxEmojiChooseView: 1, textAreaText:'哈哈哈'} 
    isScroll: true,
    isBack: true,
    isShow: 20,
    scrollTop: 0,
    oldheight: 0,//旧高度
    newheight: 0, //新窗口高度
    isFocus:false,
    inputBottom: 0
  },
  // 页面加载
  onLoad: function (e) {
    console.log(JSON.parse(e.obj),'页面接受的参数')
    this.getChatRecord(JSON.parse(e.obj))
    this.readChat(JSON.parse(e.obj))
    if (!socketOpen) {
      this.webSocket(JSON.parse(e.obj))
    }
    this.EmojiInit()
  },
  //初始化表情包
  EmojiInit(){
    const emojiList = Object.keys(emojis).map(key => ({
      key: key,
      img: emojiToPath(key)
    }))
    this.setData({
      emojiList
    })
  },
  //点击表情
  wxPreEmojiTap: function (e) {
    const { key } = e.currentTarget.dataset;
    const { inputValue } = this.data;
    this.setData({ inputValue: inputValue + key });
  },
  onShow: function () {
    // console.log(SocketTask)
    if (!SocketTask) {
      this.webSocket()
    }
  },
  // 页面加载完成
  // onReady
  onReady: function () {
    
    // this.changeWebSocket()
  },
  changeWebSocket(obj){
    var that = this;
    SocketTask.onOpen(res => {
      console.log('监听 WebSocket 连接打开事件。', res)
      socketOpen = true;
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      // SocketTask.close(function (close) {
      //   console.log('关闭 WebSocket 连接。', close)
      // })

      socketOpen = false;
      if(that.data.isBack){
        this.webSocket(obj)
      }
      
    })
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })
    SocketTask.onMessage(onMessage => {
      console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))

      var onMessage_data = JSON.parse(onMessage.data)

      if (onMessage_data.type == 'init') {  //初始化
        //发送绑定 自己的id
        console.log(SocketTask)
        sendSocketMessage({ "type": "bind", "from_id": obj.my_id })
      }
      if (onMessage_data.type == 'ping') {  //ping 心跳检查 30s一次 
        //收到 回应 
        sendSocketMessage({ "type": "ping", "from_id": obj.my_id })
      }
      if (onMessage_data.type == 'accept') { // 对方发过来的聊天信息
        if (onMessage_data.msg_type == 1) {
          onMessage_data.content = textToEmoji(onMessage_data.content)
        }
        let time = onMessage_data.add_time
        onMessage_data.add_time = that.getDateDiff(onMessage_data.add_time)

        that.data.allContentList.push({ is_ai: Object.assign(onMessage_data, that.data.details_box[1]), time });
        that.setData({
          allContentList: that.data.allContentList
        })
        
        that.bottom()
      }
    })
  },
  webSocket: function (obj) {
    // 创建Socket
    var that = this
    SocketTask = wx.connectSocket({
      url: url,
      data: 'data',
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log('WebSocket连接创建', res)
        socketOpen = true
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
    console.log(SocketTask)
    that.changeWebSocket(obj)
  },

  // 提交文字
  submitTo: function (e) {
    let that = this;
    if (that.data.inputValue == "") return
    var data = {
      type:'say',   //say 聊天  
      content: that.data.inputValue,
      msg_type: 1,//msg_type  =1 文本 =2 图片 
      from_id: that.data.details_box[0].id,
      scene: "chat",
      receive_id: that.data.details_box[1].id
    }

    if (socketOpen) {
      // 如果打开了socket就发送数据给服务器
      console.log('发送数据',data)
      sendSocketMessage(data)
      let add_time = that.getDateDiff(new Date().getTime() / 1000)
      let content = textToEmoji(data.content)
      this.data.allContentList.push({ 
        is_my: { content, add_time, msg_type: 1, ...that.data.details_box[0] } ,
        time: new Date().getTime() / 1000
      });
      this.setData({
        allContentList: this.data.allContentList,
        inputValue: ''
      })
      that.hideExpression()
      that.bottom()
    }
  },
  //选择图片, 并发送
  upimg: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: function (res) {
        console.log(res)
        that.setData({
          img: res.tempFilePaths
        })
        wx.uploadFile({
          url: 'https://www.9pointstars.com/api/chat/create_img',
          filePath: res.tempFilePaths[0],
          name: 'image',
          success: function (res) {
            console.log(res.data)
            let arr = that.data.details_box
            let img_url = JSON.parse(res.data).path
            let add_time = that.getDateDiff(new Date().getTime() / 1000)
            sendSocketMessage({ scene: "chat","type": "say", "from_id": arr[0].id, "receive_id": arr[1].id, "msg_type": 2, "img_src": img_url })

            that.data.allContentList.push({ is_my: { add_time, img_src: img_url, msg_type: 2, ...arr[0] } });
            that.setData({
              allContentList: that.data.allContentList,
            })
            that.bottom();
          }
        })
      }
    })
  },
  bindKeyInput: function (e) {
    console.log(1)
    this.setData({
      inputValue: e.detail.value
    })
  },
  onHide: function () {
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    })
  },
  addImg: function () {
    this.setData({
      addImg: !this.data.addImg
    })

  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () {
    var that = this;
    setTimeout(() => {
      this.setData({
        scrollTop: 1000000
      })
    }, 300)
  },
  //显示表情
  showExpression(){
    this.setData({
      expressionHeight: '240'
    })
    
    this.bottom();
    
  },
  //隐藏表情
  hideExpression(){
    this.setData({
      expressionHeight: '0'
    })
  },
  //点击页面 隐藏表情框
  scrollClick(){
    this.hideExpression()
    // this.bottom()
  },
  //获取聊天信息
  getChatRecord(obj){
    var that = this;
    api.getJSON('api/chat/getUserInfo?from_id=' + obj.my_id + '&receive_id=' + obj.you_id, function (res) {
      console.log(res.data, '双方信息')
      if (res.data.status == 200) {
        that.setData({
          details_box: 　res.data.data,
          title: res.data.data[1].nickname
        })

        api.getJSON('api/chat/load?from_id=' + obj.my_id + '&receive_id=' + obj.you_id, function (res) {
          console.log(res.data, '聊天记录')
          if (res.data.status == 200) {
            let allContentList = []
            let time = 0
            res.data.data.ListMessage.forEach((item, index) => {
              allContentList[index] = {}
              allContentList[index].time = item.add_time
              if ((time + 60) >= 　item.add_time) {  //一分钟内的消息 不显示
                time = item.add_time
                item.add_time = 0
              } else {
                time = item.add_time
                item.add_time = that.getDateDiff(item.add_time)
              }
              if (item.msg_type == 1) {  //转换表情
                item.content = textToEmoji(item.content)
              }

              if (item.from_id == obj.my_id) {  //判断是在左边还是右边
                allContentList[index].is_my = Object.assign(item, that.data.details_box[0])
              } else {
                allContentList[index].is_ai = Object.assign(item, that.data.details_box[1])
              }
            })
            that.setData({ allContentList })
            that.bottom();
          }
        })
      }
    })
  },
  //监听滚动到顶部
  scrollUppper(e) {
    if(this.data.loading){ //加载中 禁止再次加载
      return
    }
    if (this.data.isScroll){
      var that = this
      // this.data.loading = true
      this.setData({
        loading: true
      })
      if (this.data.allContentList == 0) return

      let details_box = this.data.details_box
      api.getJSON('api/chat/getChatLog?from_id=' + details_box[0].id + '&receive_id=' + details_box[1].id + '&add_time=' + that.data.allContentList[0].time,
      function (res) {
        console.log(res.data, '加载聊天记录')
        if (res.data.status == 200) {
          if (res.data.data.length == 0){
            
            that.setData({
              isScroll: false
            })
            return
          }
          let allContentList = []
          let time = 0
          res.data.data.forEach((item, index) => {
            allContentList[index] = {}
            allContentList[index].time = item.add_time
            if ((time + 60) >= 　item.add_time) {  //两条信息间隔一分钟内的消息 不显示时间
              time = item.add_time
              item.add_time = 0
            } else {
              time = item.add_time
              item.add_time = that.getDateDiff(item.add_time)
            }
            if (item.msg_type == 1) {  //转换表情
              item.content = textToEmoji(item.content)
            }

            if (item.from_id == details_box[0].id) {  //判断是在左边还是右边
              allContentList[index].is_my = Object.assign(item, details_box[0])
            } else {
              allContentList[index].is_ai = Object.assign(item, details_box[1])
            }
          })
          allContentList = allContentList.concat(that.data.allContentList)
          
          that.setData({ allContentList})
          wx.createSelectorQuery().select('.history').boundingClientRect(function (rect) {
            console.log(rect.height, that.data.newheight)
            that.setData({
              scrollTop: rect.height - that.data.newheight,
              newheight: rect.height
            })
          }).exec(
            setTimeout(()=>{
              that.setData({
                loading: false
              })
            },1000)
          )
        }
        // that.data.loading = false
        // that.setData({
        //   loading: false
        // })
      })
    }
  },
  scroll_view: function (e) {
    // console.log(e)
    const { scrollTop, scrollHeight } = e.detail

    if (this.data.newheight == 0) {

      this.setData({
        newheight: scrollHeight
      })
    }
    //  else if (this.data.newheight != scrollHeight) {

    //   this.setData({
    //     newheight : scrollHeight
    //   })
    // }
  },
  //阅读消息
  readChat(obj){
    var that = this;
    if (obj.isread > 0){
      api.getJSON('api/chat/changeNoRead?from_id=' + obj.my_id + '&receive_id=' + obj.you_id + '&add_time=' + parseInt(new Date().getTime() / 1000),
      function (res) {
        console.log(res.data, '阅读')
        if (res.data.status == 200) {

        }
      })
    }
  },
  //图片预览
  preview({ target: { dataset:{url}}}){
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  //转换时间格式
  getDateDiff(dateTimeStamp) {
    var StampTime = new Date(dateTimeStamp * 1000)
    if (new Date().getDate() == StampTime.getDate()) {  //今天的时间
      return StampTime.getHours() + ':' + StampTime.getMinutes()
    } else if (new Date().getDate() - 1 == StampTime.getDate()) {  //昨天
      return '昨天 ' + StampTime.getHours() + ':' + StampTime.getMinutes()
    } else {
      return StampTime.getFullYear() + '年' + (StampTime.getMonth() + 1) + '月' + StampTime.getDate() + '日 ' +
      StampTime.getHours() + ':' + StampTime.getMinutes()
    }
  },
  //监听页面卸载事件
  onUnload(){
    this.setData({  //页面卸载关闭重连
      isBack:false
    })
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    })
  },
  //input 获取焦点
  inputFocus(e){
    console.log(e)
    this.setData({
      isFocus: true,
      inputBottom: e.detail.height
    })
    this.hideExpression()
    this.bottom();
  },
  //input 失去焦点
  inputBlur(){
    this.setData({
      isFocus: false,
      inputBottom: 0
    })
    this.bottom();
  }
})

//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg) {
  var that = this;
  console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
  SocketTask.send({
    data: JSON.stringify(msg) 
  }, function (res) {
    console.log('已发送', res)
  })
}
