using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using YMiniSites.Purim2016.Services;
using YMiniSitesBL.Purim;

namespace YMiniSites.Purim2016
{
    public partial class PurimFB : System.Web.UI.Page
    {
        protected string mainTitle = string.Empty;
        protected string mainImage = string.Empty;
        protected string description = string.Empty;
        protected string picId = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            int personId;

            if (int.TryParse(Request.QueryString["pId"], out personId))
            {
                try
                {
                    picId = string.Format("#{0}", personId);
                    
                    MiniSiteWS ws = new MiniSiteWS();
                    PurimParticipantData person =
                        JsonConvert.DeserializeObject<PurimParticipantData>(ws.GetParticipant(personId));

                    if (person != null)
                    {
                        mainImage = string.Format("{0}://{1}/{2}", Request.Url.Scheme, Request.Url.Host, person.PictureUrl);
                    }
                }
                catch { }
            }

            mainTitle = ConfigurationManager.AppSettings["ShareTitle"];
            description = ConfigurationManager.AppSettings["ShareDescription"];
        }
    }
}