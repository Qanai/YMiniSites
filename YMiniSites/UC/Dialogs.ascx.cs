using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace YMiniSites.Purim2016.UC
{
    public partial class Dialogs : System.Web.UI.UserControl
    {
        public string MailSubject = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            //MailSubject = Encoding.UTF8.GetString()
        }
    }
}