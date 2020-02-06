using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Web;
using Oracle.ManagedDataAccess.Client;


namespace SR.help
{
	public class Sandget
	{

		public DataTable result_tbl = null;
		OracleConnection con = new OracleConnection("Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=apexadata-scan1.apsdc.ap.gov.in)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=APSPS16)));User Id=apmdc;Password=apmdc"); //130                                                                                                                                                                                                                                   //OracleConnection con = new OracleConnection("Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=10.10.35.69)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=FARMER)));User Id=content_management;Password=content_management"); //131
		OracleCommand cmd, conm; DataTable data = new DataTable();
		public dynamic APMDC_SP_GET_Districts_Rural_Muncipal_Mandal_Village(Load_district obj)
		{
			try
			{
				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "APMDC_SP_MAINDISTRICTMASTER";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int32).Value = obj.FTYPE;
				cmd.Parameters.Add("FDISTRICT", OracleDbType.Varchar2).Value = obj.FDISTRICT;
				cmd.Parameters.Add("FMANDAL", OracleDbType.Varchar2).Value = obj.FMANDAL;
				cmd.Parameters.Add("FRURAL_URBAN", OracleDbType.Varchar2).Value = obj.FRURAL_URBAN;
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);
				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}

			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}
		/// <summary>
		/// this function is used to get the values from DB for sand today quantites and their cumalatives written by kumar reddy
		/// </summary>
		/// <param name="obj"> to pass object type districit and to date and from date</param>
		/// <returns></returns>
		public dynamic SandTransportReports_Get_sp(Load_district obj)
		{
			try
			{


				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "apmdc_Doordelivery_dashboard";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int16).Value = obj.FTYPE;
				cmd.Parameters.Add("FDISTRICT", OracleDbType.Int16).Value = (obj.FDISTRICT == "null" ? "" : (obj.FDISTRICT));
				//cmd.Parameters.Add("fdate ", OracleDbType.Date).Value = ConvertDateFormat(obj.FROMDATE);
				cmd.Parameters.Add("f_from_date", OracleDbType.Date).Value = ConvertDateFormat(obj.FROMDATE);
				cmd.Parameters.Add("f_to_date", OracleDbType.Date).Value = ConvertDateFormat(obj.TODATE);
				cmd.Parameters.Add("fquantity", OracleDbType.Varchar2).Value = (obj.FSANDQUANTY == "null" ? "" : (obj.FSANDQUANTY));
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);
				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}




		public dynamic Get_contractor_details_sp(Load_district obj)
		{
			try
			{


				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "apmdc_Doordelivery_dashboard";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int16).Value = obj.FTYPE;
				cmd.Parameters.Add("FDISTRICT", OracleDbType.Int16).Value = (obj.FDISTRICT == "null" ? "" : (obj.FDISTRICT));
				//cmd.Parameters.Add("fdate ", OracleDbType.Date).Value = ConvertDateFormat(obj.FROMDATE);
				cmd.Parameters.Add("f_from_date", OracleDbType.Date).Value = ConvertDateFormat(obj.FROMDATE);
				cmd.Parameters.Add("f_to_date", OracleDbType.Date).Value = ConvertDateFormat(obj.TODATE);
				cmd.Parameters.Add("fquantity", OracleDbType.Varchar2).Value = obj.FSANDQUANTY;
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);
				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}
		/// <summary>
		/// this function is used to get the values from DB for sand Stock Yard and their cumalatives  written by Ahammed syed 20 01 2020
		/// </summary>
		/// <param name="obj"  //fcluster_id,fstockyard_id></param>
		/// <returns></returns>
		public dynamic SandTransportReports_Get_sp_StockYard(Load_district obj)
		{
			try
			{
				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "apmdc_Doordelivery_dashboard1";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int16).Value = obj.FTYPE;
				cmd.Parameters.Add("FDISTRICT", OracleDbType.Int16).Value = (obj.FDISTRICT == "null" ? "" : (obj.FDISTRICT));
				//cmd.Parameters.Add("fdate ", OracleDbType.Date).Value = ConvertDateFormat(obj.FROMDATE);
				cmd.Parameters.Add("f_from_date", OracleDbType.Date).Value = ConvertDateFormat(obj.FROMDATE);
				cmd.Parameters.Add("f_to_date", OracleDbType.Date).Value = ConvertDateFormat(obj.TODATE);
				cmd.Parameters.Add("fquantity", OracleDbType.Varchar2).Value = (obj.FSANDQUANTY == "null" ? "" : (obj.FSANDQUANTY));
				cmd.Parameters.Add("fcluster_id", OracleDbType.Varchar2).Value = (obj.Fcluster_id == "null" ? "" : (obj.Fcluster_id));
				cmd.Parameters.Add("fstockyard_id", OracleDbType.Varchar2).Value = (obj.Fstockyard_id == "null" ? "" : (obj.Fstockyard_id));
				cmd.Parameters.Add("fcontractor_id", OracleDbType.Varchar2).Value = (obj.Fcontractor_id == "null" ? "" : (obj.Fcontractor_id));
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);
				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}
			catch (Exception ex)
				{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}



		public dynamic PerhourDisplay_sp(Load_district obj)
		{
			try
			{
				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "apmdc_Doordelivery_dashboard1";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int16).Value = obj.FTYPE;
				cmd.Parameters.Add("FDISTRICT", OracleDbType.Int16).Value = (obj.FDISTRICT == "null" ? "" : (obj.FDISTRICT));
				//	cmd.Parameters.Add("f_from_date", OracleDbType.Date).Value = (obj.FROMDATE == "null" ? (obj.FROMDATE)DBNull.Value : (obj.FROMDATE));


				cmd.Parameters.Add("f_from_date", OracleDbType.Date).Value = DBNull.Value;



				cmd.Parameters.Add("f_to_date", OracleDbType.Date).Value = DBNull.Value; //(ConvertDateFormat(obj.TODATE));
				cmd.Parameters.Add("fquantity", OracleDbType.Varchar2).Value = (obj.FSANDQUANTY == "null" ? "" : (obj.FSANDQUANTY));
				cmd.Parameters.Add("fcluster_id", OracleDbType.Varchar2).Value = (obj.Fcluster_id == "null" ? "" : (obj.Fcluster_id));
				cmd.Parameters.Add("fstockyard_id", OracleDbType.Varchar2).Value = (obj.Fstockyard_id == "null" ? "" : (obj.Fstockyard_id));
				cmd.Parameters.Add("fcontractor_id", OracleDbType.Varchar2).Value = (obj.Fcontractor_id == "null" ? "" : (obj.Fcontractor_id));
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);
				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}

		public dynamic PerhourDisplay_hour_sp(Load_district obj)
		{
			try
			{
				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "apmdc_Doordelivery_dashboard1";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int16).Value = obj.FTYPE;
				cmd.Parameters.Add("FDISTRICT", OracleDbType.Int16).Value = (obj.FDISTRICT == "null" ? "" : (obj.FDISTRICT));
				cmd.Parameters.Add("f_from_date", OracleDbType.Date).Value = DBNull.Value;
				cmd.Parameters.Add("f_to_date", OracleDbType.Date).Value = DBNull.Value; 
				cmd.Parameters.Add("fquantity", OracleDbType.Varchar2).Value = (obj.FSANDQUANTY == "null" ? "" : (obj.FSANDQUANTY));
				cmd.Parameters.Add("fcluster_id", OracleDbType.Varchar2).Value = (obj.Fcluster_id == "null" ? "" : (obj.Fcluster_id));
				cmd.Parameters.Add("fstockyard_id", OracleDbType.Varchar2).Value = (obj.Fstockyard_id == "null" ? "" : (obj.Fstockyard_id));
				cmd.Parameters.Add("fcontractor_id", OracleDbType.Varchar2).Value = (obj.Fcontractor_id == "null" ? "" : (obj.Fcontractor_id));
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);
				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}

		}





		private DateTime ConvertDateFormat(string strdate)
		{
			try
			{

				string dateformat = strdate;
				dateformat = dateformat.Replace("/", "-");
				DateTime dt1 = DateTime.ParseExact(dateformat, "dd-MM-yyyy", CultureInfo.InvariantCulture);


				return dt1;
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message + ":Invalid Date Format" + strdate);
			}
		}


		//captch


		public bool Ins_update_Delete(OracleCommand cmd, string keyarea)
		{
			try
			{

				con.Open();
				cmd.ExecuteNonQuery();
				con.Close();
				cmd.Dispose();
				return true;
			}
			catch (Exception)
			{
				if (con.State == ConnectionState.Open)
				{
					con.Close();
				}
				if (cmd != null)
				{
					cmd.Dispose();
				}
				return false;
			}
		}
		public bool APMDC_SP_IN_CAPTCHA(Captch root)
		{
			string sandpro = @"APMDC_SP_IN_CAPTCHA";
			conm = new OracleCommand(sandpro, con);
			conm.Parameters.Add(":p_ID", OracleDbType.Varchar2, 4000).Value = root.Id;
			conm.Parameters.Add(":p_CAPTCHA", OracleDbType.Varchar2, 4000).Value = root.Capchid;
			conm.Parameters.Add(":p_CAPTCHA_SOURCE", OracleDbType.Varchar2, 4000).Value = root.SOURCE;
			conm.Parameters.Add(":p_CAPTCHA_IMENO_IP", OracleDbType.Varchar2, 4000).Value = root.REQUESTIP;
			conm.Parameters.Add(":p_CAPTCHA_CAP_LAT", OracleDbType.Varchar2, 4000).Value = root.Flat;
			conm.Parameters.Add(":p_CAPTCHA_CAP_LONG", OracleDbType.Varchar2).Value = root.Flong;
			conm.Parameters.Add(":p_CAPTCHA_CAP_GEOADDRESS", OracleDbType.Varchar2, 4000).Value = root.Fgeoaddres;
			conm.CommandType = CommandType.StoredProcedure;
			return Ins_update_Delete(conm, "");

		}
		public dynamic APMDC_SP_GET_CAPTCHA(E_Login obj)
		{
			try
			{
				data.Reset(); data.Clear();
				string fid = SR_Security.Decrypt(obj.Conforid, "");
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "APMDC_SP_GET_CAPTCHA";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int32).Value = 1;
				cmd.Parameters.Add("FID", OracleDbType.Varchar2).Value = fid;
				cmd.Parameters.Add("FCAPTCHA", OracleDbType.Varchar2).Value = obj.Confor;
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);



				oda.Fill(data);
				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}

			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}
		public dynamic APMDC_SP_GET_USER_MASTER(E_Login obj)
		{
			try
			{
				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "APMDC_SP_GET_USER_Login1";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int32).Value = 1;
				cmd.Parameters.Add("FCUSTOMERID", OracleDbType.Varchar2).Value = obj.Username;
				cmd.Parameters.Add("FPASSWORD", OracleDbType.Varchar2).Value = obj.Password;
				cmd.Parameters.Add("F_BROWSER", OracleDbType.Varchar2).Value = obj.Browser;
				cmd.Parameters.Add("F_IP_IME", OracleDbType.Varchar2).Value = obj.REQUESTIP;
				cmd.Parameters.Add("F_SOURCE", OracleDbType.Varchar2).Value = obj.SOURCE;
				cmd.Parameters.Add("F_TOKEN", OracleDbType.Varchar2).Value = obj.Confor;
				cmd.Parameters.Add("F_LAT", OracleDbType.Varchar2).Value = obj.Flat;
				cmd.Parameters.Add("F_LONG", OracleDbType.Varchar2).Value = obj.Flong;
				cmd.Parameters.Add("F_GEOADDRESS", OracleDbType.Varchar2).Value = obj.Fgeoaddres;
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);

				oda.Fill(data);

				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}

			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}




		//user split
		public string GetUSerdetials(string USerid)
		{


			string idsplit = SR_Security.Decrypt(USerid, "");
			string[] id = idsplit.Split('^');
			return id[1].ToString();
		}
		public dynamic APMDC_SP_GET_LOGIN_LOGS(E_drop obj)
		{
			try
			{
				string userid = GetUSerdetials(obj.Username);
				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "APMDC_SP_GET_LOGIN_LOGS";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int32).Value = obj.FTYPE;
				cmd.Parameters.Add("FCOUNT", OracleDbType.Int32).Value = obj.FCOUNT;
				cmd.Parameters.Add("FUSER", OracleDbType.Varchar2).Value = userid;
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);

				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}

			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}


		public dynamic SandTransportReports_72Hours_sp(Load_district obj)
		{
			try
			{


				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "apmdc_pk_dash_board.not_delivered_after_72_hours";
				cmd.Parameters.Add("p_type", OracleDbType.Int16).Value = obj.P_type;
				//cmd.Parameters.Add("p_district_id", OracleDbType.Int16).Value = obj.FTYPE;
				cmd.Parameters.Add("p_district_id", OracleDbType.Int16).Value = obj.P_district_id;// == 1 ? DBNull.Value : (obj.P_district_id));
				cmd.Parameters.Add("P_cluster_id ", OracleDbType.Varchar2).Value = (obj.P_cluster_id == "null" ? "" : (obj.P_cluster_id));
				cmd.Parameters.Add("P_stockyard_id", OracleDbType.Varchar2).Value = (obj.P_stockyard_id == "null" ? "" : (obj.P_stockyard_id));
				cmd.Parameters.Add("p_permit_quantity", OracleDbType.Varchar2).Value = (obj.P_permit_quantity == "null" ? "" : (obj.P_permit_quantity));
				cmd.Parameters.Add("p_ref_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);
				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}


		}

		//public dynamic APMDC_SP_GET_USER_SESSION_CHK(E_Login obj)
		//{
		//	try
		//	{

		//		data.Reset(); data.Clear();
		//		con.Open();
		//		cmd = new OracleCommand();
		//		cmd.Connection = con;
		//		cmd.InitialLONGFetchSize = 1000;
		//		cmd.CommandType = CommandType.StoredProcedure;
		//		cmd.CommandText = "APMDC_SP_GET_USER_SESSION_CHK";
		//		cmd.Parameters.Add("FTYPE", OracleDbType.Int32).Value = obj.FTYPE;
		//		cmd.Parameters.Add("FCUSTOMERID", OracleDbType.Varchar2).Value = obj.Username;
		//		cmd.Parameters.Add("F_BROWSER", OracleDbType.Varchar2).Value = obj.Browser;
		//		cmd.Parameters.Add("F_IP_IME", OracleDbType.Varchar2).Value = obj.REQUESTIP;
		//		cmd.Parameters.Add("F_SOURCE", OracleDbType.Varchar2).Value = obj.SOURCE;
		//		cmd.Parameters.Add("F_TOKEN", OracleDbType.Varchar2).Value = obj.Password;
		//		cmd.Parameters.Add("F_LAT", OracleDbType.Varchar2).Value = obj.Flat;
		//		cmd.Parameters.Add("F_LONG", OracleDbType.Varchar2).Value = obj.Flong;
		//		cmd.Parameters.Add("F_GEOADDRESS", OracleDbType.Varchar2).Value = obj.Fgeoaddres;
		//		cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
		//		OracleDataAdapter oda = new OracleDataAdapter(cmd);
		//		oda.Fill(data);

		//		if (data != null && data.Rows.Count > 0)
		//		{
		//			return data;
		//		}
		//		else
		//		{
		//			return data;
		//		}
		//	}

		//	catch (Exception ex)
		//	{
		//		return ex.Message;
		//	}
		//	finally
		//	{
		//		con.Close();
		//		cmd.Dispose();
		//	}



		//}

		public dynamic APMDC_SP_GET_USER_SESSION_CHK(E_Login obj)
		{
			try
			{

				data.Reset(); data.Clear();
				con.Open();
				cmd = new OracleCommand();
				cmd.Connection = con;
				cmd.InitialLONGFetchSize = 1000;
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.CommandText = "APMDC_SP_GET_USER_SESSION_CHK";
				cmd.Parameters.Add("FTYPE", OracleDbType.Int32).Value = obj.FTYPE;
				cmd.Parameters.Add("FCUSTOMERID", OracleDbType.Varchar2).Value = obj.Username;
				cmd.Parameters.Add("F_BROWSER", OracleDbType.Varchar2).Value = obj.Browser;
				cmd.Parameters.Add("F_IP_IME", OracleDbType.Varchar2).Value = obj.REQUESTIP;
				cmd.Parameters.Add("F_SOURCE", OracleDbType.Varchar2).Value = obj.SOURCE;
				cmd.Parameters.Add("F_TOKEN", OracleDbType.Varchar2).Value = obj.Password;
				cmd.Parameters.Add("F_LAT", OracleDbType.Varchar2).Value = obj.Flat;
				cmd.Parameters.Add("F_LONG", OracleDbType.Varchar2).Value = obj.Flong;
				cmd.Parameters.Add("F_GEOADDRESS", OracleDbType.Varchar2).Value = obj.Fgeoaddres;
				cmd.Parameters.Add("P_CUR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
				OracleDataAdapter oda = new OracleDataAdapter(cmd);
				oda.Fill(data);

				if (data != null && data.Rows.Count > 0)
				{
					return data;
				}
				else
				{
					return data;
				}
			}

			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				con.Close();
				cmd.Dispose();
			}



		}

	}
}