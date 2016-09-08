var echarts_satellite_track;
var echarts_position;
var echarts_satellite_map;

var option_satellite_track;
var option_position;
var option_satellite_map;

var data_satellite_track;

data_satellite_track = {
    sate: [],
    position: [],
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
    },
    get_position: function(member){
        var array_position = [];
        for(var i = 0; i < this.sate.length ; i++){
            if(member == this.sate[i].name.charAt(0))
                array_position.push(this.position[i]);
        }
        return array_position;
    },
    get_number: function(member){
        var array_name = [];
        for(var i = 0; i < this.sate.length ; i++){
            if(member == this.sate[i].name.charAt(0))
                array_name.push(this.sate[i].name.substr(1,10));
        }
        return array_name;
    }

};
function satellite_info_cteate(name, snr_L1, snr_L2, snr_L5){
    this.name = name;
    this.snr_L1 = snr_L1;
    this.snr_L2 = snr_L2;
    this.snr_L5 = snr_L5;
}
function satellite_position_cteate(radius, angle){
    this.radius = radius;
    this.angle = angle;
}

data_satellite_track.sate.push(new satellite_info_cteate("G6",42,22,0));
data_satellite_track.position.push([5.4, 360]);
data_satellite_track.sate.push(new satellite_info_cteate("G19",43,23,0));
data_satellite_track.position.push([0.4, 160]);
data_satellite_track.sate.push(new satellite_info_cteate("G28",47,32,0));
data_satellite_track.position.push([7.4,  60]);
data_satellite_track.sate.push(new satellite_info_cteate("G11",43,20,0));
data_satellite_track.position.push([8.4,  10]);
data_satellite_track.sate.push(new satellite_info_cteate("G17",45,29,0));
data_satellite_track.position.push([3.4, 230]);
data_satellite_track.sate.push(new satellite_info_cteate("G3",12,20,8));
data_satellite_track.position.push([5.4, 120]);
data_satellite_track.sate.push(new satellite_info_cteate("G22",54,28,0));
data_satellite_track.position.push([3.4,  76]);
data_satellite_track.sate.push(new satellite_info_cteate("G7",47,25,10));
data_satellite_track.position.push([1.4,  90]);
data_satellite_track.sate.push(new satellite_info_cteate("G3",12,20,8));
data_satellite_track.position.push([8.4, 180]);
data_satellite_track.sate.push(new satellite_info_cteate("R22",54,28,0));
data_satellite_track.position.push([8.4, 270]);
data_satellite_track.sate.push(new satellite_info_cteate("R7",47,25,10));
data_satellite_track.position.push([8.4, 240]);
data_satellite_track.sate.push(new satellite_info_cteate("R3",12,20,8));
data_satellite_track.position.push([8.4,  300]);
data_satellite_track.sate.push(new satellite_info_cteate("R22",54,28,0));
data_satellite_track.position.push([7.0,  307]);
data_satellite_track.sate.push(new satellite_info_cteate("R7",47,25,10));
data_satellite_track.position.push([9.7,  320]);
data_satellite_track.sate.push(new satellite_info_cteate("C6",42,22,12));
data_satellite_track.position.push([7.4,  310]);
data_satellite_track.sate.push(new satellite_info_cteate("C19",43,23,23));
data_satellite_track.position.push([5.4,  150]);
data_satellite_track.sate.push(new satellite_info_cteate("C28",47,32,32));
data_satellite_track.position.push([7.4,  155]);
data_satellite_track.sate.push(new satellite_info_cteate("C11",43,20,31));
data_satellite_track.position.push([9.4,  240]);
data_satellite_track.sate.push(new satellite_info_cteate("C17",45,29,35));
data_satellite_track.position.push([5.4,  140]);
data_satellite_track.sate.push(new satellite_info_cteate("C3",12,20,39));
data_satellite_track.position.push([9.0,  144]);
data_satellite_track.sate.push(new satellite_info_cteate("C22",54,28,32));
data_satellite_track.position.push([2.4,  168]);
data_satellite_track.sate.push(new satellite_info_cteate("C7",47,25,40));
data_satellite_track.position.push([7.9,  187]);

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
        this.series[0].data = sate_data.get_position('G');
        this.series[0].number = sate_data.get_number('G');

        this.series[1].data = sate_data.get_position('R');
        this.series[1].number = sate_data.get_number('R');

        this.series[2].data = sate_data.get_position('C');
        this.series[2].number = sate_data.get_number('C');

        this.series[3].data = sate_data.get_position('E');
        this.series[3].number = sate_data.get_number('E');

        this.series[4].data = sate_data.get_position('S');
        this.series[4].number = sate_data.get_number('S');
    },
    title: {
        text: '星空图'
    },
    legend: {
        data: ['GPS','GLONASS','BDS','GALILEO','SBAS']
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
    series: [
        {
            coordinateSystem: 'polar',
            name: 'GPS',
            type: 'scatter',
            symbolSize: 30,
            label: {
                normal: {
                    show: true,
                }
            },
            itemStyle: {
                normal: {
                    color: 'blue'
                }
            },
            data: []
        },
        {
            coordinateSystem: 'polar',
            name: 'GLONASS',
            type: 'scatter',
            symbolSize: 30,
            label: {
                normal: {
                    show: true,
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow'
                }
            },
            data: []
        },
        {
            coordinateSystem: 'polar',
            name: 'BDS',
            type: 'scatter',
            symbolSize: 30,
            label: {
                normal: {
                    show: true,
                }
            },
            itemStyle: {
                normal: {
                    color: '#ff5400'
                }
            },
            data: []
        },
        {
            coordinateSystem: 'polar',
            name: 'GALILEO',
            type: 'scatter',
            symbolSize: 30,
            label: {
                normal: {
                    show: true,
                }
            },
            itemStyle: {
                normal: {
                    color: 'red'
                }
            },
            data: []
        },
        {
            coordinateSystem: 'polar',
            name: 'SBAS',
            type: 'scatter',
            symbolSize: 30,
            label: {
                normal: {
                    show: true,
                }
            },
            itemStyle: {
                normal: {
                    color: 'green'
                }
            },
            data:[]
        }
    ]
};

option_position = {
    title: {
        text: '当前位置',
        left: 'center',
        textStyle: {
            color: "#f9c763"
        }
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data:[]
    },
    geo: {
        map: 'china',
        label: {
            normal: {
                show: true
            },
            emphasis: {
                show: true
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#808182',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [
        {
            name: '中国地图',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
                brushType: 'fill'
            },
            label: {
                normal: {
                    show: true,
                    color: "red",
                    position: "top",
                    textStyle: {
                        color: "yellow"
                    },
                    formatter: "{c}"
                },
                emphasis: {
                    show: true
                },

            },
            symbolSize: 20,
            data:[
                {name: '上海',value: [121.48,31.22] }
            ]
        }
        
    ]
};

$(function(){
    $("#tab_content_track .btn-group button").click(function(){
        data_satellite_track.remove_member(this.value);
    });

    echarts_position = echarts.init(document.getElementById("canvas_position"));
    echarts_position.setOption(option_position);

    echarts_satellite_track = echarts.init(document.getElementById('canvas_satellite_track'));
    echarts_satellite_track.setOption(option_satellite_track);

    echarts_satellite_map = echarts.init(document.getElementById('canvas_satellite_map'));
    option_satellite_map.update_data(data_satellite_track);
    echarts_satellite_map.setOption(option_satellite_map);
});