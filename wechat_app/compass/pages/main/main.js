var app = getApp()
Page({
  data: {
    motto: 'Hello WeApp',
    userInfo: {}
  },
  onButtonTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  }
})
