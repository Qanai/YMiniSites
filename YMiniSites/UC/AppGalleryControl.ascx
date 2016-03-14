<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AppGalleryControl.ascx.cs" Inherits="YMiniSites.Purim2016.UC.GalleryControl" %>
<div class="galleryBG pageItem">
    <div class="galleryToolBar">
        <asp:HyperLink NavigateUrl="#" runat="server" ID="galleryLink" />
        <%--<a href="Gallery.aspx"></a>--%>
    </div>
    <div class="navigator prev"></div>
    <div class="carouselWrapper">
        <div id="galleryContainer" class="owl-carousel owl-theme">
        </div>
    </div>
    <div class="navigator next"></div>
    <div class="clear"></div>
</div>
