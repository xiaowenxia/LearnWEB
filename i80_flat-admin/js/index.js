
var echarts_satellite_track;
var echarts_position;
var echarts_satellite_map;
var echarts_storage;

var option_satellite_track;
var option_position;
var option_satellite_map;
var option_storage;

var data_satellite;

data_satellite = {
    sate: [],
    storage: {
        storage_inside: 2.87,
        storage_extern: 0,
        battery_inside: 80,
        battery_extern: 100
    },
    get_item: function(item){
        var i;
        var array_item = [];
        for(var i = 0; i < this.sate.length ; i++)
        {
            if(item == "name")
            {
                if('GPS' == this.sate[i].type)
                {

                    array_item.push(("G" + this.sate[i].index));
                }
                else if('GLONASS' == this.sate[i].type)
                    array_item.push("R" + this.sate[i].index);
                else if('BDS' == this.sate[i].type)
                    array_item.push("B" + this.sate[i].index);
                else if('SBAS' == this.sate[i].type)
                    array_item.push("S" + this.sate[i].index);
                else if('GALILEO' == this.sate[i].type)
                    array_item.push("E" + this.sate[i].index);
            }
            else if(item == "snr_L1")
                array_item.push(this.sate[i].snr_L1);
            else if(item == "snr_L2")
                array_item.push(this.sate[i].snr_L2);
            else if(item == "snr_L5")
                array_item.push(this.sate[i].snr_L5);
        }
        return array_item;
    },
    get_sate_position: function(sate){
        var data = [];
        for(var i = 0; i < this.sate.length ; i++){
            if(sate == this.sate[i].type)
                data.push([this.sate[i].radius,this.sate[i].angle]);
        }
        return data;
    },
    remove_member: function(member){
        var array_member = {
            sate: [],
            get_item: null
        };
        for(var i = 0; i < this.sate.length ; i++){
            if(member != this.sate[i].type)
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
            if(member == this.sate[i].type)
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

function satellite_info_create(type,index, radius, angle, snr_L1, snr_L2, snr_L5){
    this.index = index;
    this.type = type;
    this.radius = radius;
    this.angle = angle;
    this.snr_L1 = snr_L1;
    this.snr_L2 = snr_L2;
    this.snr_L5 = snr_L5;
    this.used = true;
}
data_satellite.sate.push(new satellite_info_create("GPS","6",5.4,360,42,22,0));
data_satellite.sate.push(new satellite_info_create("GPS","19",0.4,160,43,23,0));
data_satellite.sate.push(new satellite_info_create("GPS","28",7.4,60,47,32,0));
data_satellite.sate.push(new satellite_info_create("GPS","11",8.4,10,43,20,0));
data_satellite.sate.push(new satellite_info_create("GPS","17",3.4,230,45,29,0));
data_satellite.sate.push(new satellite_info_create("GPS","3",5.4,120,12,20,8));
data_satellite.sate.push(new satellite_info_create("GPS","22",3.4,76,54,28,0));
data_satellite.sate.push(new satellite_info_create("GPS","7",1.4,90,47,25,10));
data_satellite.sate.push(new satellite_info_create("GPS","3",8.4,180,12,20,8));
data_satellite.sate.push(new satellite_info_create("GLONASS","22",8.4,270,54,28,0));
data_satellite.sate.push(new satellite_info_create("GLONASS","7",8.4,240,47,25,10));
data_satellite.sate.push(new satellite_info_create("GLONASS","3",8.4,300,12,20,8));
data_satellite.sate.push(new satellite_info_create("GLONASS","22",7.0,307,54,28,0));
data_satellite.sate.push(new satellite_info_create("GLONASS","7",9.7,320,47,25,10));
data_satellite.sate.push(new satellite_info_create("BDS","6",7.4,310,42,22,12));
data_satellite.sate.push(new satellite_info_create("BDS","19",5.4,150,43,23,23));
data_satellite.sate.push(new satellite_info_create("BDS","28",7.4,155,47,32,32));
data_satellite.sate.push(new satellite_info_create("BDS","11",9.4,240,43,20,31));
data_satellite.sate.push(new satellite_info_create("BDS","17",5.4,140,45,29,35));
data_satellite.sate.push(new satellite_info_create("BDS","3",9.0,144,12,20,39));
data_satellite.sate.push(new satellite_info_create("BDS","22",2.4,168,54,28,32));
data_satellite.sate.push(new satellite_info_create("BDS","7",7.9,187,47,25,40));
data_satellite.sate.push(new satellite_info_create("SBAS","21",5.4,168,54,28,32));
data_satellite.sate.push(new satellite_info_create("SBAS","22",3.9,187,47,25,40));

option_satellite_track = {
    
    baseOption:{
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
        toolbox: {
            right:5,
            feature: {
                saveAsImage: {}
            }
        },
        legend: [
            {
                data:['L1/B1','L2/B2','L5/B3'],
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: data_satellite.get_item("name")
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        calculable:true,
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
            data: data_satellite.get_item("snr_L1"),
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
            data: data_satellite.get_item("snr_L2"),
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
            data: data_satellite.get_item("snr_L5"),
            label: {
                normal:{
                    show: true
                }
            }
        }]
    },
    media: [ // 这里定义了 media query 的逐条规则。
        {
            option: {
                legend: {
                    right: 'center',
                    top: 0,
                    orient: 'horizontal'
                }
            }
        },
        {
            query: {
                maxWidth: 768
            },   // 这里写规则。
            option: {       // 这里写此规则满足下的option。
                legend: {
                    top:20,
                    right:0,
                    orient:'horizontal',
                    align:"left"
                }
            }
        }
    ]
};

option_satellite_map = {
    baseOption: {
        update_data: function(sate_data){
            this.series[0].data = sate_data.get_sate_position("GPS");
            this.series[1].data = sate_data.get_sate_position("GLONASS");
            this.series[2].data = sate_data.get_sate_position("BDS");
            this.series[3].data = sate_data.get_sate_position("GALILEO");
            this.series[4].data = sate_data.get_sate_position("SBAS");
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
        toolbox: {
            feature: {
                saveAsImage: {}
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
    },
    media: [
        {
            option: {
                legend: {
                    top: 0,
                    right: "center",
                    orient: 'horizontal'
                }
            }
        },
        {
            query: {
                maxWidth:768
            },
            option: {
                legend: {
                    top:20,
                    right: 0,
                    orient: "horizontal"
                }
            }
        }
    ]
};


option_storage = {
    baseOption: {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '内部存储',
                type: 'gauge',
                detail: {formatter:'{value}%'},
                center : ['25%', '50%'],    // 默认全局居中
                radius: '100%',
                startAngle: 180,
                endAngle:0,
                axisLine: {
                    lineStyle: {
                        width:20
                    }
                },
                splitLine: {
                    length:20
                },
                pointer: {
                    width:4
                },
                title: {
                    textStyle: {
                        fontSize:10
                    }
                },
                data: [{value: data_satellite
                .storage.storage_inside, name: '内部存储'}]
            },
            {
                name: '电池电量',
                type: 'gauge',
                center : ['50%', '50%'],    // 默认全局居中
                radius: '100%',
                detail: {formatter:'{value}%'},
                startAngle: 180,
                endAngle:0,
                axisLine: {
                    lineStyle: {
                        width:20
                    }
                },
                splitLine: {
                    length:20
                },
                pointer: {
                    width:4
                },
                title: {
                    textStyle: {
                        fontSize:10
                    }
                },
                data: [{value: data_satellite
                .storage.battery_inside, name: '电池电量'}]
            },
            {
                name: '外部存储',
                type: 'gauge',
                center : ['75%', '50%'],    // 默认全局居中
                radius: '100%',
                detail: {formatter:'{value}%'},
                startAngle: 180,
                endAngle:0,
                axisLine: {
                    lineStyle: {
                        width:20
                    }
                },
                splitLine: {
                    length:20
                },
                pointer: {
                    width:4
                },
                title: {
                    textStyle: {
                        fontSize:10
                    }
                },
                data: [{value: data_satellite
                .storage.storage_extern, name: '外部存储'}]
            }
        ]
    },
    media: [
        {
            option: {
            }
        },
        {
            query: {
                maxWidth:768
            },
            option: {
                series: [
                    {
                    },
                    {
                    },
                    {
                    }
                ]
            }
        }
    ]
};

$(function(){
    $("#sate_hidden button").click(function(){
        data_satellite.remove_member(this.value);
    });
    
    $("#sate_checkbox input").bootstrapSwitch();
    echarts_satellite_track = echarts.init(document.getElementById('canvas_satellite_track'));
    echarts_satellite_track.setOption(option_satellite_track);

    echarts_satellite_map = echarts.init(document.getElementById('canvas_satellite_map'));
    option_satellite_map.baseOption.update_data(data_satellite);
    echarts_satellite_map.setOption(option_satellite_map);

    echarts_storage = echarts.init(document.getElementById('canvas_storage'));
    echarts_storage.setOption(option_storage, true);
});

$(function(){
	$(".card").click(function(){
    	$(".card .card-second").slideDown("fast");
    	$(".card .card-first").css("display","none");
    });
});