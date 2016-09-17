var sate_table;
$(function() {
	sate_table = $('.datatable').DataTable({
		"dom": '<"top"fl<"clear">>rt<"bottom"ip<"clear">>'
	});

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