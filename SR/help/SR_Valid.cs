using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Xml;

namespace SR.help
{
	public class SR_Valid
	{
		SR_Security _Security = new SR_Security(); Sandget sandget = new Sandget();

		//int checkuser;//check user 0=invalid passwowrd or 1=valid
		//int userstatus;//user active status 0 regis/1 active/2 Deactive user/3 Lock user
		//int loginatempt;//user attempt
		public string DecryptStringAES(string encryptedValue)
		{
			var keybytes = Encoding.UTF8.GetBytes("6523987412365448");
			var iv = Encoding.UTF8.GetBytes("6523987412365448");
			var encrypted = Convert.FromBase64String(encryptedValue);
			var decriptedFromJavascript = DecryptStringFromBytes(encrypted, keybytes, iv);
			return decriptedFromJavascript;
		}

		private static string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
		{
			// Check arguments.
			if (cipherText == null || cipherText.Length <= 0)
			{
				throw new ArgumentNullException("cipherText");
			}
			if (key == null || key.Length <= 0)
			{
				throw new ArgumentNullException("key");
			}
			if (iv == null || iv.Length <= 0)
			{
				throw new ArgumentNullException("key");
			}

			// Declare the string used to hold
			// the decrypted text.
			string plaintext = null;

			// Create an RijndaelManaged object
			// with the specified key and IV.
			using (var rijAlg = new RijndaelManaged())
			{
				//Settings
				rijAlg.Mode = CipherMode.CBC;
				rijAlg.Padding = PaddingMode.PKCS7;
				rijAlg.FeedbackSize = 128;

				rijAlg.Key = key;
				rijAlg.IV = iv;

				// Create a decrytor to perform the stream transform.
				var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

				// Create the streams used for decryption.
				using (var msDecrypt = new MemoryStream(cipherText))
				{
					using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
					{
						using (var srDecrypt = new StreamReader(csDecrypt))
						{
							// Read the decrypted bytes from the decrypting stream
							// and place them in a string.
							plaintext = srDecrypt.ReadToEnd();
						}
					}
				}
			}

			return plaintext;
		}


		public dynamic Check_login(E_Login root)
		{
			Login_return Login_return = new Login_return();
			string logdata = JsonConvert.SerializeObject(root);
			string mappath = HttpContext.Current.Server.MapPath("Logs");
			Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata, mappath, root.Username));
			DataTable Dtt,Dt = new DataTable();

			Dtt = sandget.APMDC_SP_GET_CAPTCHA(root);
			if (Dtt != null && Dtt.Rows.Count > 0)
			{

				

				//if (Dt.Rows[0]["USER_ROLE"].ToString() == "0")
				//{
				//	Login_return.code = "0";
				//	Login_return.message = "valid User";
				//	Login_return.url = "Welcome.htm";
				//	return Login_return;
				//}




				//string username = _Security.Encrypt(root.username,"");
				//string username1 = _Security.Decrypt(username, "");
				Dt = sandget.APMDC_SP_GET_USER_MASTER(root);
				foreach (DataRow dr in Dt.Rows)
				{
					Login_return.Userid = SR_Security.Encrypt(Dt.Rows[0]["USER_ROLE"].ToString() + "^" + Dt.Rows[0]["USER_MOBILE"].ToString() + "^" + Dt.Rows[0]["USER_DISTRICT_ID"].ToString() + "^" + Dt.Rows[0]["USER_NAME"].ToString() + "^" + Dt.Rows[0]["USER_DESIGNATION"].ToString() + "^" + root.Confor, "");
					Login_return.District = Dt.Rows[0]["USER_DISTRICT_ID"].ToString();
					// Login_return.name = Dt.Rows[0]["USER_NAME"].ToString();
					Login_return.Designation = Dt.Rows[0]["USER_DESIGNATION"].ToString();
					Login_return.Code = Dt.Rows[0]["USER_ROLE"].ToString();
				}
				if (Dt.Rows[0][0].ToString() != "0")
				{
					if (Dt != null && Dt.Rows.Count > 0)
					{
						Login_return.Message = "suc";
						Login_return.Url = "Dashboard";
						Login_return.Name = Dt.Rows[0]["USER_NAME"].ToString();
						return Login_return;

					}
					else
					{
						Login_return.Code = "99";
						Login_return.Message = "invalid username/password(please contact department)";
						Login_return.Url = "GuestLogin.htm";
						return Login_return;
					}
				}
				else
				{
					Login_return.Code = "99";
					Login_return.Message = "invalid username/password(please contact department)";
					Login_return.Url = "login.aspx";
					return Login_return;
				}

			}
			else
			{
				Login_return.Code = "999";
				Login_return.Message = "invalid captch code(please enter valid code)";
				Login_return.Url = "";
				return Login_return;
			}
			//return Login_return;
		}
	}
}