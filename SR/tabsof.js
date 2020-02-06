
var globalVariable = {
	btnval: 0
};


var butt = 0;
$(document).ready(function () {
	
	$("#collapseOne").hide();
	loadcollapse();



});


function loadcollapse() {
	
	event.preventDefault();
	if (butt == undefined) {
		$("#collapseOne").hide();
	}
	else if (butt == '0') {
		$("#collapseOne").hide();
	}
	else if (butt == '1') {

		btnval = 4.5;
		$("#headcolor").removeClass();
		$("#headcolor").addClass('icon-bg bg-primary dropdown-head');
		$("#collapseOne").show();
		load_panel("#lobipanelcustomcontrol");



	}
	else if (butt == '2') {
		btnval = 10;
		load_panel("");
		$("#headcolor").removeClass();
		$("#headcolor").addClass('icon-bg bg-success dropdown-head');
		$("#collapseOne").delay(500).show();
		load_panel("#lobipanelcustomcontrol");

	}
	else if (butt == '3') {
		btnval = 18;
		$("#headcolor").removeClass();
		$("#headcolor").addClass('icon-bg bg-danger dropdown-head');
		$("#collapseOne").delay(500).show();
		load_panel("#lobipanelcustomcontrol");
	}
	else if (butt == '4') {
		btnval = 22;
		$("#headcolor").removeClass();
		$("#headcolor").addClass('card-header icon-bg bg-white dropdown-head text-dark');
		$("#collapseOne").delay(500).show();
		load_panel("#lobipanelcustomcontrol");
	}
	else {
		$("#collapseOne").hide();
	}
}

$('#b1t').on('click', function (e) {
	butt = 1;
	loadcollapse();
});

$('#b2t').on('click', function (e) {
	butt = 2;
	loadcollapse();
});
$('#b3t').on('click', function (e) {
	butt = 3;
	loadcollapse();
});

$('#b4t').on('click', function (e) {
	butt = 4;
	loadcollapse();	
});
$('#icloseme').on('click', function (e) {

	butt = 0;
	loadcollapse();
});

function load_panel(pid) {	
	//$(pid).lobiPanel({
	//	//stateful: true,
	//	//close: {
	//	//	icon: 'fa fa-times-circle',

	//	//},
	//	//reload: false,
	//	//editTitle: false,
	//	//unpin: {
	//	//	icon: 'fa fa-arrows'
	//	//},
	//	//minimize: false,// {
	//	////	icon: 'fa fa-chevron-up',
	//	////	icon2: 'fa fa-chevron-down'
	//	////},
	//	//expand: {
	//	//	icon: 'fa fa-expand',
	//	//	icon2: 'fa fa-compress'
	//	//}
	//});

	$(pid).lobiPanel();
}



//$('.lobipanel').on('onClose.lobiPanel', function (close) {
//	alert(1);
//});





//$('.lobipanel').on('onClose.lobiPanel', function (ev, lobiPanel, result, status, xhr) {
//	debugger;
//	window.console.log("Loaded", ev, lobiPanel, result, status, xhr);
//});

$(function () {
	$("#datepicker").datepicker();
});
$(function () {
	$("#datepickerfrom").datepicker();
});
	
	




