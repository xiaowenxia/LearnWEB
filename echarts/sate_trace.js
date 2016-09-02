var SATE_TRACE_DATA(sate_type, sate_snr, sate_L){
    this.type = sate_type;
    this.snr  = sate_snr;
    this.L    = sate_L;
}

var my_echarts=echarts.init(document.getElementById('main'));
// 指定图表的配置项和数据
var option = {
    title: {
        text: '卫星跟踪图'
    },
    tooltip: {},
    legend: {
        data:['L1','L2','L5']
    },
    xAxis: {
        data: ["C1","C2","C3","G1","G12","G22"]
    },
    yAxis: {},
    series: [
    {
        name: 'L1',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
        label: {
            normal:{
                show: true
            }
        }
    },
    {
        name: 'L2',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
        label: {
            normal:{
                show: true
            }
        }
    },
    {
        name: 'L5',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
        label: {
            normal:{
                show: true
            }
        }
    }
    ]
};

// 使用刚指定的配置项和数据显示图表。
my_echarts.setOption(option);