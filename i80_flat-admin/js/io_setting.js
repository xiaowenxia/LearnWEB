$(function(){
    var t1 = $("#form1").gridform({
        /* unique name of the form */
        'name': 'form1', 
        /* fields of the form */
        'fields': {
            '1_1' : {
            	'id'        : 'auto_connect',
            	'label'     : '开机自动连接',
            	'type'      : 'boolean',
            	'width'     : '150px'
            },
            '2_1' : {
                'id'        : 'protocol',
                'label'     : '连接协议',
                'type'      : 'select',
                'width'     : '150px',
                'selection' : [{key : 1,value : 'TCP'}, {key : 2,value : 'UDP'}, {key : 3,value : 'Ntrip Server'}]
            },
            '3_1' : {
            	'id'        : 'port',
            	'label'     : '端口号',
            	'type'      : 'string',
            	'width'     : '150px',
                'placeholder' : '端口号',
            	'maxLength' : 5
            },
            '4_1' : {
            	'id'        : 'data_diff',
            	'label'     : '差分数据',
            	'type'      : 'select',
            	'width'     : '150px',
                'selection' : [{key : 1,value : '关闭'}, 
                               {key : 2,value : 'CMR'}, 
                               {key : 3,value : 'CMR2'}, 
                               {key : 4,value : 'TRIMBER'}, 
                               {key : 5,value : 'TRIMBER'}]
            },
            '5_1' : {
            	'id'        : 'data_raw',
            	'label'     : '原始数据',
            	'type'      : 'select',
            	'width'     : '150px',
                'selection' : [{key : 1,value : '关闭'}, 
                               {key : 2,value : '10HZ'}, 
                               {key : 3,value : '5HZ'}, 
                               {key : 4,value : '2HZ'}, 
                               {key : 5,value : '1S'}]
            },
            '6_1' : {
                'id'        : 'data_hcppp',
                'label'     : 'HCPPP数据',
                'type'      : 'select',
                'width'     : '150px',
                'selection' : [{key : 1,value : '关闭'}, 
                               {key : 2,value : '10HZ'}, 
                               {key : 3,value : '5HZ'}, 
                               {key : 4,value : '2HZ'}, 
                               {key : 5,value : '1S'}]
            },
            '7_1' : {
                'id'        : 'data_hrc',
                'label'     : 'HRC数据',
                'type'      : 'select',
                'width'     : '150px',
                'selection' : [{key : 1,value : '关闭'}, 
                               {key : 2,value : '10HZ'}, 
                               {key : 3,value : '5HZ'}, 
                               {key : 4,value : '2HZ'}, 
                               {key : 5,value : '1S'}]
            },
            '8_1' : {
                'id'        : 'data_nmae',
                'label'     : 'NMEA数据',
                'type'      : 'select',
                'width'     : '150px',
                'selection' : [{key : 1,value : 'GPGGA'}, 
                               {key : 2,value : 'GPGSA'}, 
                               {key : 3,value : 'GPGSV'}, 
                               {key : 4,value : 'GPRMI'}, 
                               {key : 5,value : 'GPCMR'}]
            },
            '8_2' : {
                'id'        : 'data_nmae_frq',
                'label'     : '频率设置',
                'type'      : 'select',
                'width'     : '150px',
                'selection' : [{key : 1,value : '关闭'}, 
                               {key : 2,value : '10HZ'}, 
                               {key : 3,value : '5HZ'}, 
                               {key : 4,value : '2HZ'}, 
                               {key : 5,value : '1S'}]
            },
            '9_1' : {
                'id'        : 'data_route',
                'label'     : '数据转发',
                'type'      : 'select',
                'width'     : '150px',
                'selection' : [{key : 1,value : 'RTK'}, 
                               {key : 2,value : 'GPGSA'}, 
                               {key : 3,value : 'GPGSV'}, 
                               {key : 4,value : 'GPRMI'}, 
                               {key : 5,value : 'GPCMR'}]
            },
            '9_2' : {
                'id'        : 'data_route_frq',
                'label'     : '频率设置',
                'type'      : 'select',
                'width'     : '150px',
                'selection' : [{key : 1,value : '关闭'}, 
                               {key : 2,value : '10HZ'}, 
                               {key : 3,value : '5HZ'}, 
                               {key : 4,value : '2HZ'}, 
                               {key : 5,value : '1S'}]
            }
        }
    });
    /* Render the form */
    t1.render();
    /* or (if you want to access it directly) */
    gridform.forms['form1'].render();
});