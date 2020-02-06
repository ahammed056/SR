// ver ahammed part
var tablebody2 = [];
var tablebody3 = [];
var tablebody4 = [];
var tablebody5 = [];
var ods_order = [];
var navbody = [];
var navtabs = [];
var mydistrict = [];
var contractor_view = 0;
var tableperhourDisplay = [];
var myhours = '';

$(function () {
	//......................................................................................................... to load date values to textboxes strat
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = dd + '/' + mm + '/' + yyyy;
	$("#from_datepicker").val(today);
	$("#to_datepicker").val(today);
	//......................................................................................................... to load date values to textboxes End
	load_district();
	load_district_ava_or_not();
	

});


//......................................................................................................... to load values on calender textboxes changed Start
$('#to_datepicker').datepicker({
	constrainInput: "true",
	dateFormat: "dd/mm/yy",
	changeMonth: true,
	changeYear: true,
	maxDate: 0,
	onSelect: function (date) {
		load_Counters(1, $("#Loadistricts").find("option:selected").val());
		load_Counters(10, $("#Loadistricts").find("option:selected").val());
		load_Counters(11, $("#Loadistricts").find("option:selected").val());
		$("#collapseOne").hide();
		$("#from_datepicker").datepicker("option", "maxDate", date);
		$('#from_datepicker').datepicker('setDate', date);
		$("#collapseOne").hide();
		$('#ContractorDetails_show').hide();
		$('#vehicle_register_show').hide();
		load_per_hourdisplay($("#Loadistricts").find("option:selected").val());
		Func72hoursOfDipaly($("#Loadistricts").find("option:selected").val());
		myhours = '';
		myhours = new Date().getHours();
		if ($("#Loadistricts").val() == '1') {
			perhourchangefunc('1', '1');
		}
		else {
			perhourchangefunc(myhours, $("#Loadistricts").find("option:selected").val());
		}
	}
});
$('#from_datepicker').datepicker({
	dateFormat: "dd/mm/yy",
	changeMonth: true,
	changeYear: true,
	maxDate: 0,
	onSelect: function (date) {
	
		load_Counters(1, $("#Loadistricts").find("option:selected").val());
		load_Counters(10, $("#Loadistricts").find("option:selected").val());
		load_Counters(11, $("#Loadistricts").find("option:selected").val());
		$("#collapseOne").hide();
		$('#ContractorDetails_show').hide();
		$('#vehicle_register_show').hide();
		load_per_hourdisplay($("#Loadistricts").find("option:selected").val());
		Func72hoursOfDipaly($("#Loadistricts").find("option:selected").val());
		myhours = '';
		myhours = new Date().getHours();
		if ($("#Loadistricts").val() == '1') {
			perhourchangefunc('1', '1');
		}
		else {
			perhourchangefunc(myhours, $("#Loadistricts").find("option:selected").val());
		}
	}
});
//......................................................................................................... to load values on calender textboxes changed End



//......................................................................................................... to load Districts in dropdown start

function load_district() {
	var obj = "{FTYPE: '13',FDISTRICT:''}";
	_Sand_Auth("../Districts", obj, function (res) {
		$('#Loadistricts').empty();
		$('#Loadistricts').append('<option value=0>Select District</option>');
		if (res.Code == "100") {
			$('#Loadistricts').append('<option value=1>All</option>');
			$.each(res.Distli, function (index, value) {
				$('#Loadistricts').append('<option value="' + value.District_code + '">' + value.District_name + '</option>');
			});
			$('#Loadistricts').prop('selectedIndex', 1);
			
			//load_per_hourdisplay();
		}
		else {
			$('#Loadistricts').empty();
			$('#Loadistricts').append('<option value=0>Select District</option>');
		}
	});
}
function load_district_ava_or_not() {
	if ($("#Loadistricts").val() == '0') {
		alert('Please select District');
	}
	else if ($("#Loadistricts").val() != 'undefined') {
		load_Counters(1, 1);
		load_Counters(10, 1);
		load_Counters(11, 1);
		//Func72hoursOfDipaly(1);
		//load_per_hourdisplay(1);
		//myhours = '';
		//myhours = new Date().getHours();
	 //   perhourchangefunc('1', '1'); //(hour,District)

	}
	else if ($("#Loadistricts").val() != null) {
		alert('Please select District');
	}
	else {

	}

}


$("#submit").click(function () {
	load_Counters(1, $("#Loadistricts").find("option:selected").val());
	load_Counters(10, $("#Loadistricts").find("option:selected").val());
	load_Counters(11, $("#Loadistricts").find("option:selected").val());
	Func72hoursOfDipaly($("#Loadistricts").find("option:selected").val());
	myhours = '';
	myhours = new Date().getHours();
	if ($("#Loadistricts").val() == '1') {
		perhourchangefunc('1', '1');
	}
	else {
		perhourchangefunc(myhours, $("#Loadistricts").find("option:selected").val());
	}

});


//......................................................................................................... to load Districts in dropdown End


//......................................................................................................... to load Count for type 1 , 11 , 12 start
function load_Counters(id,tdis) {
	var obj = "{FTYPE: '" + id + "',FDISTRICT:'" + tdis + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:''}";

		_Sand_Auth("../SandTransportReportsapi", obj, function (res) {
			if (res.Code == "100") {
				if (id == 1) {
					$('#todaysandquantity').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_SAND_QUANTITY, duration: 3000 });
					$('#totalsandquantitycum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_SAND_QUANTITY_CUM, duration: 3000 });
					$('#todayquantitydispatched').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_QUANTITY_DISPATCHED, duration: 3000 });
					$('#totalquantitydispatched_cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_QUANTITY_DISPATCHED_CUM, duration: 3000 });
					$('#tobdispatch ').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TO_BE_DISPATCH, duration: 3000 });
					$('#tobdispatchcum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TO_BE_DISPATCH_CUM, duration: 3000 });
				}
				if (id == 10) {

					$('#Tnt_Tractor_Booked').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_BOOKED, duration: 3000 });
					$('#Tnt_Tractor_Dispathed').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_DISPATHED, duration: 3000 });
					$('#Tnt_Tractor_Booked_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_BOOKED_CUM, duration: 3000 });
					$('#Tnt_Tractor_Pending_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_PENDING_CUM, duration: 3000 });
					$('#Tnt_Tractor_Dispathed_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_DISPATHED_CUM, duration: 3000 });

					$('#Tnt_6Tyre_Booked').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_BOOKED, duration: 3000 });
					$('#Tnt_6Tyre_Dispathed').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_DISPATHED, duration: 3000 });
					$('#Tnt_6Tyre_Booked_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_BOOKED_CUM, duration: 3000 });
					$('#Tnt_6Tyre_Pending_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_PENDING_CUM, duration: 3000 });
					$('#Tnt_6Tyre_Dispathed_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_DISPATHED_CUM, duration: 3000 });

					$('#Tnt_10Tyre_Booked').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_BOOKED, duration: 3000 });
					$('#Tnt_10Tyre_Dispathed').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_DISPATHED, duration: 3000 });
					$('#Tnt_10Tyre_Booked_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_BOOKED_CUM, duration: 3000 });
					$('#Tnt_10Tyre_Pending_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_PENDING_CUM, duration: 3000 });
					$('#Tnt_10Tyre_Dispathed_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_DISPATHED_CUM, duration: 3000 });

					$('#Tnt_Booked').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_BOOKED, duration: 3000 });
					$('#Tnt_Dispathed').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_DISPATHED, duration: 3000 });
					$('#Tnt_Booked_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_BOOKED_CUM, duration: 3000 });
					$('#Tnt_Pending_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_PENDING_CUM, duration: 3000 });
					$('#Tnt_Dispathed_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_DISPATHED_CUM, duration: 3000 });


				}
				if (id == 11) {

					$('#TOTAL_REG').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_REG, duration: 3000 });
					$('#TODAY_REG').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_REG, duration: 3000 });
					$('#TOTAL_45').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_45, duration: 3000 });
					$('#TODAY_45').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_45, duration: 3000 });
					$('#TOTAL_9_10').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_9_10, duration: 3000 });
					$('#TODAY_9_10').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_9_10, duration: 3000 });
					$('#TOTAL_18').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_18, duration: 3000 });
					$('#TODAY_18').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_18, duration: 3000 });
					$('#TOTAL_24').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_24, duration: 3000 });
					$('#TODAY_24').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_24, duration: 3000 });
					$('#TOTAL_VEHICLES').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_VEHICLES, duration: 3000 });
					$('#TODAY_VEHICLES').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_VEHICLES, duration: 3000 });

					//TOTAL_45: 262
					//TODAY_45: 0
					//TOTAL_9_10: 33
					//TODAY_9_10: 0
					//TOTAL_18: 40
					//TODAY_18: 0
					////////////////////////////TOTAL_24: 0
					////////////////////////////TODAY_24: 0
					//TOTAL_REG: 335
					//TODAY_REG: 0


				}
				if ($("#Loadistricts").val() != 'undefined') {
					Func72hoursOfDipaly(1);
					load_per_hourdisplay(1);
					myhours = '';
					myhours = new Date().getHours();
					perhourchangefunc('1', '1'); //(hour,District)
				}
			}
			else {
				$('#todaysandquantity').text("0");
				$('#totalsandquantitycum').text("0");
				$('#todayquantitydispatched').text("0");
				$('#totalquantitydispatched_cum').text("0");
				$('#tobdispatch').text("0");
				$('#Tnt_Tractor_Booked').text("0");
				$('#Tnt_Tractor_Dispathed').text("0");
				$('#Tnt_Tractor_Booked_Cum').text("0");
				$('#Tnt_Tractor_Pending_Cum').text("0");
				$('#Tnt_Tractor_Dispathed_Cum').text("0");

				$('#Tnt_6Tyre_Booked').text("0");
				$('#Tnt_6Tyre_Dispathed').text("0");
				$('#Tnt_6Tyre_Booked_Cum').text("0");
				$('#Tnt_6Tyre_Pending_Cum').text("0");
				$('#Tnt_6Tyre_Dispathed_Cum').text("0");

				$('#Tnt_10Tyre_Booked').text("0");
				$('#Tnt_10Tyre_Dispathed').text("0");
				$('#Tnt_10Tyre_Booked_Cum').text("0");
				$('#Tnt_10Tyre_Pending_Cum').text("0");
				$('#Tnt_10Tyre_Dispathed_Cum').text("0");
				$('#Tnt_Booked').text("0");
				$('#Tnt_Dispathed').text("0");
				$('#Tnt_Booked_Cum').text("0");
				$('#Tnt_Pending_Cum').text("0");
				$('#Tnt_Dispathed_Cum').text("0");
				$('#TOTAL_REG').text("0");
				$('#TODAY_REG').text("0");
				$('#TOTAL_45').text("0");
				$('#TODAY_45').text("0");
				$('#TOTAL_9_10').text("0");
				$('#TODAY_9_10').text("0");
				$('#TOTAL_18').text("0");
				$('#TODAY_18').text("0");
				$('#TOTAL_24').text("0");
				$('#TODAY_24').text("0");
				$('#TOTAL_VEHICLES').text("0");
				$('#TODAY_VEHICLES').text("0");
			}
		});
	
	
	
}
//......................................................................................................... to load Count for type 1 , 11 , 12 End


//......................................................................................................... to load Count for type 1 , 11 , 12 with MT Quantity start
function TntViews(id) {
	ods_order = id;
	if (id == 4.5) {
		$('#Vtyre').text("Tractor (4.5 MT)");
		mytyreObj = 'Tractor';
	}
	if (id == 10) {

		$('#Vtyre').text("6 Tyre (10 MT)");
		mytyreObj = '6Tyre';
	}
	if (id == 18) {

		$('#Vtyre').text("10 Tyre (18 MT)");
		mytyreObj = '10Tyre';
	}
	if (id == 22) {
		$('#Vtyre').text("Total No.of Trips");
		mytyreObj = 'TotNfT';
	}
	//$("#dt_table_2").empty('');
	//$("#dt_table_3").empty('');
	$('.nav-hide').hide();

	var obj = "{FTYPE:'12',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + id + "'}";
	_Sand_Auth("../SandTransportReports_Get_for_total_orders", obj, function (res) {

		if (res.Code == "100") {


			$("#dt_table_1").empty('');
			tablebody = '<table id="dt_table_1" class="table text-left"><thead style="font-size:16px;"><tr class="text-left"><th class="pt-0" style="width:2%">#</th><th class="pt-0" style="width:3%;">Name</th><th class="pt-0" style="width:1%;">Total</th></tr ></thead ><tbody>';

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				tablebody += "<tr><td>" + obj.SNo + "</td ><td <a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px;'  onClick=load_Cluster('" + obj.SNo + mytyreObj + "','" + obj.Name + "')>" + (obj.Name).replace('_', ' ') + "</a></td ><td ><label class='badge badge-info mr-4 mr-xl-2' style='font-size:20px;border-radius:10px;'>" + obj.Total + "</label></td></tr>";
			}


			TotalOrdersTyres(tablebody);
		}
		else {

		}
	});
}

function TotalOrdersTyres(tabledata) {
	$('#tbl_OrderDetails_counts_table').html(tabledata + '<tbody><table>');

}


function load_Cluster(sn1, namess) {

	//alert(" cluster id tho  " + sn1 + namess + "evi load i ya eee");
	if (sn1 != 0 || sn1 == undefined) {
		navtabs += "<li class='nav-item nav-hide' id='" + "li" + sn1 + "' style='display:none;' ><a class='nav-link' id='" + "lia" + sn1 + "' data-toggle='tab' href='" + "#mycsttab" + sn1 + "' role='tab' aria-controls='" + "mycsttab" + sn1 + "' aria-selected='false'>" + namess.replace('_', ' ') + "<button class='align-btn' id='" + "btn" + sn1 + "' onClick=closebtn('" + sn1 + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
		navbody += "<div class='col-md-10 tab-pane fade' id='" + "mycsttab" + sn1 + "' role='tabpanel' aria-labelledby='" + "mycsttab" + sn1 + "'>'" + namess.replace('_', ' ') + "' </div>";
		$('#mydatatabs').append(navtabs);
		$('#mytabcontent').append(navbody);
		this.$("#li" + sn1).show();



		this.$("#mycsttab" + sn1).show();
		Cluster_details(ods_order, sn1);
	}
	else {
		this.$("#li" + sn1).hide();
		this.$("#mycsttab" + sn1).hide();
		this.$("#chinturmandal-tab").show();

	}


}


function Cluster_details(mt, idn) {

	var obj = "{FTYPE:'13',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "'}";
	_Sand_Auth("../SandTransportReportsapi", obj, function (res) {
		tablebody2 = '<table id="dt_table_2" class="table"><thead style="font-size:14px;"><tr> <th style="width:2%">ID</th><th style="width:8%">Cluster Name</th> <th style="width:5%">TOTAL ORDERS</th> <th style="width:1%">ALLOCATED</th> <th style="width:1%">ACCEPTED</th> <th style="width:5%">WAY BILL GENRATED</th> <th style="width:2%">DELIVERD</th> </tr> </thead><tbody>';
		if (res.Code == "100") {
			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				tablebody2 += "<tr><td><a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px;' onClick=load_stockyard('" + obj.CLUSTER_ID + "','" + obj.CLUSTER_ID + mytyreObj + "')  >" + obj.CLUSTER_ID + "</a></td><td>" + obj.CLUSTER_NAME + "</td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td><td style='text-align:center'>" + obj.ALLOCATED + "</td><td style='text-align:center'>" + obj.ACCEPTED + "</td><td style='text-align:center'>" + obj.WAYBILL_GENRATED + "</td><td style='text-align:center'>" + obj.DELIVERD + "</td></tr>";
			}
			$("#mycsttab" + idn).html(tablebody2 + '<tbody><table>');
		}
		else {
		}
	});
}


function load_stockyard(sn1cusObj, sn1cus) {

	navtabs += "<li class='nav-item nav-hide' id='" + "li" + sn1cus + "' style='display:none;' ><a class='nav-link' id='" + "lia" + sn1cus + "' data-toggle='tab' href='" + "#mycsttab" + sn1cus + "' role='tab' aria-controls='" + "mycsttab" + sn1cus + "' aria-selected='false'>" + sn1cusObj.replace('_', ' ') + "<button class='align-btn' style='border:none;' id='" + "btn" + sn1cus + "' onClick=closebtn('" + sn1cus + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	navbody += "<div class='col-md-12 tab-pane fade' id='" + "mycsttab" + sn1cus + "' role='tabpanel' aria-labelledby='" + "mycsttab" + sn1cus + "'>" + sn1cusObj.replace('_', ' ') + " </div>";
	$('#mydatatabs').append(navtabs);
	$('#mytabcontent').append(navbody);

	if (sn1cus != 0 || sn1cus == undefined) {
		this.$("#li" + sn1cus).show();
		this.$("#mycsttab" + sn1cus).show();
		stockyard_details(sn1cusObj, sn1cus, ods_order);
	}
	else {
		this.$("#li" + sn1cus).hide();
		//this.$("#mycsttab" + sn1).hide();
		this.$("#chinturmandal-tab").show();
		return;
	}


}



//stock yard function to get the cid at cluster id and mt as type of metric tons
function stockyard_details(custid, custidobjName, mt) {

	var obj = "{FTYPE:'1',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "',fcluster_id:'" + custid + "',fstockyard_id:''}";

	_Sand_Auth("../SandTransportReportsapi_Stockyard", obj, function (res) {



		tablebody3 = '<table id="dt_table_3" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:8%"> STOCKYARD ID</th> <th style="width: 13%;">STOCKYARD NAME</th> <th  style="width: 10%;">CLUSTER NAME</th> <th  style="width: 8%;">TOTAL ORDERS</th> <th  style="width: 2%;">ALLOCATED</th> <th  style="width: 2%;">ACCEPTED</th> <th  style="width: 10%;">WAY BILL GENRATED</th> <th  style="width: 2%;">DELIVERD</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				tablebody3 += "<tr><td><a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px;'  onclick=load_stockyard_contractor_info('" + obj.STOCKYARD_ID + mytyreObj + "','" + obj.STOCKYARD_ID + "','" + obj.CLUSTER_ID + "');>" + obj.STOCKYARD_ID + "</a></td><td>" + obj.STOCKYARD_NAME + "</td><td>" + obj.CLUSTER_NAME + "</td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td><td style='text-align:center'>" + obj.ALLOCATED + "</td><td style='text-align:center'>" + obj.ACCEPTED + "</td><td style='text-align:center'>" + obj.WAYBILL_GENRATED + "</td><td style='text-align:center'>" + obj.DELIVERD + "</td></tr>";


			}
			//$('#mydatatabs').append(navtabs);
			//$('#mytabcontent').append(navbody);
			$("#mycsttab" + custidobjName).html(tablebody3 + '<tbody><table>');

		}
	});
}


function load_stockyard_contractor_info(sn1stock_id, sn1stock_idObj, sn1stock_clusterid) {


	navtabs += "<li class='nav-item nav-hide' id='" + "li" + sn1stock_id + "' style='display:none;' ><a class='nav-link' id='" + "lia" + sn1stock_id + "' data-toggle='tab' href='" + "#mycsttab" + sn1stock_id + "' role='tab' aria-controls='" + "mycsttab" + sn1stock_id + "' aria-selected='false'>" + sn1stock_idObj + "<button class='align-btn' style='border:none;' id='" + "btn" + sn1stock_id + "' onClick=closebtn('" + sn1stock_id + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	navbody += "<div class='tab-pane fade' id='" + "mycsttab" + sn1stock_id + "' role='tabpanel' aria-labelledby='" + "mycsttab" + sn1stock_id + "'>" + sn1stock_idObj + " </div>";
	$('#mydatatabs').append(navtabs);
	$('#mytabcontent').append(navbody);

	if (sn1stock_id != 0 || sn1stock_id == undefined) {
		this.$("#li" + sn1stock_id).show();
		this.$("#mycsttab" + sn1stock_id).show();
		contaractor_details(sn1stock_clusterid, sn1stock_idObj, sn1stock_id, ods_order);
	}
	else {
		this.$("#li" + sn1stock_id).hide();
		//this.$("#mycsttab" + sn1).hide();
		this.$("#chinturmandal-tab").show();
		return;
	}


}

function contaractor_details(custid, stock_id, stock_id_obj, mt) {

	var obj = "{FTYPE:'3',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "',fcluster_id:'" + custid + "',fstockyard_id:'" + stock_id + "'}";
	_Sand_Auth("../SandTransportReportsapi_Stockyard", obj, function (res) {

		tablebody4 = '<table id="dt_table_4" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:8%"> CONTRACTOR ID</th>  <th  style="width: 10%;">CONTRACTOR NAME</th> <th  style="width: 8%;">TOTAL ORDERS</th> <th  style="width: 2%;">ALLOCATED</th> <th  style="width: 2%;">ACCEPTED</th> <th  style="width: 10%;">WAY BILL GENRATED</th> <th  style="width: 2%;">DELIVERD</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				tablebody4 += "<tr><td><a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px;'  onclick=load_contaractor_veh_details('" + obj.CONTRACTOR_ID + "','" + obj.CONTRACTOR_ID + mytyreObj + "','" + stock_id + "','" + custid + "');>" + obj.CONTRACTOR_ID + "</a></td><td>" + obj.CONTRACTOR_NAME + "</td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td><td style='text-align:center'>" + obj.ALLOCATED + "</td><td style='text-align:center'>" + obj.ACCEPTED + "</td><td style='text-align:center'>" + obj.WAYBILL_GENRATED + "</td><td style='text-align:center'>" + obj.DELIVERD + "</td></tr>";
			}

			$("#mycsttab" + stock_id_obj).html(tablebody4 + '<tbody><table>');

		}
	});
}


function load_contaractor_veh_details(mycontractors_id_obj, contractors_id, sn1stock_id, sn1stock_clusterid) {

	navtabs += "<li class='nav-item nav-hide' id='" + "li" + contractors_id + "' style='display:none;' ><a class='nav-link' id='" + "lia" + contractors_id + "' data-toggle='tab' href='" + "#mycsttab" + contractors_id + "' role='tab' aria-controls='" + "mycsttab" + contractors_id + "' aria-selected='false'>" + mycontractors_id_obj + "<button class='align-btn' style='border:none;' id='" + "btn" + contractors_id + "' onClick=closebtn('" + contractors_id + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	navbody += "<div class='tab-pane fade' id='" + "mycsttab" + contractors_id + "' role='tabpanel' aria-labelledby='" + "mycsttab" + contractors_id + "'>" + mycontractors_id_obj + " </div>";
	$('#mydatatabs').append(navtabs);
	$('#mytabcontent').append(navbody);

	if (contractors_id != 0 || contractors_id == undefined) {
		this.$("#li" + contractors_id).show();
		this.$("#mycsttab" + contractors_id).show();
		contaractor_veh_details(mycontractors_id_obj, contractors_id, sn1stock_id, sn1stock_clusterid, ods_order);
	}
	else {

		return;
	}


}
function contaractor_veh_details(contractor_id, contractorsObj, stock_id, custid, mt) {

	var obj = "{FTYPE:'4',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "',fcluster_id:'" + custid + "',fstockyard_id:'" + stock_id + "',fcontractor_id:'" + contractor_id + "'}";

	_Sand_Auth("../SandTransportReportsapi_Stockyard", obj, function (res) {

		tablebody5 = '<table id="dt_table_5" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:8%">VEHICLE NO</th><th  style="width: 8%;">TOTAL ORDERS</th> <th  style="width: 2%;">ALLOCATED</th> <th  style="width: 2%;">ACCEPTED</th> <th  style="width: 10%;">WAY BILL GENRATED</th> <th  style="width: 2%;">DELIVERD</th><th  style="width: 2%;">DOWNLOAD</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				tablebody5 += "<tr><td><a style='font-style: italic; text-decoration: underline;font-size:15px;'>" + obj.VEHICLE_NO + "</a></td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td><td style='text-align:center'>" + obj.ALLOCATED + "</td><td style='text-align:center'>" + obj.ACCEPTED + "</td><td style='text-align:center'>" + obj.WAYBILL_GENRATED + "</td><td style='text-align:center'>" + obj.DELIVERD + "</td><td a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px; cursor:pointer' onclick=PrintDetails('" + obj.CONTRACTOR_ID + "','" + stock_id + "','" + custid + "','" + obj.VEHICLE_NO + "');>DOWNLOAD</td></tr>";
			}

			$("#mycsttab" + contractorsObj).html(tablebody5 + '<tbody><table>');

		}
	});
}
function PrintDetails(CONTRACTOR_ID, stock_id, custid) {

	var daattiem = Date.now() + CONTRACTOR_ID;
	var file1 = "<div id='" + daattiem + "' style='display:none;'><h3>Hello, this is a H3 tag</h3> <table id='VEHICLE_NO' class='table'><thead> <th>VEHILE NO</th><th>TOTAL ORDERS</th> <th>ALLOCATED</th> <th>ACCEPTED</th> <th>WAY BILL GENRATED</th> <th>DELIVERD</th><th>DOWNLOAD</th> </thead><tr><td><a>'obj.VEHICLE_NO'</a></td><td>'obj.TOTAL_ORDERS'</td><td>'obj.ALLOCATED'</td><td>'obj.ACCEPTED'</td><td>'obj.WAYBILL_GENRATED'</td><td>'obj.DELIVERD'</td><td>DOWNLOAD</td></tr> </table></div> <p>a pararaph</p></div><div id='editor'></div>"

	$('#collapseOne').append(file1);
	var doc = new jsPDF();
	var specialElementHandlers = {
		'#editor': function (element, renderer) {
			return true;
		}
	};
	doc.fromHTML($('#123456').html(), 5, 5, {
		'width': 1000,
		'elementHandlers': specialElementHandlers
	});
	doc.save('sample-file.pdf');

}









var contractor_cluster_tablebody = [];
var contractor_cluster_tablebody_cumulative = [];
function load_cluster_for_contrator(id) {

	var obj = "{FTYPE:'30',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + id + "'}";
	_Sand_Auth("../get_contractor_details", obj, function (res) {

		if (res.Code == "100") {
			contractor_cluster_tablebody = '<table id="dt_table_contractor" class="table"><thead style="font-size:14px;"> <tr class="text-left" > <th style="width:11% !important;;">CONTRACTOR ID</th> <th style="width:9% !important;;">NAME</th><th style="width:11% !important;; ">MOBILE</th> <th style="width:8% !important;">4.5 Tyre</th> <th style="width:8% !important;">10 Tyre</th> <th style="width:8% !important;">18 Tyre</th><th style="width:8% !important;">24 Tyre</th> <th style="width:8% !important;">TOTAL</th> </tr> </thead> </thead><tbody>';


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				contractor_cluster_tablebody += "<tr><td><a>" + obj.CONTRACTOR_ID + " </a></td><td><a>" + obj.CONTRACTOR_NAME + "</a></td><td>" + obj.CONTRACTOR_MOBILE + "</td><td>" + obj.TOTAL_4_5 + "</td><td style='text-align:center'>" + obj.TOTAL_9_10 + "</td><td style='text-align:center'>" + obj.TOTAL_18 + "</td><td style='text-align:center'>" + obj.TOTAL_24 + "</td><td style='text-align:center'>" + obj.TOTAL_491024 + "</td></tr>";
			}

			cluster_for_contractor(contractor_cluster_tablebody);
		}
		else {

		}
	});
}

function load_cluster_for_contrator_cumulative(id) {

	var obj = "{FTYPE:'301',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + id + "'}";
	_Sand_Auth("../get_contractor_details", obj, function (res) {

		if (res.Code == "100") {
			contractor_cluster_tablebody_cumulative = '<table id="dt_table_contractor_cum" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width: 13%;">CONTRACTOR ID</th> <th  style="width: 10%;">NAME</th><th  style="width: 2%;">MOBILE</th> <th  style="width: 5%;">4.5 Tyre</th> <th  style="width: 5%;">10 Tyre</th> <th  style="width: 5%;">18 Tyre</th><th  style="width: 5%;">24 Tyre</th> <th  style="width: 5%;">TOTAL</th> </tr> </thead> </thead><tbody>';
			String.prototype.replaceAt = function (index, charcount) {
				return this.substr(0, index) + this.substr(index + charcount);
			}

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				contractor_cluster_tablebody_cumulative += "<tr><td><a>" + obj.CONTRACTOR_ID + " </a></td><td><a>" + obj.CONTRACTOR_NAME + "</a></td><td>" + obj.CONTRACTOR_MOBILE + "</td><td>" + obj.TOTAL_4_5_CUM + "</td><td style='text-align:center'>" + obj.TOTAL_9_10_CUM + "</td><td style='text-align:center'>" + obj.TOTAL_18_CUM + "</td><td style='text-align:center'>" + obj.TOTAL_24_CUM + "</td><td style='text-align:center'>" + obj.TOTAL_491024_CUM + "</td></tr>";
			}
			cluster_for_contractor_cumulative(contractor_cluster_tablebody_cumulative);
		}
		else {

		}
	});
}


function cluster_for_contractor(tabledata) {

	$('#tbl_cluster_Contractor').html(tabledata + '<tbody><table>');
	$('#tbl_cluster_Contractor').DataTable({
		columnDefs: [{
			targets: 0,
			//render: $.fn.dataTable.render.ellipsis()
		}],
		destroy: true,
		stateSave: true,
		paging: true,
		"pageLength": 10,
		"ordering": false
	});

}


function cluster_for_contractor_cumulative(tabledata) {

	$('#tbl_cluster_Contractor_cumulative').html(tabledata + '<tbody><table>');
	$('#tbl_cluster_Contractor_cumulative').DataTable({
		destroy: true,
		stateSave: true,
		paging: true,
		"pageLength": 10,
		"ordering": false
	});

}

function load_contractor_panel() {
	contractor_view = 1

	if (contractor_view == 1) {
		$('#ContractorDetails_show').show();
		$('#lobipanel_custom_control_contaractor').lobiPanel();
		load_cluster_for_contrator(ods_order);
		load_cluster_for_contrator_cumulative(ods_order);
		contractor_view = 0;
	}
	else {
		$('#ContractorDetails_show').hide();
	}
}




//......................................................................................................... to load Count for type 1 , 11 , 12 with MT Quantity End




//......................................................................................................... Counters for jquery Objects strat
$(function () {
	$.fn.jQuerySimpleCounter = function (options) {
		var settings = $.extend({
			start: 0,
			end: 100,
			easing: 'swing',
			duration: 400,
			complete: ''
		}, options);

		var thisElement = $(this);

		$({ count: settings.start }).animate({ count: settings.end }, {
			duration: settings.duration,
			easing: settings.easing,
			step: function () {
				var mathCount = Math.ceil(this.count);
				thisElement.text(mathCount);
			},
			complete: settings.complete
		});
	};
});
//......................................................................................................... Counters for jquery Objects End

//......................................................................................................... 72 hours functionlaity strat
function Func72hoursOfDipaly(distr) {
	var obj = "{P_type: '1',P_district_id:'" + distr + "',P_cluster_id:'',P_stockyard_id:'',P_permit_quantity:''}";
	if ($("#Loadistricts").val() != '0') {
		_Sand_Auth("../SandTransportReports_72Hours_Route", obj, function (res) {
			mydistrict = "for  " + $("#Loadistricts").find("option:selected").val() + "  District";
			if (res.Code == "100") {

				//for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				//	var obj = res.DailyRepDetsli[index];
				//	var counter = index + 1;
				//	vehicle_cluster_tablebody += "<tr style='font-size:10px;'><td onClick=load_cluster_for_vehicle_info('" + obj.STOCKYARD_ID + "') <a style='color: #33af65;font-weight: bold; text-decoration: underline;font-size:10px;'>" + obj.STOCKYARD_ID + "</a></td ><td  >" + (obj.CLUSTER_NAME).replace('_', ' ') + "</td ><td ><label>" + obj.NO_OF_VEHICLES + "</label></td></tr>";
				//}

				$('#Total_Orders_45_72').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ORDERS_4_5, duration: 3000 });
				$('#Total_Orders_10_72').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ORDERS_10, duration: 3000 });
				$('#Total_Orders_18_72').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ORDERS_18, duration: 3000 });
				$('#Total_Orders_tot_72').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ORDERS_TOT, duration: 3000 });

			}
			else {
				// alert("No data Found"); return;
			}
		});
	}
	else {
		$('#Total_Orders_45_72').text("0");
		$('#Total_Orders_10_72').text("0");
		$('#Total_Orders_18_72').text("0");
		$('#Total_Orders_tot_72').text("0");
	}
}	

//......................................................................................................... 72 hours functionlaity End


function closebtn(sn1) {
	if (sn1 != 0 || sn1 == undefined) {
		this.$("#li" + sn1).remove('');
		this.$("#mycsttab" + sn1).remove('');

		this.$("#chinturmandal-tab").show();

	} else {

		this.$("#li" + sn1).show();
		this.$("#mycsttab" + sn1).show();
		//	this.$("#chinturmandal-tab").hide();

	}

	//if (sn1 != 0 || sn1 == undefined) {
	//    this.$("#mycsttab" + sn1).hide();

	//}
}





function load_per_hourdisplay(disthourdisp) {

	var obj = "{FTYPE:'5',FDISTRICT:'" + disthourdisp + "',FROMDATE:'',TODATE:'',FSANDQUANTY:'',fcluster_id:'',fstockyard_id:''}";
	_Sand_Auth("../PerhourDisplay_route", obj, function (res) {


		tableperhourDisplay = '<table id="dt_table_perhourtable" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:7%">Time in Hours</th> <th style="width: 8%;">DISTRICT</th> <th  style="width: 4%;">Pushed Request</th> <th  style="width: 5%;">Accepted Request</th> <th  style="width: 2%;">TRACTOR</th> <th  style="width: 2%;">6 TYRE</th> <th  style="width: 1%;">10 TYRE</th> </tr> </thead> </thead><tbody>';

		if (res.Code == "100") {

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				tableperhourDisplay += "<tr><td> " + obj.HR + "</td><td>" + obj.DISTRICT + "</td><td style='text-align:center'>" + obj.TOTAL_ALLOCATED + "</td><td style='text-align:center'>" + obj.TOTAL_ACCEPTED + "</td><td style='text-align:center'>" + obj.TRACTOR + "</td><td style='text-align:center'>" + obj.SIXTYRE + "</td><td style='text-align:center'>" + obj.TENTYRE + "</td></tr>";
			}
			$("#prehour_datatable").html(tableperhourDisplay + '<tbody><table>');
		}
		else {
		}
	});

}

$('#timeChangerPerhour').on("change", function () {
	myhours = '';
	myhours = $("#timeChangerPerhour").find("option:selected").val();
	if ($("#Loadistricts").val() == '1') {
		perhourchangefunc('1', '510');
	}
	else {
		perhourchangefunc(myhours, $("#Loadistricts").find("option:selected").val());
	}
});
function perhourchangefunc(p_hour,distrperhour) {

	var obj = "{FTYPE:'6',FDISTRICT:'" + distrperhour + "',FROMDATE:'',TODATE:'',FSANDQUANTY:'" + p_hour + "',fcluster_id:'',fstockyard_id:''}";
	_Sand_Auth("../PerhourDisplay_hour_route", obj, function (res) {

		console.log(res);
		if (res.Code == "100") {
			$('#TOTAL_ALLOCATED_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ALLOCATED, duration: 3000 });
			$('#TOTAL_ACCEPTED_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ACCEPTED, duration: 3000 });
			$('#TRACTOR_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TRACTOR, duration: 3000 });
			$('#SIXTYRE_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].SIXTYRE, duration: 3000 });
			$('#TENTYRE_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TENTYRE, duration: 3000 });
		}
		else {
			$('#TOTAL_ALLOCATED_per_h').text("0");
			$('#TOTAL_ACCEPTED_per_h').text("0");
			$('#TRACTOR_per_h').text("0");
			$('#SIXTYRE_per_h').text("0");
			$('#TENTYRE_per_h').text("0");
		}
	});

}






//  sivaram b program for display cluster vehicle info

//// vehcile details Started..			  

var vehmts = [];
var veh_navbody = [];
var veh_navtabs = [];
var vehicle_cluster_tablebody = [];
var veh_details = [];
var veh_Obj = [];

function load_Vehicle_panel(vehicleMT) {

	//	$('#lobipanel_custom_control_Vehicle').lobiPanel({ close: { icon: 'fa fa-times-circle' } });
	$('#lobipanel_custom_control_Vehicle').lobiPanel();
	vehmts = vehicleMT;
	if (vehmts == 0 || vehmts == undefined) {
	}
	else if (vehmts == '4.5') {
		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('icon-bg bg-primary dropdown-head');
		$('#vehicle_register_show').show();
		veh_Obj = 'vehTractor';
		load_cluster_for_vehicle(vehmts);
	}
	else if (vehmts == '10') {

		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('icon-bg bg-success dropdown-head');
		$("#vehicle_register_show").delay(500).show();
		veh_Obj = 'veh10Tyre';
		load_cluster_for_vehicle(vehmts);
	}
	else if (vehmts == '18') {
		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('icon-bg bg-danger dropdown-head');
		$("#vehicle_register_show").delay(500).show();
		veh_Obj = 'veh18Tyre';
		load_cluster_for_vehicle(vehmts);
	}
	else if (vehmts == '24') {
		$("#headcolor").removeClass();
		$("#headcolor").addClass('icon-bg bg-warning dropdown-head');
		$("#vehicle_register_show").delay(500).hide();
		veh_Obj = 'veh24Tyre';
		load_cluster_for_vehicle(0);
	}
	else if (vehmts == '22') {
		$("#headcolor").removeClass();
		$("#headcolor").addClass('card-header icon-bg bg-white dropdown-head text-dark');
		$("#vehicle_register_show").delay(500).show();
		veh_Obj = 'veh22Tyre';
		load_cluster_for_vehicle(vehmts);
	}
	else {
		$('#vehicle_register_show').hide();
	}
}



function load_cluster_for_vehicle(id) {
var obj = "{FTYPE:'31',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + id + "'}";
	_Sand_Auth("../get_contractor_details", obj, function (res) {

		if (res.Code == "100") {
			vehicle_cluster_tablebody = '<table id="dt_table_vehicle_cluster" class="table text-left"><thead style="font-size:12px;"><tr class="text-left"><th class="pt-0" style="width:2%">CLUSTER ID</th><th class="pt-0" style="width:3%;">CLUSTER NAME</th><th class="pt-0" style="width:3%;">NO OF VEHICLES </th></tr ></thead ><tbody>';

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				vehicle_cluster_tablebody += "<tr style='font-size:10px;'><td onClick=load_cluster_for_vehicle_info('" + obj.CLUSTER_ID + veh_Obj + "','" + obj.CLUSTER_ID + "') <a style='color: #33af65;font-weight: bold; text-decoration: underline;font-size:10px;'>" + obj.CLUSTER_ID + "</a></td ><td  >" + (obj.CLUSTER_NAME).replace('_', ' ') + "</td ><td ><label>" + obj.NO_OF_VEHICLES + "</label></td></tr>";
			}
			cluster_for_vehicle(vehicle_cluster_tablebody);
		}
		else {

		}
	});
}
function cluster_for_vehicle(tabledata) {
	$('#tbl_cluster_vehicledata').html(tabledata + '<tbody><table>');
}
function load_cluster_for_vehicle_info(veh_cust_id, veh_obj) {
	veh_navtabs += "<li class='nav-item nav-hide' id='" + "veh_li" + veh_cust_id + "' style='display:none;' ><a class='nav-link' id='" + "veh_lia" + veh_cust_id + "' data-toggle='tab' href='" + "#veh_mycsttab" + veh_cust_id + "' role='tab' aria-controls='" + "veh_mycsttab" + veh_cust_id + "' aria-selected='false'>" + veh_obj + "<button class='align-btn' style='border:none;' id='" + "veh_btn" + veh_cust_id + "' onClick=closebtn_veh('" + veh_cust_id + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	veh_navbody += "<div class='tab-pane fade' id='" + "veh_mycsttab" + veh_cust_id + "' role='tabpanel' aria-labelledby='" + "veh_mycsttab" + veh_cust_id + "'>" + veh_obj + " </div>";
	$('#myvehicletabs').append(veh_navtabs);
	$('#mytabcontent_vehicle').append(veh_navbody);

	if (veh_cust_id != 0 || veh_cust_id == undefined) {
		this.$("#veh_li" + veh_cust_id).show();
		this.$("#veh_mycsttab" + veh_cust_id).show();
		veh_details_data(veh_cust_id, veh_obj, vehmts);
	}
	else {
		return;
	}


}


function veh_details_data(vehd_custid, veh_objs, mt) {

	var obj = "{FTYPE:'7',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "',fcluster_id:'" + veh_objs + "',fstockyard_id:'',fcontractor_id:''}";

	_Sand_Auth("../SandTransportReportsapi_Stockyard", obj, function (res) {


		veh_details = '<table id="dt_table_vehicle" class="table"><thead style="font-size:11px;"> <tr class="text-left"> <th style="width: 13%;">CONTRACTOR ID</th> <th  style="width: 10%;">CONTRACTOR MOBILE </th> <th  style="width: 8%;">CONTRACTOR NAME</th> <th  style="width: 2%;">DRIVER NAME</th> <th  style="width: 10%;">DRIVER MOBILENUMBER </th> <th  style="width: 2%;">VEHICLE NO</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				veh_details += "<tr><td><a>" + obj.CONTRACTOR_ID + "  </a></td><td><a>" + obj.CONTRACTOR_MOBILE + " </a></td><td><a>" + obj.CONTRACTOR_NAME + "</a></td><td>" + obj.DRIVER_NAME + "</td><td style='text-align:center'>" + obj.DRIVER_MOBILENUMBER + "</td><td style='text-align:center'>" + obj.VEHICLE_NO + "</td></tr>";


			}
			$("#veh_mycsttab" + vehd_custid).html(veh_details + '<tbody><table>');

		}
	});
}

function closebtn_veh(sn1_veh) {
	if (sn1_veh != 0 || sn1_veh == undefined) {
		this.$("#veh_li" + sn1_veh).remove('');
		this.$("#veh_mycsttab" + sn1_veh).remove('');
	} else {

		this.$("#veh_li" + sn1_veh).show();
		this.$("#veh_mycsttab" + sn1_veh).show();
	}


}


$("#icloseVehicle").click(function () {
	$('#vehicle_register_show').hide();
});
$("#icloseContractor").click(function () {
	$('#ContractorDetails_show').hide();
});