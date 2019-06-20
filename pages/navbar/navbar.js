Component({
  /* 组件的属性列表 */
  properties: {
    title: {			// 设置标题
      type: String,
      value: ''
    },
    show_bol: {			// 控制返回箭头是否显示
      type: Boolean,
      value: true
    },
    my_class: {			// 控制样式
      type: Boolean,
      value: false
    }
  },
  /* 组件的初始数据 */
  data: {
    type: "组件",
    bar_Height: wx.getSystemInfoSync().statusBarHeight		// 获取手机状态栏高度
  },
  /* 组件的方法列表 */
  methods: {
    goBack: function () {					// 返回事件
      console.log("退后")
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})
