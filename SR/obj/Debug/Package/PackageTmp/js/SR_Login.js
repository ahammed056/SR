//import { Session } from "inspector";

$(document).ready(function () {
    gettoken();
    
});

function gettoken() {
    var log = "{REQUESTIP:'" + $("#ipget").text() + "'}";
    var Encr = "";
    Encr = Encryption(log);
    var sendata = "{data:'" + Encr + "'}";
    if (Encr != null && Encr != "") {
        _Sand_plain("../gtsand", sendata, function (a) {
			"" != a && sessionStorage.setItem("opendt", a.code);
			Callcap();
        });
    }
    else {
        _n_plain_mes_1("<strong>alert!</strong>", "something went worng", "warning"); return;
    }
}





$(function () {
    $("#refresh").click(function () {
        $('.bgoverlay').css('display', '');
        gettoken();
        Callcap();

    });
});

function Callcap() {
    var obj = "{REQUESTIP:'" + $("#ipget").text() + "',browser:'" + $("#brow").text() + "',SOURCE:'WEB-De'}";
	_Sand_Auth_1("../captchsand", obj, function (res) {
		console.log(res);
		if (res.Code == "100") {
			$('.bgoverlay').css('display', 'none');
			$("#capid").html('');
			$('#Conformation').val('');
			$("#capid").html(res.Idval);
			$("#captchdis tr").remove();
			var img = $("<img>", { "id": res.Idval, "src": "data:image/Gif;base64," + res.Imgurl, "width": "90px", "height": "40px" });
			var rowget = $('<tr></tr>').append('<td></td>').html(img);
            $("#captchdis tbody").append(rowget);
		}
		else {
			return;
		}
    });
}

function clear() {
    $("#mesg").text('');
}

$(function () {
	$("#Login").click(function () {
		

        if ($('#Username').val() == '') {

            _n_plain_mes_1("<strong>alert!</strong>", "please enter username", "warning"); $("#Username").focus(); return;
        }
        else if ($('#Username').val().length < 5) {

            _n_plain_mes_1("<strong>alert!</strong>", "please enter valid username", "warning"); $("#Username").focus(); return;
        }
        else if ($('#Password').val() == '') {
            _n_plain_mes_1("<strong>alert!</strong>", "please enter password", "warning"); $("#Password").focus(); return;

        }
        else if ($('#Password').val().length < 5) {
            _n_plain_mes_1("<strong>alert!</strong>", "please enter valid password", "warning"); $("#Password").focus(); return;

        }
        else if ($('#Conformation').val() == '') {
            _n_plain_mes_1("<strong>alert!</strong>", "please enter confirmation code", "warning"); $("#Conformation").focus(); return;

        }
        //else if ($("#ipget").text() == '') {
        //    _n_plain_mes_1("<strong>alert!</strong>", "please update your browser version", "warning"); $("#ipget").text().focus(); return;

        //}
        //else if ($("#brow").text() == '') {
        //    _n_plain_mes_1("<strong>alert!</strong>", "please update your browser version", "warning"); $("#brow").text().focus(); return;

        //}
		else {		 
            if ($('#Username').val() != '' && $('#Password').val() != '') {
				var url = "../LoginDasboard";
				var obj = "{Username:'" + $('#Username').val() + "',password:'" + $('#Password').val() + "',REQUESTIP:'" + $("#ipget").text() + "',browser:'" + $("#brow").text() + "',SOURCE:'WEB',Confor:'" + $('#Conformation').val() + "',Conforid:'" + $('#capid').text() + "'}";
				_Sand_plain("../LoginDasboard", obj, function (res) {
					console.log(res);
					if (res.Message == 'suc') {
                        sessionStorage.setItem('Userid', res.Userid);
                        sessionStorage.setItem('Name', res.Name);
                        window.location = res.Url;
					}
                    else if (res.Code == '99') {
						$('#Conformation').val('');
						_n_plain_mes_1("<strong>alert!</strong>", "Incorrect Password ", "warning"); return;
					}
                    else if (res.Code == '999') {
                        $('#Conformation').val('');
                        _n_plain_mes_1("<strong>alert!</strong>", "Invalid captha", "warning"); return;
					}
               });
            }
        }

    });
});