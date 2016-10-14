//app.js
App({
    get_battle_flag: function(){
        var that = this
        wx.request({
            url: 'http://lolapi.games-cube.com/GetJudgement?flag='+this.globalData.idx,
            type: "GET",
            header: {
              "DAIWAN-API-TOKEN": this.globalData.token
            },
            success: function(res) {
                //console.log(that.globalData.idx)
                //console.log(JSON.stringify(res.data.data))
                that.globalData.battle_flag[that.globalData.idx] = (res.data.data[0].return)
                that.globalData.idx ++
                if(that.globalData.idx == 50) return
                that.get_battle_flag()
            }
        })
    },
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
        this.get_battle_flag()
    },
    globalData: {
    token: "D400B-5B07A-C4A0D-5C07C",
    area: null,
    search_result: null,
    idx: 1,
    battle_flag: []
    }
})
