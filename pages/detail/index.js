var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    attrList: [], // 清单列表
    skuBeanList: [], // 存库列表
    infoText: "请点击获取属性，获取详细",
  },

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

  onLoad: function () {
    var that = this
    api.getJSON('api/goods/detail?goods_id=57', function (res) {
      that.setData({

          'attrList':res.data.data.attrList,
          'skuBeanList':res.data.data.skuBeanList

      })

       // sku算法初始化数据
        that.onData();

    })
    

   
  }
})
