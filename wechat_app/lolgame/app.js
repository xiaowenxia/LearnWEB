//app.js
App({
  onLaunch: function () {
    // //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.request({
    //   url: 'http://lolapi.games-cube.com/Free',
    //   type: "GET",
    //   header: {
    //       "DAIWAN-API-TOKEN": "42208-5E02E-5122E-10919"
    //   },
    //   success: function(res) {
    //     console.log(JSON.stringify(res))
    //   }
    // })
    
  },
  globalData: {
    token: "431DD-3D793-13200-97723",
    area: null,
    search_result: null
  }
})
