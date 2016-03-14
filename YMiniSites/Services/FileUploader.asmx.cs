using System;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Drawing;
using System.Drawing.Imaging;
using MetascanHelper;
using Newtonsoft.Json;

namespace YMiniSites.Purim2016.Services
{
    enum UploadErrorType
    {
        NoError,
        TooLargeSize,
        NotImage
    }

    /// <summary>
    /// Summary description for FileUploader
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class FileUploader : WebService
    {
        [WebMethod]
        public void UploadFile()
        {
            string filePathName = string.Empty;
            UploadErrorType errorType =  UploadErrorType.NoError;
            bool statusOK = true;

            int maxSize = 1000000;
            int.TryParse(ConfigurationManager.AppSettings["FileMaxSize"], out maxSize);

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var postedFile = HttpContext.Current.Request.Files["uploadedFile"];
                if (postedFile != null)
                {
                    using (Stream fileStream = postedFile.InputStream)
                    {
                        if (postedFile.ContentLength < maxSize)
                        {
                            if (ValidateFile(fileStream))
                            {
                                FileInfo fi = new FileInfo(postedFile.FileName);
                                string fileName = Guid.NewGuid().ToString();
                                string assetsPath = ConfigurationManager.AppSettings["AssetsUrl"];
                                filePathName = string.Format("{0}{1}{2}", assetsPath, fileName, fi.Extension);
                                var savePath = string.Format("{0}\\{1}{2}", ConfigurationManager.AppSettings["PhysicalAsstsPath"], fileName, fi.Extension); //Server.MapPath(string.Format("~/{0}", filePathName));
                                postedFile.SaveAs(savePath);
                            }
                            else
                            {
                                statusOK = false;
                                errorType = UploadErrorType.NotImage;
                            }
                        }
                        else
                        {
                            statusOK = false;
                            errorType = UploadErrorType.TooLargeSize;
                        }
                    }
                }
            }

            var result = new 
            {
                success = statusOK,
                error = errorType.ToString(),
                fileUrl = filePathName
            };


            Context.Response.Clear();
            Context.Response.ContentType = "text";
            Context.Response.Flush();
            Context.Response.Write(JsonConvert.SerializeObject(result));
        }

        private bool ValidateFile(Stream fileStream)
        {
            bool result = false;
            try
            {
                using (Image img = Image.FromStream(fileStream))
                {
                    Bitmap thumbnailImage = new Bitmap(10, 10);
                    Graphics g = Graphics.FromImage(thumbnailImage);
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    g.FillRectangle(Brushes.White, 0, 0, 10, 10);
                    g.DrawImage(img, 0, 0, 10, 10);
                }
                result = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }
    }
}
