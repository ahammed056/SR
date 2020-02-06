using Newtonsoft.Json;
using SR.help;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SR.Controllers
{
    public class CommonController : ApiController
	{
		E_return EER = new E_return();
		Myvalid _valid = new Myvalid();
		[HttpPost]
		[Route("Districts")]
		public dynamic Districts(Load_district root)
		{
			try
			{
				return _valid.Check_get_districts(root);
			}
			catch (Exception)
			{
				return 0;
			}
		}


		/// <summary>
		/// this function is used to get the values from DB for sand today quantites and their cumalatives written by kumar reddy
		/// </summary>
		/// <param name="obj"> to pass object type districit and to date and from date</param>
		/// <returns></returns>
		[HttpPost]
		[Route("SandTransportReportsapi")]
		public dynamic SandTransportReportsapi(Load_district root)
		{
			try
			{

				return _valid.SandTransportReports_Get(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}

		[HttpPost]
		[Route("SandTransportReportsapi_Stockyard")]
		public dynamic SandTransportReportsapi_Stockyard(Load_district root)
		{
			try
			{

				return _valid.SandTransportReports_Get_Stockyard(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}

		[HttpPost]
		[Route("SandTransportReports_Get_for_total_orders")]
		public dynamic SandTransportReports_Get_for_total_orders(Load_district root)
		{
			try
			{

				return _valid.SandTransportReports_Get_for_total_orders_myvalid(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}


		[HttpPost]
		[Route("get_contractor_details")]
		public dynamic Get_contractor_details(Load_district root)
		{
			try
			{

				return _valid.Get_contractor_details(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}

		///Token Gen
		SR_Security _Security = new SR_Security(); SR_Valid valid = new SR_Valid();
		[HttpPost]
		[Route("gtsand")]
		public dynamic Gtsand(dynamic objrequest)
		{
			//E_return E_return = new E_return();
			var json = JsonConvert.SerializeObject(objrequest);
			dynamic obj = JsonConvert.DeserializeObject<ExpandoObject>(json);
			string root = valid.DecryptStringAES(obj.data);
			E_drop val = JsonConvert.DeserializeObject<E_drop>(root);
			try
			{
				EER.Code = _Security.OpenToken(val.REQUESTIP);
				return EER;

			}
			catch (Exception)
			{
				return EER;
			}
		}

		//captch gens

		[HttpPost]
		[Route("captchsand")]
		public dynamic Captchftr(Captch root)
		{
			try
			{

				return _Security.Check_s_captch(root);
			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "captchsand" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_E = new E_return();
				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		//login controllers

		[HttpPost]
		[Route("LoginDasboard")]
		public dynamic LoginDasboard(E_Login root)
		{
			//Loginhtm
			try
			{
				return valid.Check_login(root);
			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "Login" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		[HttpPost]
		[Route("gruserlogs")]
		public dynamic Gruserlogs(E_drop root)
		{
			try
			{

				return _valid.Check_get_userlogs(root);

			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "userlogs" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//	E_return E_return = new E_return();
				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		[HttpPost]
		[Route("PerhourDisplay_route")]
		public dynamic PerhourDisplay_route(Load_district root)
		{
			try
			{
				return _valid.PerhourDisplay_valid(root);
			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "userlogs" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//	E_return E_return = new E_return();
				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		[HttpPost]
		[Route("PerhourDisplay_hour_route")]
		public dynamic PerhourDisplay_hour_route(Load_district root)
		{
			try
			{
				return _valid.PerhourDisplay_hour_valid(root);
			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "userlogs" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//	E_return E_return = new E_return();
				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		[HttpPost]
		[Route("SandTransportReports_72Hours_Route")]
		public dynamic SandTransportReports_72Hours_Route(Load_district root)
		{
			try
			{

				return _valid.SandTransportReports_72Hours_valid(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}

		[HttpPost]
		[Route("DashboardSocket")]
		public dynamic DashboardSocket(E_Login root)
		{
			try
			{

				return _valid.check_get_user_session(root);

			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "websocket" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				E_return E_return = new E_return();
				E_return.Code = "99";
				E_return.Message = "something went wrong please contact admin";
				E_return.Url = "Error.htm";
				return E_return;
			}
		}
		





 



	}
}


