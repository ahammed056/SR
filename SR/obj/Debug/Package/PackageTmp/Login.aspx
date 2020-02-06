<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="SR.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login :: Door Delivery </title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="icon" type="image/png" href="images/ap-logo.png"/>

	<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">

	<link rel="stylesheet" type="text/css" href="../fonts/iconic/css/material-design-iconic-font.min.css">
<link rel="stylesheet" href="../lobi/lib/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="../css/Login.css">
</head>
<body>
    <form id="form1" runat="server">
		   <div class="bgoverlay">
            <div class="spinner"></div>
        </div>
	<div class="limiter loginbg">
		<div class="container-login100" style="background-image: url('../img/1223.jpg');">
			<div class="wrap-login100">
				<div class="login100-form validate-form">
					<span class="login100-form-logo">
						<img src="../img/ap-logo.png" style="width: 100%;">
					</span>
                    
					<span class="login100-form-title p-b-34 p-t-27">
						Log in
					</span>
						 <p id="capid" style="display: none"></p>
                                <span id="ipget" style="display: none" runat="server"></span>
                                <span id="brow" style="display: none" runat="server"></span>
                                <div class="form-group">
                                    <p id="mesg" style="color: red"></p>
                                </div>
					<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<input class="input100" id="Username" type="text" name="username" placeholder="Username" autocomplete="off"/>
						<span class="focus-input100" data-placeholder="&#xf207;" id="basic-addon1" ></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" id="Password" type="password" name="pass" placeholder="Password">
						<span class="focus-input100" data-placeholder="&#xf183;" id="basic-addon3"></span>
					</div>

					<!--<div class="wrap-input100 validate-input" data-validate="Enter password">
						<button class="btn btn-success">
							<span class="focus-input100" data-placeholder="&#xf1b5;"></span>
						</button>
                    </div>-->
					<div class="form-group ">
                                <div class="row">

                                    <div class="col-md-3 col-sm-3 col-3 alphanumeric">
                                        <label class="col-form-label text-white" for="customRadioInline1" style="font-size: large; color: black; font-weight: 600; vertical-align: middle;">Captcha</label>
                                    </div>

                                    <div class="col-md-2 col-sm-2 col-2">
                                        <button type="button" class="btn btn-light refresh-cstm" value="Refresh"  id="refresh"><i class="fa fa-refresh"></i></button>

                                    </div>
                                    <div class="col-md-7 col-sm-7 col-7">
                                        <table id="captchdis">
                                            <tbody><tr></tr></tbody>
                                        </table>
                                        <%--<p id="capref" style="display: none;"></p>--%>
                                    </div>
                                </div>
                            </div>
                    <div class="wrap-input100 validate-input" data-validate="Enter captcha">
						<input  class="input100" id="Conformation" type="captcha" name="captcha" placeholder="Enter Captcha" autocomplete="off">
						<span class="focus-input100" data-placeholder="&#xf267;" id="basic-addon4"></span>
					</div>
					<div class="container-login100-form-btn">
						 
						<a href="#" id="Login" class="login100-form-btn">Login</a>
					</div>

				
				</div>
			</div>
		</div>
	</div>
		   </form>

    <script src="../js/SR_Common.js"></script>
 
    <script src="../js/SR_Support.js"></script>
    <script src="../js/SR_Login.js"></script>
	 <script type="text/javascript">
        !function () {
            setTimeout(function () {
                $('.bgoverlay').css('display', 'none').one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                });
            }, 400);
        }();
    </script>
</body>
</html>
