<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Gallery.aspx.cs" Inherits="YMiniSites.Purim2016.Gallery" UICulture="he-IL" %>

<%@ Register Src="UC/DispGalleryControl.ascx" TagName="DispGalleryControl" TagPrefix="uc1" %>
<%@ Register Src="UC/GalleryFooter.ascx" TagName="GalleryFooter" TagPrefix="uc2" %>
<%@ Register Src="UC/GalleryImage.ascx" TagName="GalleryImage" TagPrefix="uc3" %>
<%@ Register Src="UC/Dialogs.ascx" TagName="Dialogs" TagPrefix="uc4" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>גלרייה</title>
    <meta charset="utf-8" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="Scripts/owl.carousel.js"></script>
    <link href="Style/Purim.css" rel="stylesheet" />
    <link href="Style/GalleryForm.css" rel="stylesheet" />
    <link href="Style/owl.carousel.css" rel="stylesheet" />
    <link href="Style/owl.theme.css" rel="stylesheet" />
    <link href="Style/Gallery.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width" />
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
                <a href="Default.aspx"></a>
            </div>
            <uc1:DispGalleryControl ID="DispGalleryControl1" runat="server" />
            <uc2:GalleryFooter ID="GalleryFooter1" runat="server" />
            <uc3:GalleryImage ID="GalleryImage1" runat="server" />
            <uc4:Dialogs ID="Dialogs1" runat="server" />
        </div>
        <script src="Scripts/AjaxHelper.js"></script>
        <script src="Scripts/ModalDialog.js"></script>
        <script src="Scripts/Gallery.js"></script>
        <script src="Scripts/GalleryForm.js"></script>
    </form>
</body>
</html>
