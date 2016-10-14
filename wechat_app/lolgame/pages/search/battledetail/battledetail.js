//获取应用实例
var app = getApp()
var date = require('../../../utils/util.js')
Page({
  data:{
    select: ["select", "",""],
    display:["display","hidden","hidden"],
    game_time: {
      "days": 0,
      "hours": 0,
      "minutes": 0,
      "seconds": 0
    }
  },
  
  onReady: function() {
    wx.setNavigationBarTitle({
      title: "战绩详情"
    })
  },
  //计算小时数后剩余的毫秒数
  cal_minute(date1, date2) {
    var date3 = date2.getTime()-date1.getTime()  //时间差的毫秒数
    //计算出相差天数
    var days=Math.floor(date3/(24*3600*1000))
    //计算出小时数
    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000))
    //计算相差分钟数
    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000))
    //计算相差秒数
    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000)

    that.setData({
      game_time.days: days,
      game_time.hours: hours,
      game_time.days: days,
      game_time.days: days,
    })
    console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      qquin: options.qquin,
      area_id: options.area_id,
      token: app.globalData.token,
      game_id: options.game_id,
      area: app.globalData.area,
      battle_flag: app.globalData.battle_flag
    })
    
    wx.request({
      url: 'http://lolapi.games-cube.com/GameDetail?qquin='+this.data.qquin+'&vaid='+this.data.area_id+'&gameid='+this.data.game_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          game_detail: res.data.data[0].battle,
          start_time: res.data.data[0].battle.start_time.split(' ')[1],
          //game_time: date.stringToDate(res.data.data[0].battle.start_time)
        })
      }
    })
  }
  
})
