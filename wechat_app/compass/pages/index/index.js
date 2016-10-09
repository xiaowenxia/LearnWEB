//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    rotate:100,
    degree:0
  },
  //事件处理函数
  bindViewTap: function() {
    console.log("fdsafd")
    var xxx = this.data.degree
    this.setData({
        rotate:xxx
      })
    xxx += 10;
    this.setData({
      degree:xxx
    })
  },
  onLoad: function () {
    console.log('onLoad')
    wx.onCompassChange(function (res) {
      console.log(res.direction)
      this.setData({
        rotate:res.direction
      })
    })
  }
  
})
