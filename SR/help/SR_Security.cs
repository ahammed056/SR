using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Configuration;

namespace SR.help
{

	public class SR_Security
	{
		Sandget sandget = new Sandget();

		public string CreateToken(string user)
		{

			DateTime issuedAt = DateTime.UtcNow;
			DateTime expires = DateTime.UtcNow.AddMinutes(15);
			var tokenHandler = new JwtSecurityTokenHandler();
			ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
			{
				new Claim(ClaimTypes.Name, user)
			});

			const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
			var now = DateTime.UtcNow;
			var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
			var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);
			var token =
				(JwtSecurityToken)
					tokenHandler.CreateJwtSecurityToken(issuer: "suresh", audience: "Apsand",
						subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);


			var sureshgoud = token;
			var tokenString = tokenHandler.WriteToken(token);

			return tokenString;
		}
		public string OpenToken(string user)
		{

			DateTime issuedAt = DateTime.UtcNow;
			DateTime expires = DateTime.UtcNow.AddMinutes(180);
			var tokenHandler = new JwtSecurityTokenHandler();
			ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
			{
				new Claim(ClaimTypes.Name, DateTime.Now.Ticks.ToString())
			});

			const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
			var now = DateTime.UtcNow;
			var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
			var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);
			var token =
				(JwtSecurityToken)
					tokenHandler.CreateJwtSecurityToken(issuer: "suresh", audience: "Apsand",
						subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);


			var sureshgoud = token;
			var tokenString = tokenHandler.WriteToken(token);

			return tokenString;
		}
		public dynamic Check_s_captch(Captch root)
		{
			var ahammed = ConfigurationManager.AppSettings["myspace"].ToString();
			Captchgens retrn = new Captchgens();
			var ids = "";
			ids = DateTime.Now.Ticks.ToString();
			var serila = SerNumber();
			Bitmap objBitmap = new Bitmap(180, 100);
			Graphics objGraphics = Graphics.FromImage(objBitmap);
			objGraphics.Clear(Color.White);
			Random objRandom = new Random();
			objGraphics.DrawLine(Pens.White, objRandom.Next(0, 50), objRandom.Next(10, 30), objRandom.Next(0, 200), objRandom.Next(0, 50));
			objGraphics.DrawRectangle(Pens.White, objRandom.Next(0, 20), objRandom.Next(0, 20), objRandom.Next(50, 80), objRandom.Next(0, 20));
			objGraphics.DrawLine(Pens.White, objRandom.Next(0, 20), objRandom.Next(10, 50), objRandom.Next(100, 200), objRandom.Next(0, 80));
			Brush objBrush = default(Brush);
			HatchStyle[] aHatchStyles = new HatchStyle[]
			{
			   HatchStyle.LargeGrid, HatchStyle.LightDownwardDiagonal, HatchStyle.LightHorizontal
			};
			RectangleF oRectangleF = new RectangleF(0, 0, 300, 300);
			objBrush = new HatchBrush(aHatchStyles[objRandom.Next(aHatchStyles.Length - 3)], Color.FromArgb((objRandom.Next(100, 255)), (objRandom.Next(100, 255)), (objRandom.Next(100, 255))), Color.White);
			objGraphics.FillRectangle(objBrush, oRectangleF);
			string captchaText = string.Format("{0:X}", objRandom.Next(1000000, 9999999));
			Font objFont = new Font("Courier New", 28, FontStyle.Bold);
			objGraphics.DrawString(captchaText, objFont, Brushes.Black, 15, 30);
			objGraphics.Flush();
			objGraphics.Dispose();
			string fileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + ".Gif";
			objBitmap.Save(Path.Combine(HttpContext.Current.Server.MapPath(ahammed), ids + serila.ToString() + fileName), ImageFormat.Gif);


			root.Capchid = captchaText;
			root.Id = ids.ToString().Trim();

			//bool captchgen = true;
			bool captchgen = sandget.APMDC_SP_IN_CAPTCHA(root);
			if (captchgen == true)
			{

				byte[] imageBytes = System.IO.File.ReadAllBytes(Path.Combine(HttpContext.Current.Server.MapPath(ahammed), ids + serila + fileName));
				string base64String = Convert.ToBase64String(imageBytes);
				retrn.Idval = Encrypt(ids, "");

				retrn.Code = "100";
				retrn.Imgurl = base64String;

				DirectoryInfo diInfo = new DirectoryInfo(Path.Combine(HttpContext.Current.Server.MapPath(ahammed)));
				FileInfo[] files = diInfo.GetFiles();
				for (int i = 0; i < files.Length; i++)
				{
					string filePath = Path.Combine(HttpContext.Current.Server.MapPath(ahammed+"//" + files[i].ToString()));
					if (File.Exists(filePath))
					{
						File.Delete(filePath);
					}
				}
				return retrn;

			}
			else
			{
				retrn.Idval = "";
				retrn.Code = "99";
				retrn.Imgurl = "Error.htm";
				return retrn;
			}
		}
		public static string Encrypt(string strMessage, string sTokenKey)
		{
			return Convert.ToBase64String(Utilities.Encrypt(Encoding.UTF8.GetBytes(strMessage), Utilities.Suresh(sTokenKey)));
		}
		public static string Decrypt(string strEncMsg, string sTokenKey)
		{
			return Encoding.UTF8.GetString(Utilities.Decrypt(Convert.FromBase64String(strEncMsg), Utilities.Suresh(sTokenKey)));
		}

		public object Log(dynamic strMsg, string mappath, string employeeid)
		{
			try
			{

				string strPath = mappath + "\\" + DateTime.Now.ToString("MMddyyyy") + "\\" + employeeid;
				if (!Directory.Exists(strPath))
					Directory.CreateDirectory(strPath);
				string path = strPath + "\\" + "Log" + DateTime.Now.ToString("yyyyMMddhhmmssmmm") + SerNumber().ToString();
				StreamWriter swLog = new StreamWriter(path + ".txt", true);
				swLog.WriteLine(strMsg);
				swLog.Close();
				swLog.Dispose();
				return "Success";
			}
			catch
			{
				return "Fail";
			}
		}
		public int SerNumber()
		{
			Random r = new Random();
			int random_num = r.Next(0, 99999);
			return random_num;
		}
		public class Utilities
		{
			public static RijndaelManaged Suresh(string secretKey)
			{
				byte[] numArray = new byte[16];
				byte[] bytes = Encoding.UTF8.GetBytes(secretKey);
				Array.Copy((Array)bytes, (Array)numArray, Math.Min(numArray.Length, bytes.Length));
				RijndaelManaged rijndaelManaged = new RijndaelManaged();
				rijndaelManaged.Mode = CipherMode.CBC;
				rijndaelManaged.Padding = PaddingMode.PKCS7;
				rijndaelManaged.KeySize = 128;
				rijndaelManaged.BlockSize = 128;
				rijndaelManaged.Key = numArray;
				rijndaelManaged.IV = numArray;
				return rijndaelManaged;
			}

			public static byte[] Encrypt(byte[] plainBytes, RijndaelManaged rijndaelManaged)
			{
				return rijndaelManaged.CreateEncryptor().TransformFinalBlock(plainBytes, 0, plainBytes.Length);
			}

			public static byte[] Decrypt(byte[] encryptedData, RijndaelManaged rijndaelManaged)
			{
				return rijndaelManaged.CreateDecryptor().TransformFinalBlock(encryptedData, 0, encryptedData.Length);
			}

			public static string Encrypt(string strMessage, string sTokenKey)
			{
				return Convert.ToBase64String(Utilities.Encrypt(Encoding.UTF8.GetBytes(strMessage), Utilities.Suresh(sTokenKey)));
			}

			public static string Decrypt(string strEncMsg, string sTokenKey)
			{
				return Encoding.UTF8.GetString(Utilities.Decrypt(Convert.FromBase64String(strEncMsg), Utilities.Suresh(sTokenKey)));
			}

			public static T GetFromQueryString<T>(string QString) where T : new()
			{
				NameValueCollection nameValueCollection = new NameValueCollection();
				foreach (string str in QString.Split("&".ToCharArray()))
				{
					string[] strArray = str.Split("=".ToCharArray());
					nameValueCollection.Add(strArray[0], HttpContext.Current.Server.UrlDecode(strArray[1]));
				}
				T obj1 = new T();
				foreach (PropertyInfo property in typeof(T).GetProperties())
				{
					string ValueToConvert = nameValueCollection[property.Name];
					object obj2 = Utilities.Parse(property.PropertyType, ValueToConvert);
					if (obj2 != null)
						property.SetValue((object)obj1, obj2, (object[])null);
				}
				return obj1;
			}

			public static object Parse(Type dataType, string ValueToConvert)
			{
				return TypeDescriptor.GetConverter(dataType).ConvertFromString((ITypeDescriptorContext)null, CultureInfo.InvariantCulture, ValueToConvert);
			}



			public static string SecurityKey()
			{
				return "Sand@341";
			}
		}
	}
}