function _Sand_Auth(url, input, res) {
	
	$.ajax({
		type: "POST",
		url: url,		
		data: input,
		contentType: "application/json; charset=utf-8",
		success: function (response) {
			res(response);
		},
		error: function (request, statuss, error) {
			
			if (request.status === "0") {
				alert("<strong>connection refused</strong>", "please check network.. This site can’t be reached", "warning");
			}
		}

	});
}