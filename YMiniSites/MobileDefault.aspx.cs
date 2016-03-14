using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using YMiniSites.App_Code;

namespace YMiniSites.Purim2016
{
    public partial class Mobile : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!SiteHelper.MobileRequest())
            {
                Server.Transfer("Default.aspx");
            }
        }
    }
}