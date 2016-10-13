//获取应用实例
var app = getApp()
Page({
  data:{
    select: ["select", "",""],
    display:["display","hidden","hidden"],
    division_name: [
    "最强王者","璀璨钻石","华贵铂金","荣耀黄金","不屈白银","英勇黄铜","超凡大师"
    ],
    game_type: [
    {"name":"未知比赛类型"},
    {"name":"自定义"},
    {"name":"新手关"},
    {"name":"匹配赛"},
    {"name":"排位赛"},
    {"name":"战队赛"},
    {"name":"大乱斗"},
    {"name":"人机"},
    {"name":"统治战场"},
    {"name":"大对决"},
    {"name":"未知比赛类型"},
    {"name":"克隆赛"},
    {"name":"未知比赛类型"},
    {"name":"未知比赛类型"},
    {"name":"无限火力"},
    {"name":"镜像赛"},
    {"name":"末日赛"},
    {"name":"飞升赛"},
    {"name":"六杀丛林"},
    {"name":"魄罗乱斗"},
    {"name":"互选征召"},
    {"name":"佣兵战"},
    {"name":"未知比赛类型"},
    {"name":"未知比赛类型"},
    {"name":"无限乱斗"}],
    win: {
      "name":["未定义","胜利","失败"],
      "color":["red","green","red"]
    },
    division_position: ["I","II","III","IV","V"]
  },
  selectNav: function(event){
    var index = parseInt(event.target.dataset.index);
    var sel = ["","",""]
    var dis = ["hidden","hidden","hidden"]
    sel[index] = "select"
    dis[index] = "display"
    this.setData({
      select:sel,
      display:dis
    })
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.area[this.data.area_id-1].name
    })
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      qquin: options.qquin,
      area_id: options.area_id,
      token: app.globalData.token,
      area: app.globalData.area,
      battle_flag: app.globalData.battle_flag
    })
    
    wx.request({
      url: 'http://lolapi.games-cube.com/UserHotInfo?qquin='+this.data.qquin+'&vaid='+this.data.area_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          user_hot_info: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/UserExtInfo?qquin='+this.data.qquin+'&vaid='+this.data.area_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          user_ext_info: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/CombatList?qquin='+this.data.qquin+'&vaid='+this.data.area_id+'&p=0',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          combat_list: res.data.data
        })
      }
    })
    
    
  }
  
})
