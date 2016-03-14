using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace YMiniSites.Purim2016.UC
{
    public partial class AppForm : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            tosLink.NavigateUrl = ConfigurationManager.AppSettings["TosUrl"];
            
            //if (Request.Url.LocalPath.ToLower().Contains("mobile"))
            //{
            //    Label lbl = new Label();
            //    lbl.Text = "השתתפות";
            //    lbl.CssClass = "titleForm";

            //    titlePlaceholder.Controls.Add(lbl);
            //}
        }
    }
}