using System;
using YMiniSites.App_Code;

namespace YMiniSites.Purim2016
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {            
            if (SiteHelper.MobileRequest())
            {
                Server.Transfer("MobileDefault.aspx");
            }
        }
    }
}