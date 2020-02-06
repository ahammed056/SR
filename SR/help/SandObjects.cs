using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SR.help
{
	
		public class Dist
		{
			public string District_code { get; set; }
			public string District_name { get; set; }

		}
		public class Getdist
		{
			public string Code { set; get; }
			public string Message { set; get; }
			public List<Dist> Distli { set; get; }
		}

		public class Load_district
		{
			public string Username { get; set; }
			public string FDISTRICT { get; set; }
			public string RDISTRICT { get; set; }

			public string P_admg_office { get; set; }
			public string FMANDAL { get; set; }
			public string FRURAL_URBAN { get; set; }
			public int FTYPE { get; set; }
			public int FCOUNT { get; set; }
			public string FSTOCKYARDID { get; set; }
			public string FSANDQUANTY { get; set; }
			public string F_ORDERID { get; set; }

			public string REQUESTIP { get; set; }
			public string Browser { get; set; }
			public string SOURCE { get; set; }
			public string Flat { get; set; }
			public string Flong { get; set; }
			public string Fgeoaddres { get; set; }
			public string FCODE { get; set; }
			public string FROMDATE { get; set; }
			public string TODATE { get; set; }
			public string IMEI_IP { get; set; }
			public string FSchQUANTY { get; set; }
			public string F_SCH_NO { get; set; }
			public string Remarks { get; set; }
			public string Trips { get; set; }
			public string P_ACT_STA { get; set; }
			public string F_Open_Bal { get; set; }
			public string SHIFTS { get; set; }
			public int Qrcode { get; set; }
			public string Tid { get; set; }
			public string P_TIMESTAMP { get; set; }
			public string P_Date { get; set; }
			public string FID { get; set; }
			public double QUANTY { get; set; }
			public string P_updatedby { get; set; }
			public string P_transactionid { get; set; }

			public string FCONTACTNO { get; set; }
			public string F_LOGINNO { get; set; }

			public string FSTOCKNAME { get; set; }
			public string FGPWARD { get; set; }
			public string FUID { get; set; }
			public string FUSER_LAND_MARK { get; set; }
			public string FUSER_ADDRESS { get; set; }
			public string FUSER_PINCODE { get; set; }
			public string Date { get; set; }
			public string Yest_Close { get; set; }
			public string Fcluster_id { get; set; }
			public string Fstockyard_id { get; set; }
			public string Fcontractor_id { get; set; }
			public string P_hours { get; set; }
		public int P_type { get => p_type; set => p_type = value; }
		public string P_cluster_id { get => p_cluster_id; set => p_cluster_id = value; }
		public string P_stockyard_id { get => p_stockyard_id; set => p_stockyard_id = value; }
		public string P_permit_quantity { get => p_permit_quantity; set => p_permit_quantity = value; }
		public int P_district_id { get => p_district_id; set => p_district_id = value; }

		private int p_type, p_district_id;
		private string  p_cluster_id, p_stockyard_id, p_permit_quantity;

	}
	public class Captch
	{
		public string Id { get; set; }
		public string Capchid { get; set; }
		public string REQUESTIP { get; set; }
		public string Browser { get; set; }
		public string SOURCE { get; set; }
		public string Flat { get; set; }
		public string Flong { get; set; }
		public string Fgeoaddres { get; set; }
	}
	public class E_return
	{
		public string Code { get; set; }
		public string Message { get; set; }
		public string Url { get; set; }
		public string Id { get; set; }
		public string Check { get; set; }
	}

	public class E_drop : Otprequest
	{
		public string Username { get; set; }
		public string FDISTRICT { get; set; }
		public string RDISTRICT { get; set; }


		public string P_admg_office { get; set; }
		public string FMANDAL { get; set; }
		public string FRURAL_URBAN { get; set; }
		public int FTYPE { get; set; }
		public int FCOUNT { get; set; }
		public string FSTOCKYARDID { get; set; }
		public string FSANDQUANTY { get; set; }
		public string F_ORDERID { get; set; }

		public string REQUESTIP { get; set; }
		public string Browser { get; set; }
		public string SOURCE { get; set; }
		public string Flat { get; set; }
		public string Flong { get; set; }
		public string Fgeoaddres { get; set; }
		public string FCODE { get; set; }
		public string FROMDATE { get; set; }
		public string TODATE { get; set; }
		public string IMEI_IP { get; set; }
		public string FSchQUANTY { get; set; }
		public string F_SCH_NO { get; set; }
		public string Remarks { get; set; }
		public string Trips { get; set; }
		public string P_ACT_STA { get; set; }
		public string F_Open_Bal { get; set; }
		public string SHIFTS { get; set; }
		public int Qrcode { get; set; }
		public string Tid { get; set; }
		public string P_TIMESTAMP { get; set; }
		public string P_Date { get; set; }
		public string FID { get; set; }
		public double QUANTY { get; set; }
		public string P_updatedby { get; set; }
		public string P_transactionid { get; set; }

		public string FCONTACTNO { get; set; }
		public string F_LOGINNO { get; set; }

		public string FSTOCKNAME { get; set; }
		public string FGPWARD { get; set; }
		public string FUID { get; set; }
		public string FUSER_LAND_MARK { get; set; }
		public string FUSER_ADDRESS { get; set; }
		public string FUSER_PINCODE { get; set; }
		public string Date { get; set; }
		public string Yest_Close { get; set; }



	}
	public class Otprequest
	{

		public int OTYPE { get; set; }
		public int E_OTP { get; set; }
		public string E_OPT_MOBILE_NUMBER { get; set; }
		public string E_OTP_CAPTUERBY { get; set; }
		public string E_OTP_browser { get; set; }
		public string E_OTP_SOURCE { get; set; }
		public string E_OTP_IMENO_IP { get; set; }
		public string E_OTP_CAP_LAT { get; set; }
		public string E_OTP_CAP_LONG { get; set; }
		public string E_OTP_CAP_GEOADDRESS { get; set; }
		public int E_type { get; set; }
		public string E_message { get; set; }
		public string E_screen { get; set; }    
	}

	public class Captchgens
	{
		public string Idval { get; set; }
		public string Imgurl { get; set; }
		public string Code { get; set; }


	}
	public class E_Login
	{
		public string Username { get; set; }
		public string Password { get; set; }
		public string Role { get; set; }
		public int FTYPE { get; set; }
		public string REQUESTIP { get; set; }
		public string Browser { get; set; }
		public string SOURCE { get; set; }
		public string Confor { get; set; }
		public string Conforid { get; set; }
		public string Flat { get; set; }
		public string Flong { get; set; }
		public string Fgeoaddres { get; set; }
		public string Version { get; set; }

	}
	public class Login_return
	{

		public string Userid { get; set; }
		public string District { get; set; }
		public string Name { get; set; }
		public string Designation { get; set; }
		public string Code { get; set; }
		public string Message { get; set; }
		public string Sandt { get; set; }
		public string Url { get; set; }
		public int P_checkuser { get; set; }
		public int P_userstatus { get; set; }
		public int P_loginatempt { get; set; }




	}
	public class Gettbluserlogs
	{
		public string Code { set; get; }
		public string Message { set; get; }
		public List<Tbluserlogs> Tbluserlogsli { set; get; }
	}
	public class Tbluserlogs
	{
		public string USER_ID { get; set; }
		public string Browser { get; set; }
		public string IP_IMENO { get; set; }
		public string SOURCE { get; set; }
		public string LAT { get; set; }
		public string LOG_LONG { get; set; }
		public string GEOADDRESS { get; set; }
		public string CAPTUERDATETIME { get; set; }
		public string STATUS { get; set; }
		public string REMARKS { get; set; }
	}
}