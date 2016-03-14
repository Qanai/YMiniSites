using System.Text.RegularExpressions;
using System.Web;

namespace YMiniSites.App_Code
{
    public class SiteHelper
    {
        public static bool MobileRequest()
        {
            bool result = CheckTrueString(HttpContext.Current.Request.Browser["IsMobileDevice"])
                || CheckTrueString(HttpContext.Current.Request.Browser["BlackBerry"])
                || CheckUserAgent(HttpContext.Current.Request.UserAgent);

            return result;
        }

        private static bool CheckUserAgent(string userAgent)
        {
            Regex testMobile = new Regex(
                 "(?:iphone|ipod|android)",
               RegexOptions.IgnoreCase
               | RegexOptions.CultureInvariant
               | RegexOptions.IgnorePatternWhitespace
               | RegexOptions.Compiled
               );

            return testMobile.IsMatch(userAgent);
        }

        private static bool CheckTrueString(string testString)
        {
            bool result;

            if (!bool.TryParse(testString, out result))
            {
                result = false;
            }

            return result;
        }
    }
}