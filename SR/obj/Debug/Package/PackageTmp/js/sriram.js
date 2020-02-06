function build_table_from_array(table_id, data, login_emp_sno, emp_roll) {

	for (i = 0; i < data.length; i++) {
		for (j = 0; j < Object.keys(data[0]).length; j++) {
			if (data[i][Object.keys(data[i])[j]] == undefined || typeof (data[i][Object.keys(data[i])[j]]) === null) {
				data[i][Object.keys(data[i])[j]] = "";
			}
		}
	}

	task_details_data = data;

	if ($.fn.DataTable.isDataTable('#' + table_id)) {
		$('#' + table_id).DataTable().destroy();
	}


	var html_data = '';
	var inc_id = 1;
	html_data += '<thead><tr>';
	$.each(data[0], function (key, value) {
		html_data += '<th>' + key.replace(/_/g, " ").toUpperCase() + '</th>'
	});
	html_data += '</tr></thead>';
	html_data += '<tbody>';
	$.each(data, function (key, value) {
		html_data += '<tr>';
		$.each(value, function (key, value) {
			html_data += '<td>' + value + '</td>';
		});
		html_data += '</tr>';
	});
	html_data += '</tbody>';
	$('#' + table_id).html(html_data);
	var col_viz_int = 1;
	$('#' + table_id).DataTable({
		"columnDefs": [
			{
				"targets": [0],
				"visible": false,
				"searchable": false,
				className: 'noVis'
			},
			{
				"targets": [1],
				"visible": false,
				"searchable": false,
				className: 'noVis'
			},
			{
				"targets": [2],
				"visible": false,
				"searchable": false,
				className: 'noVis'
			},
			{
				"targets": [4],
				"render": function (data, type, row, meta) {
					inc_id = (inc_id + 1)
					//console.log(row[0]);
					return '<a class="emp_task_name_click" id="' + 'tbl_status_update_' + inc_id + '" onclick="get_task_com_details(' + "'" + row[2] + "','" + login_emp_sno + "','" + emp_roll + "','" + row[0] + "','" + row[1] + "'" + '); return false;" >' + data + '</a>'
					//return "xxxx";
				}
			},
			{
				"targets": [5],
				"visible": false,
				"searchable": false,
				className: 'noVis'
			},
			{
				"targets": [6],
				"visible": false,
				"searchable": false,
				className: 'noVis'
			},
			{
				"targets": [7],
				"visible": false,
				"searchable": false,
				className: 'noVis'
			},
			{
				"targets": [8],
				"visible": false,
				"searchable": false,
				className: 'noVis'
			},
			{
				"targets": [10],
				"render": function (data, type, row, meta) {
					inc_id = (inc_id + 1)
					return '<div class="task_progress_bar_main"><div class="task_progress_bar" style="width:' + data + '%">' + data + '%</div></div>'
					//return "xxxx";
				}
			}
		],
		scrollY: '45vh',
		scrollX: true,
		scrollCollapse: true,
		"sScrollXInner": "100%",
		"sScrollYInner": "100%",
		paging: false,
		order: [],
		dom: 'Bfrtip',
		buttons: [
			//{
			//    text: '<i class= "fa fa-user-plus" aria-hidden="true"></i><span> Add Employee</span>',
			//    action: function (e, dt, node, config) {
			//        window.location = "../pages/create_new_employee.aspx";
			//    }
			//},
			{
				extend: 'copyHtml5',
				text: '<i class="fa fa-files-o"></i>',
				titleAttr: 'Copy'
			},
			{
				extend: 'excelHtml5',
				text: '<i class="fa fa-file-excel-o"></i>',
				titleAttr: 'Excel'
			},
			{
				extend: 'csvHtml5',
				text: '<i class="fa fa-file-text"></i>',
				titleAttr: 'CSV'
			},
			{
				extend: 'pdfHtml5',
				text: '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF'
			},
			{
				extend: 'colvis',
				columns: ':not(.noVis)',
				columnText: function (dt, idx, title) {
					if (idx != "0") {
						return (col_viz_int) + ': ' + title;
						col_viz_int = col_viz_int + 1;
					}
				}
			}
		]
	});

	$('#' + table_id).on('shown.bs.collapse', function () {
		$($.fn.dataTable.tables(true)).DataTable()
			.columns.adjust();
	});
};




function task_onclick_options_enable() {
	$("#task_status_dropdown").change(function () {
		if ($('#task_status_dropdown').attr('params_val') == $('#task_status_dropdown').val()) {
			$(".task_status_change_display").hide();
		} else {
			$(".task_status_change_display").show();
		}
	});
}

function get_task_com_details(task_sno, login_emp_id, emp_roll, task_status, task_relation) {

	console.log(task_sno, "==", login_emp_id, "==", emp_roll, "==", task_status, "==", task_relation);


	$('#change_task_status_submit').attr("params_val", task_sno + "^" + login_emp_id);
	console.log(task_status);

	if (task_relation.toString() == "0" || task_status.toString() == "99") {
		$("#task_status_dropdown_div_main").hide();
	} else {
		$("#task_status_dropdown_div_main").show();
	}

	$.ajax({
		url: "/web_services.asmx/ser_get_task_status_master_details",
		data: "{ 'current_task_status': '" + task_status + "'}",
		dataType: "json",
		async: false,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			prepare_dropdown(JSON.parse(data.d), 'task_status_dropdown_div', 'task_status_dropdown', 'task_status_dropdown_class', task_status)
		},
		error: function (response) {
			alert(response.responseText);
		},
		failure: function (response) {
			alert(response.responseText);
		}
	});


	$.ajax({
		url: "/web_services.asmx/ser_get_task_all_emp_status",
		data: "{ 'task_id': '" + task_sno + "'}",
		dataType: "json",
		async: false,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			build_table_from_array_model_popup("task_employee_status_tbl_main", JSON.parse(data.d))
		},
		error: function (response) {
			alert(response.responseText);
		},
		failure: function (response) {
			alert(response.responseText);
		}
	});





	task_onclick_options_enable();

	$("#task_details_dropdown_modal").modal("show");
	datatable_re_align_column_head(200);
};




function prepare_dropdown(data, tag_id, dropdown_id, dropdown_class, default_value) {
	if (data == undefined) {
		$("#" + tag_id).html("<select id='" + dropdown_id + "' class='" + dropdown_class + "'></select>");
	}
	else if (data.length == 0) {
		$("#" + tag_id).html("<select id='" + dropdown_id + "' class='" + dropdown_class + "'></select>");
	}
	else {
		var param_value = "";
		if (default_value != "") {
			param_value = "param='" + default_value + "'";
		}
		var html_data = "<select id='" + dropdown_id + "' class='" + dropdown_class + "'" + param_value + ">";
		for (i = 0; i < data.length; i++) {
			if (default_value == data[i][Object.keys(data[i])[0]]) {
				html_data += "<option value='" + data[i][Object.keys(data[i])[0]] + "'  selected >" + data[i][Object.keys(data[i])[1]] + "</option>";
			}
			else {
				html_data += "<option value='" + data[i][Object.keys(data[i])[0]] + "'  >" + data[i][Object.keys(data[i])[1]] + "</option>";
			}

		}
		html_data += "</select>";
		$("#" + tag_id).html(html_data);
	}
}




function all_onclick_events_invoke() {


	$("#show-sidebar, #close-sidebar").click(function () {
		datatable_re_align_column_head(500);
	});


};



function datatable_re_align_column_head(delay_mil_sec) {

	var all_data_table_ids = ["task_list_tbl_main", "task_employee_status_tbl_main"];
	setTimeout(function () {
		for (i = 0; i < all_data_table_ids.length; i++) {
			if ($("#" + all_data_table_ids[i]).length) {
				var table_obj = $("#" + all_data_table_ids[i]).DataTable();
				table_obj.columns.adjust().draw();
			}
		}
	}, delay_mil_sec);

}




function update_task_status_submit() {

	var parameters = $('#change_task_status_submit').attr('params_val').split("^");

	var check_sub_status = 0;

	if ($("#task_status_update_remarks").val().trim().length > 0) {
		console.log("xxxxx");
		$.ajax({
			url: "/web_services.asmx/ser_update_task_status",
			data: "{ 'task_sno': '" + parameters[0] + "'," + "'emp_sno': '" + parameters[1] + "'," + "'remarks': '" + $("#task_status_update_remarks").val().trim() + "'," + "'task_status': '" + $("#task_status_dropdown").val() + "'}",
			dataType: "json",
			async: false,
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				console.log(JSON.parse(data.d));
				check_sub_status = 1;
			},
			error: function (response) {
				//alert(response.responseText);
				check_sub_status = 0;
			},
			failure: function (response) {
				//alert(response.responseText);
				check_sub_status = 0;
			}
		});
	} else {
		console.log("xxxxx");
		swal('Error', 'Please fill the remarks', 'error');
		return false;
	}


}




function build_table_from_array_model_popup(table_id, data) {

	for (i = 0; i < data.length; i++) {
		for (j = 0; j < Object.keys(data[0]).length; j++) {
			if (data[i][Object.keys(data[i])[j]] == undefined || typeof (data[i][Object.keys(data[i])[j]]) === null) {
				data[i][Object.keys(data[i])[j]] = "";
			}
		}
	}

	if ($.fn.DataTable.isDataTable('#' + table_id)) {
		$('#' + table_id).DataTable().destroy();
	}


	var html_data = '';
	html_data += '<thead><tr>';
	$.each(data[0], function (key, value) {
		html_data += '<th>' + key.replace(/_/g, " ").toUpperCase() + '</th>'
	});
	html_data += '</tr></thead>';
	html_data += '<tbody>';
	$.each(data, function (key, value) {
		html_data += '<tr>';
		$.each(value, function (key, value) {
			html_data += '<td>' + value + '</td>';
		});
		html_data += '</tr>';
	});
	html_data += '</tbody>';
	$('#' + table_id).html(html_data);
	var col_viz_int = 1;
	$('#' + table_id).DataTable({
		"columnDefs": [
			{
				"targets": [0],
				"visible": false,
				"searchable": false,
				className: 'noVis'
			}
		],
		scrollY: '45vh',
		scrollX: true,
		scrollCollapse: true,
		"sScrollXInner": "100%",
		"sScrollYInner": "100%",
		paging: false,
		order: [],
		dom: 'Bfrtip',
		buttons: [

			{
				extend: 'copyHtml5',
				text: '<i class="fa fa-files-o"></i>',
				titleAttr: 'Copy'
			},
			{
				extend: 'excelHtml5',
				text: '<i class="fa fa-file-excel-o"></i>',
				titleAttr: 'Excel'
			},
			{
				extend: 'csvHtml5',
				text: '<i class="fa fa-file-text"></i>',
				titleAttr: 'CSV'
			},
			{
				extend: 'pdfHtml5',
				text: '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF'
			},
			{
				extend: 'colvis',
				columns: ':not(.noVis)',
				columnText: function (dt, idx, title) {
					if (idx != "0") {
						return (col_viz_int) + ': ' + title;
						col_viz_int = col_viz_int + 1;
					}
				}
			}
		]
	});

	$('#' + table_id).on('shown.bs.collapse', function () {
		$($.fn.dataTable.tables(true)).DataTable()
			.columns.adjust();
	});
};
