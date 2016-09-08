var echarts_satellite_track;
var option_satellite_track;
var data_satellite_track;

var echarts_satellite_map;
var option_satellite_map;
var data_satellite_map;

function satellite_info_cteate(name, snr_L1, snr_L2, snr_L5){
    this.name = name;
    this.snr_L1 = snr_L1;
    this.snr_L2 = snr_L2;
    this.snr_L5 = snr_L5;
}

data_satellite_track = {
    sate: [],
    get_item: function(item){
        var i;
        var array_item = [];
        for(var i = 0; i < this.sate.length ; i++)
        {
            if(item == "name")
                array_item.push(this.sate[i].name);
            else if(item == "snr_L1")
                array_item.push(this.sate[i].snr_L1);
            else if(item == "snr_L2")
                array_item.push(this.sate[i].snr_L2);
            else if(item == "snr_L5")
                array_item.push(this.sate[i].snr_L5);
        }
        return array_item;
    },
    remove_member: function(member){
        var array_member = {
            sate: [],
            get_item: null
        };
        for(var i = 0; i < this.sate.length ; i++){
            if(member != this.sate[i].name.charAt(0))
                array_member.sate.push(this.sate[i]);
        }
        array_member.get_item = this.get_item;
        option_satellite_track.update_data(array_member);
        echarts_satellite_track.clear();
        echarts_satellite_track.setOption(option_satellite_track);
        //return array_member;
    }
};
function satellite_info_cteate(name, snr_L1, snr_L2, snr_L5){
    this.name = name;
    this.snr_L1 = snr_L1;
    this.snr_L2 = snr_L2;
    this.snr_L5 = snr_L5;
}
data_satellite_track.sate.push(new satellite_info_cteate("G6",42,22,0));
data_satellite_track.sate.push(new satellite_info_cteate("G19",43,23,0));
data_satellite_track.sate.push(new satellite_info_cteate("G28",47,32,0));
data_satellite_track.sate.push(new satellite_info_cteate("G11",43,20,0));
data_satellite_track.sate.push(new satellite_info_cteate("G17",45,29,0));
data_satellite_track.sate.push(new satellite_info_cteate("G3",12,20,8));
data_satellite_track.sate.push(new satellite_info_cteate("G22",54,28,0));
data_satellite_track.sate.push(new satellite_info_cteate("G7",47,25,10));
data_satellite_track.sate.push(new satellite_info_cteate("G3",12,20,8));
data_satellite_track.sate.push(new satellite_info_cteate("R22",54,28,0));
data_satellite_track.sate.push(new satellite_info_cteate("R7",47,25,10));
data_satellite_track.sate.push(new satellite_info_cteate("R3",12,20,8));
data_satellite_track.sate.push(new satellite_info_cteate("R22",54,28,0));
data_satellite_track.sate.push(new satellite_info_cteate("R7",47,25,10));
data_satellite_track.sate.push(new satellite_info_cteate("C6",42,22,12));
data_satellite_track.sate.push(new satellite_info_cteate("C19",43,23,23));
data_satellite_track.sate.push(new satellite_info_cteate("C28",47,32,32));
data_satellite_track.sate.push(new satellite_info_cteate("C11",43,20,31));
data_satellite_track.sate.push(new satellite_info_cteate("C17",45,29,35));
data_satellite_track.sate.push(new satellite_info_cteate("C3",12,20,39));
data_satellite_track.sate.push(new satellite_info_cteate("C22",54,28,32));
data_satellite_track.sate.push(new satellite_info_cteate("C7",47,25,40));

option_satellite_track = {
    update_data: function(sate_data){
        this.xAxis[0].data = sate_data.get_item("name");
        this.series[0].data = sate_data.get_item("snr_L1");
        this.series[1].data = sate_data.get_item("snr_L2");
        this.series[2].data = sate_data.get_item("snr_L5");
    },
    title: {
        text: '卫星跟踪图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: [
        {
            data:['L1/B1','L2/B2','L5/B3'],
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
        },
        {
            data:['L1/B1','L2/B2','L5/B3'],
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
        }
    ],
    xAxis: [
        {
            type: 'category',
            data: data_satellite_track.get_item("name")
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
    {
        name: 'L1/B1',
        type: 'bar',
        itemStyle:{
            normal: {
                color: "#fc0f22",
                barBorderRadius: [5, 5, 0 ,0]
            }
        },
        markPoint: {
            symbolOffset: [0, "100%"]
        },
        data: data_satellite_track.get_item("snr_L1"),
        label: {
            normal:{
                show: true
            }
        }
    },
    {
        name: 'L2/B2',
        type: 'bar',
        itemStyle:{
            normal: {
                color: "#fcef00",
                barBorderRadius: [5, 5, 0 ,0]
            }
        },
        data: data_satellite_track.get_item("snr_L2"),
        label: {
            normal:{
                show: true
            }
        }
    },
    {
        name: 'L5/B3',
        type: 'bar',
        itemStyle:{
            normal: {
                color: "#1500ff",
                barBorderRadius: [5, 5, 0 ,0]
            }
        },
        data: data_satellite_track.get_item("snr_L5"),
        label: {
            normal:{
                show: true
            }
        }
    }
    ]
};
option_satellite_map = {
    update_data: function(sate_data){
        this.xAxis[0].data = sate_data.get_item("name");
        this.series[0].data = sate_data.get_item("snr_L1");
    },
    title: {
        text: '极坐标双数值轴'
    },
    legend: {
        data: ['line']
    },
    polar: {},
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    angleAxis: {
        type: 'value',
        startAngle: 0
    },
    radiusAxis: {
    },
    series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        data: data_satellite_map
    }]
};
$(function(){
    $("#tab_satellite_track .btn-group button").click(function(){
        data_satellite_track.remove_member(this.value);
    });
    echarts_satellite_track = echarts.init(document.getElementById('canvas_satellite_track'));
    // 指定图表的配置项和数据
    

    // 使用刚指定的配置项和数据显示图表。
    echarts_satellite_track.setOption(option_satellite_track);

    echarts_satellite_map = echarts.init(document.getElementById('canvas_satellite_map'));

    data_satellite_map = [];

    for (var i = 0; i <= 100; i++) {
        var theta = i / 100 * 360;
        var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
        data_satellite_map.push([r, theta]);
    }

    // 使用刚指定的配置项和数据显示图表。
    echarts_satellite_map.setOption(option_satellite_map);
});