using Newtonsoft.Json;
using System.Collections;
using System.Configuration;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using YMiniSitesBL.Helpers;
using YMiniSitesBL.Purim;

namespace YMiniSites.Purim2016.Services
{
    /// <summary>
    /// Summary description for MiniSiteWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class MiniSiteWS : WebService
    {
        [WebMethod]
        public string SaveParticipant(PurimParticipantData participant)
        {
            bool isOk = true;
            string resultMessage = "Success";

            int participantId = participant.Save();

            if (participantId == 0)
            {
                isOk = false;
                resultMessage = "Save failed";
            }

            var result = new
            {
                success = isOk,
                contactId = participantId,
                message = resultMessage
            };

            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public string GetAllParticipants(bool forHomePage)
        {
            var participants = PurimParticipantData.FindActive();

            if (forHomePage)
            {
                participants = participants.OrderByDescending(p => p.HomePage)
                    .ThenByDescending(p => p.UpdateDate);
            }

            return JsonConvert.SerializeObject(participants);
        }

        [WebMethod]
        public string GetParticipant(int id)
        {
            var participant = PurimParticipantData.Find(id);

            return JsonConvert.SerializeObject(participant);
        }

        [WebMethod]
        public string SendMail(string shareUrl, string addressTo)
        {
            string smtp = ConfigurationManager.AppSettings["SmtpClient"];
            string subject = ConfigurationManager.AppSettings["ShareTitle"];
            string addressFrom = ConfigurationManager.AppSettings["SendMailAddress"];

            var status = MailHelper.SendMail(smtp, subject, shareUrl, addressFrom, addressTo);

            return JsonConvert.SerializeObject(status);
        }
    }
}
