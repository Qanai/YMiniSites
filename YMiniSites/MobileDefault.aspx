<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MobileDefault.aspx.cs" Inherits="YMiniSites.Purim2016.Mobile" %>

<%@ Register Src="UC/AppForm.ascx" TagName="AppForm" TagPrefix="uc1" %>
<%@ Register Src="UC/AppGalleryControl.ascx" TagName="AppGalleryControl" TagPrefix="uc2" %>
<%@ Register Src="UC/Footer.ascx" TagName="Footer" TagPrefix="uc3" %>
<%@ Register Src="UC/Dialogs.ascx" TagName="Dialogs" TagPrefix="uc4" %>
<%@ Register Src="UC/GalleryImage.ascx" TagName="GalleryImage" TagPrefix="uc5" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="Scripts/owl.carousel.js"></script>
    <link href="Style/MobilePurim.css" rel="stylesheet" />
    <link href="Style/MobileAppForm.css" rel="stylesheet" />
    <link href="Style/owl.carousel.css" rel="stylesheet" />
    <link href="Style/owl.theme.css" rel="stylesheet" />
    <link href="Style/Gallery.css" rel="stylesheet" />
    <title>התחפושת של המדינה</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=320, initial-scale=1.0" />
    <meta property="fb:admins" content="1034354349" />
</head>
<body>
    <!-- Google Tag Manager -->
    <noscript>
        <iframe src="//www.googletagmanager.com/ns.html?id=GTM-KPG56G" 
            height="0" width="0" style="display:none;visibility:hidden">
        </iframe>
    </noscript>
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-KPG56G');
    </script>
    <!-- End Google Tag Manager -->
    <form id="form1" runat="server">
        <div class="container">
            <div class="head pageItem">
            </div>
            <uc1:AppForm ID="AppForm1" runat="server" />
            <uc2:AppGalleryControl ID="AppGalleryControl1" runat="server" />
            <uc3:Footer ID="Footer1" runat="server" />
            <uc4:Dialogs ID="Dialogs1" runat="server" />
            <uc5:GalleryImage ID="GalleryImage1" runat="server" />
        </div>
        <script src="Scripts/AjaxHelper.js"></script>
        <script src="Scripts/ModalDialog.js"></script>
        <script src="Scripts/Gallery.js"></script>
        <script src="Scripts/AppForm.js"></script>
    </form>
</body>
</html>
