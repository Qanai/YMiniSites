using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using YMiniSites.App_Code;

namespace YMiniSites.Purim2016.UC
{
    public partial class GalleryImage : System.Web.UI.UserControl
    {
		protected void Page_Load(object sender, EventArgs e)
        {
            //if (Request.Url.LocalPath.ToLower().Contains("mobile"))
            if (SiteHelper.MobileRequest())
            {
                giWrap.CssClass = "mobile";
            }
        }
    }
}