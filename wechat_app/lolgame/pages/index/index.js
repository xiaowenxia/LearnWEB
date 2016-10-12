//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    token:null,
    area:null,
    game: []
  },
  onLoad: function() {
    var that = this
    var l_token = getApp().globalData.token
    this.setData({
      token: l_token
    })

    wx.request({
      url: 'http://lolapi.games-cube.com/Area',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": l_token
      },
      success: function(res) {
        app.globalData.area = res.data.data
        that.setData({
          area: res.data.data
        })
      }
    })

      wx.request({
        url: 'http://lolapi.games-cube.com/GetJudgement?flag=11',
        type: "GET",
        header: {
            "DAIWAN-API-TOKEN": l_token
        },
        success: function(res) {
          console.log("1")
          console.log(JSON.stringify(res))
        }
      })
      wx.request({
        url: 'http://lolapi.games-cube.com/GetJudgement?flag=12',
        type: "GET",
        header: {
            "DAIWAN-API-TOKEN": l_token
        },
        success: function(res) {
          console.log("2")
          console.log(JSON.stringify(res))
        }
      })
      wx.request({
        url: 'http://lolapi.games-cube.com/GetJudgement?flag=111',
        type: "GET",
        header: {
            "DAIWAN-API-TOKEN": l_token
        },
        success: function(res) {
          console.log("3")
          console.log(JSON.stringify(res))
        }
      })
      wx.request({
        url: 'http://lolapi.games-cube.com/GetJudgement?flag=14',
        type: "GET",
        header: {
            "DAIWAN-API-TOKEN": l_token
        },
        success: function(res) {
          console.log("4")
          console.log(JSON.stringify(res))
        }
      })
  }
  
})
