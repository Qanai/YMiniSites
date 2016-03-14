/// <reference path="../Services/MiniSiteWS.asmx" />
/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js" />
/// <reference path="AjaxHelper.js" />
/// <reference path="Gallery.js" />

$(function () {
    var mobileCount = $(".mobile").length;
    var empty = {};

    var HandleError = function (xhr, status, err) {
        ShowModal(".modaldialog", ".modalclose", "אירעה שגיאה בטעינת גלריה");
    }

    var DisplaySharedPicture = function () {
        var hash = location.hash.trim();
        if (hash != "") {
            var picId = hash.substr(1);
            $(".imageWrapper[data-id=" + picId + "]").trigger("click");
        }
    }

    var DisplayGalleryCallback = function (participants) {
        var galleryOptions = {
            dataContainer: ".imageData",
            twoRows: true,
            itemToolbar: (mobileCount == 0),
            displayNavigation: true,
            displayPages: true,
            useCarousel: (mobileCount == 0)
        };

        SetGallery(participants, galleryOptions);
        DisplaySharedPicture();
    }

    var GetParticipants = function () {
        var quryData = { forHomePage: false };
        ajaxHelper.SendRequest("POST", "Services/MiniSiteWS.asmx/GetAllParticipants", quryData, DisplayGalleryCallback, HandleError);
    }

    GetParticipants();
});