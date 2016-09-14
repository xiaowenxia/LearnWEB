
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
                areaColor: 'yellow',
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
    echarts_position = echarts.init(document.getElementById("map_local"));
    echarts_position.setOption(option_position);

    
});