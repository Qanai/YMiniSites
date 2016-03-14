/// <reference path="../Services/MiniSiteWS.asmx" />
/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js" />
/// <reference path="AjaxHelper.js" />
/// <reference path="Gallery.js" />
/// <reference path="ModalDialog.js" />
/// <reference path="owl.carousel.js" />

$(function () {
    var empty = {};

    var SetFileUpload = function (jsFU) {
        var objURL = window.URL || window.webkitURL;
        var pictureFiles = jsFU.prop("files");

        if (objURL) {
            if (pictureFiles.length > 0) {
                try {
                    var pictureData = objURL.createObjectURL(pictureFiles[0]);
                } catch (e) {
                    pictureData = "";
                }

                $(".fileUpload").css({
                    "background-image": "url(" + pictureData + ")",
                    "background-size": "100%"
                });
            }
            else {
                $(".fileUpload").prop("style", "");
            }
        }
    }

    var ValidateData = function () {
        var phoneRegEx = /^(?:|(?:02|03|04|07|08|09|072|073|074|077|078|050|052|053|054|057)-?\d{7,7})$/;
        var emailRegEx = /^([\w-\.]+@(?!_)([A-Za-z0-9-]+\.)+[\w-]{2,4})?$/;

        var result = true;
        var errorMessage = [];

        var fileObj = $("#fileUploader").prop("files");
        if (fileObj.length != 1) {
            result = false;
            errorMessage.push("יש לבחור תמונה");
        }

        if (!$("#tos").is(":checked")) {
            result = false;
            errorMessage.push("נא לציין קריאת תקנון");
        }

        if ($(".fileUpload").prop("style") == "") {
            result = false;
            errorMessage.push("לא נבחרה תמונה");
        }

        $("input[data-default]").each(function (i, inp) {
            var jqInp = $(inp);
            var text = jqInp.val();
            var defaultValue = jqInp.data("default");

            if (text.trim() == "" || text == defaultValue) {
                result = false;
                errorMessage.push("יש לציין " + defaultValue);
            }
        });

        var ageNum = parseInt($("#age").val());
        if (isNaN(ageNum)) {
            result = false;
            errorMessage.push("גיל לא תקין");
        }

        if (!phoneRegEx.test($("#phone").val().trim())) {
            result = false;
            errorMessage.push("מס' טלפון לא תקין");
        }

        if (!emailRegEx.test($("#email").val().trim())) {
            result = false;
            errorMessage.push("כתובת דוא''ל לא תקינה");
        }

        return {
            valid: result,
            message: errorMessage
        };
    }

    var HandleError = function (xhr, status, err) {
        ShowModal(".modaldialog", ".modalclose", "הפעולה נכשלה");
    }

    var UploadPicture = function () {
        var fileObj = $("#fileUploader").prop("files");
        if (fileObj.length == 1) {
            ajaxHelper.SendFile("Services/FileUploader.asmx/UploadFile", fileObj[0], SendParticipant, HandleError);
        }
    }

    var SetQueryDate = function (pictureUrl) {
        var qry = {
            participant: {
                fullName: $("#fullname").val(),
                phone: $("#phone").val(),
                city: $("#city").val(),
                email: $("#email").val(),
                age: $("#age").val(),
                dressName: $("#dressName").val(),
                pictureUrl: pictureUrl
            }
        };

        return qry;
    }

    var ApplicationOK = function (result) {
        dataLayer.push({
            'event': 'virtualPageview',
            'virtualPageURL': '/thank-you',
            'virtualPageTitle': 'טופס נשלח'
        });
        ShowModal(".thanks", ".closeThanks");
        ClearInput();
    }

    var SendParticipant = function (uploadResult, msg, obj) {
        try {
            var resultData = $.parseJSON(uploadResult);
            if (resultData.success === true) {
                if (resultData.fileUrl.trim() != "") {
                    var queryData = SetQueryDate(resultData.fileUrl);

                    ajaxHelper.SendRequest("POST", "Services/MiniSiteWS.asmx/SaveParticipant", queryData, ApplicationOK, HandleError);
                }
                else {
                    ShowModal(".modaldialog", ".modalclose", "שמירת התמונה נכשלה<br />ההרשמה לא הצליחה<br />נא לנסות שוב");
                }
            }
            else {
                var errorMessage = "";
                if (resultData.error == "TooLargeSize") {
                    errorMessage = "התמונה גדולה מדי";
                }
                else if (resultData.error == "NotImage") {
                    errorMessage = "התמונה לא תקינה";
                }
                ShowModal(".modaldialog", ".modalclose", "שמירת התמונה נכשלה<br />ההרשמה לא הצליחה<br />" + errorMessage + "<br />נא לנסות שוב");
            }
        } catch (e) {
            ShowModal(".modaldialog", ".modalclose", "שמירת התמונה נכשלה<br />ההרשמה לא הצליחה<br />נא לנסות שוב");
        }
    }

    var SendApplicationData = function () {
        UploadPicture();
    }

    var DisplayGallery = function (data) {
        var galleryOptions = {
            dataContainer: ".imageData"
        }

        SetGallery(data, galleryOptions);
        var owl = $("#galleryContainer").data("owlCarousel");

        $(".prev").click(function () {
            owl.prev();
        });

        $(".next").click(function () {
            owl.next();
        });
    }

    var GetParticipants = function () {
        var quryData = { forHomePage: true };
        ajaxHelper.SendRequest("POST", "Services/MiniSiteWS.asmx/GetAllParticipants", quryData, DisplayGallery, HandleError);
    }

    var ClearInput = function () {
        var inputElements = $("input[data-default]");
        inputElements.val("");
        inputElements.trigger("blur");

        $("#tos").prop("checked", false);
        $(".fileUpload").prop("style", "");
    }

    var HandleDefaultInput = function (event) {
        var inp = $(event.target);
        var text = inp.val();
        var defaultValue = inp.data("default");

        if (event.type == "focus") {
            if (text == defaultValue) {
                inp.val("");
                inp.removeClass("defaultInput");
            }
        }
        else {
            if (text.trim() == "") {
                inp.val(defaultValue);
                inp.addClass("defaultInput");
            }
        }
    }

    $("#fileUploader").change(function () {
        SetFileUpload($(this));
    });

    $("#send").click(function () {
        var validationData = ValidateData();
        if (validationData.valid === true) {
            SendApplicationData();
        }
        else {
            var htmlMessage = validationData.message.join("<br />");
            ShowModal(".modaldialog", ".modalclose", htmlMessage);
        }
    });

    $("input[data-default]").on("focus blur", HandleDefaultInput);

    $("#test").click(function () {
        ApplicationOK();
    });

    $(".thanks .shareFB").on("click", FacebookShare);
    $(".thanks .sendMail").on("click", EmailShare);

    GetParticipants();
});