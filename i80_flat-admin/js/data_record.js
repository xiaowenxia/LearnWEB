function record_info_create(type,index, radius, angle, snr_L1, snr_L2, snr_L5){
    this.index = index;
    this.type = type;
    this.radius = radius;
    this.angle = angle;
    this.snr_L1 = snr_L1;
    this.snr_L2 = snr_L2;
    this.snr_L5 = snr_L5;
    this.used = true;
}

$(function() {
	record_table = $('.datatable').DataTable({
		"dom": '<"top"<"clear">>rt<"bottom"ip<"clear">>',
		"order": [[ 1, "desc" ]],
		// "paging":false,
		// "ordering":false,
		//"autoWidth": false,
		"scrollX": true,
		"lengthMenu": [ [-1, 25, 50, 100], ["ALL", 25, 50, 100] ],
		"deferRender": true,
		"language": {
	     	"decimal":        "",
		    "emptyTable":     "没有数据",
		    "info":           "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条",
		    "infoEmpty":      "表中无数据存在",
		    "infoFiltered":   "(filtered from _MAX_ total entries)",
		    "infoPostFix":    "",
		    "thousands":      ",",
		    "lengthMenu":     "Show _MENU_ entries",
		    "loadingRecords": "加载中...",
		    "processing":     "处理中...",
		    "search":         "搜索:",
		    "zeroRecords":    "没有匹配项",
		    "paginate": {
		        "first":      "第一页",
		        "last":       "最后一页",
		        "next":       "下一页",
		        "previous":   "上一页"
		    },
		    "aria": {
		        "sortAscending":  ": activate to sort column ascending",
		        "sortDescending": ": activate to sort column descending"
		    }
	    }
	});

	/* 高亮选中行 */
	$('.datatable tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );

	var record_info = {
		record: []
	};

	
	//var data_satellite.get_number();
	for(var i=0; i<data_satellite.sate.length; i++)
	{
		sate_table.row.add( [
			data_satellite.sate[i].index,
	        data_satellite.sate[i].type,
	         
	        data_satellite.sate[i].radius,
	        data_satellite.sate[i].angle,
	        data_satellite.sate[i].snr_L1,
	        data_satellite.sate[i].snr_L2,
	        data_satellite.sate[i].snr_L5,
	        data_satellite.sate[i].used==true?"是":"否"
	    ] ).draw();
	}
});