//获取应用实例
var app = getApp()
Page({
  data:{
    select: ["select", "",""],
    display:["display","hidden","hidden"]
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
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg);
  },
  canvasDraw: function(){
    //使用wx.createContext获取绘图上下文context
    var context = wx.createContext();

    context.setStrokeStyle("#00ff00");
    context.setLineWidth(5);
    context.rect(0,0,200,200);
    context.stroke()
    context.setStrokeStyle ("#ff0000") ;
    context.setLineWidth (2)
    context.moveTo(160,100)
    context.arc(100,100,60,0,2*Math.PI,true);
    context.moveTo(140,100);
    context.arc(100,100,40,0,Math.PI,false);
    context.moveTo(85,80);
    context.arc(80,80,5,0,2*Math.PI,true);
    context.moveTo(125,80);
    context.arc(120,80,5,0,2*Math.PI,true);
    context.stroke();

    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'firstCanvas',
      actions: context.getActions() //获取绘图动作数组
    });
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.area[this.data.area_id-1].name
    })
    this.canvasDraw()
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      token: app.globalData.token,
      area: app.globalData.area,
      battle_flag: app.globalData.battle_flag,
      division_name: app.globalData.division_name,
      division_position: app.globalData.division_position,
      game_type: app.globalData.game_type,
      win: app.globalData.win
    })
    
    if(options.qquin && options.area_id)
    {
      console.log("this is search user info")
      this.setData({
        qquin: options.qquin,
        area_id: options.area_id
      })
    }
    else
    {
      console.log("this is default user info")
      this.setData({
        qquin: app.globalData.user_default.qquin,
        area_id: app.globalData.user_default.area_id
      })
    }
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
