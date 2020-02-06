using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SR
{
	public class WebApiApplication : System.Web.HttpApplication
	{
		protected void Application_Start()
		{
			RegisterRoutes(RouteTable.Routes);
			AreaRegistration.RegisterAllAreas();
			GlobalConfiguration.Configure(WebApiConfig.Register);
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			BundleConfig.RegisterBundles(BundleTable.Bundles);
			Application["OnlineVisitors"] = 0;
		}
		void Application_End(object sender, EventArgs e)
		{

		}
		void Application_Error(object sender, EventArgs e)
		{

		}
		void Session_Start(object sender, EventArgs e)
		{
			Application.Lock();
			Application["OnlineVisitors"] = (int)Application["OnlineVisitors"] + 1;
			Application.UnLock();
		}
		void Session_End(object sender, EventArgs e)
		{

			Application.Lock();
			Application["OnlineVisitors"] = (int)Application["OnlineVisitors"] - 1;
			Application.UnLock();
		}

		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.MapPageRoute("", "", "~/index.html");
			routes.MapPageRoute("Login", "Login", "~/Login.aspx");
			routes.MapPageRoute("Dashboard", "Dashboard", "~/index.html");			
		}
	}
}
