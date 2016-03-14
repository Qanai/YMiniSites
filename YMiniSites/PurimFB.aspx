<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PurimFB.aspx.cs" Inherits="YMiniSites.Purim2016.PurimFB" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title><%=mainTitle %></title>
	<meta property="og:site_name" content="התחפושת של המדינה" />
	<meta property="og:title" content="<%=mainTitle %>" />
	<meta property="og:description" content="<%=description %>" />
    <script>
        var hashId = "<%=picId%>";
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h1><%=mainTitle %></h1>
            <img src="<%=mainImage %>" alt="תחפושת המדינה" />
            <p>
                <%=description %>
            </p>
        </div>
    </form>
    <script>
        window.onload = function () {
            //alert("'" + location.protocol + "//" + location.host + "/Gallery.aspx" + hashId + "'");
            location.href = location.protocol + "//" + location.host + "/Gallery.aspx" + hashId;
        }
    </script>
</body>
</html>
