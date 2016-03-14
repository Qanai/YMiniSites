using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;

namespace YMiniSitesBL.Helpers
{
    public class MailHelper
    {
        public static ResultStatus SendMail(string smtpHost, string subject, string message, string addressFrom, 
            string addressTo)
        {
            ResultStatus resultSuccess = new ResultStatus()
            {
                Message = string.Empty,
                Success = true
            };

            SmtpClient client = new SmtpClient(smtpHost);
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(addressFrom);
            mailMessage.To.Add(addressTo);
            mailMessage.BodyEncoding = Encoding.UTF8;
            //mailMessage.IsBodyHtml = mailData.IsBodyHtml;
            mailMessage.Subject = subject;
            mailMessage.Body = message;

            try
            {
                client.Send(mailMessage);
            }
            catch (Exception ex)
            {
                resultSuccess.Success = false;
                resultSuccess.Message = ex.Message;
            }
            finally
            {
                mailMessage.Dispose();
            }

            return resultSuccess;
        }        
    }
}
