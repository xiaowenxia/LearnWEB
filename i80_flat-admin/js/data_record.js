function record_info_create(index, name, state, open){
    this.index = index;
    this.name = name;
    this.state = state;
    this.open = open;
}
var record_info = {
		record: []
};

record_info.record.push(new record_info_create(1,"record1",true,true));
record_info.record.push(new record_info_create(2,"record2",false,true));
record_info.record.push(new record_info_create(3,"record3",true,false));
record_info.record.push(new record_info_create(4,"record4",false,false));
record_info.record.push(new record_info_create(5,"record5",true,true));
record_info.record.push(new record_info_create(6,"record6",true,true));

function ftp_info_create(index, ip, repo, description){
    this.index = index;
    this.ip = ip;
    this.repo = repo;
    this.description = description;
}
var ftp_info = {
		ftp: []
};

ftp_info.ftp.push(new ftp_info_create(1,"192.168.3.72","/repo/first","ftp server 1"));
ftp_info.ftp.push(new ftp_info_create(2,"192.168.3.73","/repo/second","ftp server 2"));
ftp_info.ftp.push(new ftp_info_create(3,"192.168.3.74","/repo/third","ftp server 3"));


$(function() {
	record_table = $('#id_record_table').DataTable({
		"dom": '<"top"<"clear">>rt<"bottom"ip<"clear">>',
		//"order": [[ 0, "insc" ]],
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

	ftp_setting_table = $('#id_ftp_setting_table').DataTable({
		"dom": '<"top"<"clear">>rt<"bottom"ip<"clear">>',
		"order": [[ 0, "desc" ]],
		// "paging":false,
		// "ordering":false,
		//"autoWidth": false,
		//"scrollX": true,
		"lengthMenu": [ [-1, 25, 50, 100], ["ALL", 25, 50, 100] ],
		//"deferRender": true,
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
	$('#id_record_table tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            record_table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

	/* 高亮选中行 */
	$('#id_ftp_setting_table tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            ftp_setting_table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

	//var data_satellite.get_number();
	for(var i=0; i<record_info.record.length; i++)
	{
		var open = record_info.record[i].open == true?"checked":" ";
		record_table.row.add( [
			record_info.record[i].index,
	        record_info.record[i].name,
	        '<input type="checkbox" data-switch-value="mini" data-size="small" data-on-color="success" data-off-color="danger"' + open +'>',
	        record_info.record[i].state==true?"正在记录":"未记录",
	    ] ).draw();
	}

	for(var i=0; i<ftp_info.ftp.length; i++)
	{
		ftp_setting_table.row.add( [
			ftp_info.ftp[i].index,
	        ftp_info.ftp[i].ip,
	        ftp_info.ftp[i].repo,
	        ftp_info.ftp[i].description,
	    ] ).draw();
	}
  	$("input[type='checkbox']").bootstrapSwitch();
});