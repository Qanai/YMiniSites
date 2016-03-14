using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace YMiniSites.Purim2016.UC
{
    public partial class GalleryFooter : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            getNewspaper.NavigateUrl = ConfigurationManager.AppSettings["GetNewspaperUrl"];
        }
    }
}