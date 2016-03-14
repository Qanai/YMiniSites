/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js" />
/// <reference path="ModalDialog.js" />
/// <reference path="owl.carousel.js" />
/// <reference path="AjaxHelper.js" />

(function (win, doc, $) {

    var protocol = location.protocol;
    var host = location.host;

    var settings = {
        container: "#galleryContainer",
        dataContainer: "",
        twoRows: false,
        itemToolbar: false,
        displayNavigation: false,
        displayPages: false,
        //navigationButtons: ["prev", "next"],
        useCarousel: true
    };

    var SetImageSource = function (dataSource) {
        var patt = new RegExp(/^http|^\\/);
        if (patt.test(dataSource)) {
            return dataSource;
        }

        return protocol + "//" + host + "/" + dataSource;
    }

    var ShowPicture = function (jqDisplayContainer) {
        var dataContainer = $(settings.dataContainer);
        if (dataContainer.length > 0) {
            dataContainer.empty();
            dataContainer.append("<p class=\"itemTitle\">" + jqDisplayContainer.data("fullname") + "</p>");
            dataContainer.append("<p class=\"itemSubTitle\">" + jqDisplayContainer.data("dressname") + "</p>");
        }

        var imageSource = SetImageSource(jqDisplayContainer.data("src"));

        $(".bigImage").css({
            "background-image": "url(" + imageSource + ")",
            "background-size": "100%"
        });

        var shareData = {
            id: jqDisplayContainer.data("id"),
            src: jqDisplayContainer.data("src")
        };

        $("#btnFB").data(shareData)
            .off("click")
            .on("click", ShareFacebook);

        $("#btnMail").data(shareData)
           .off("click")
           .on("click", ShareEmail);

        dataLayer.push({
            'event': 'virtualPageview',
            'virtualPageURL': '/image-opend/' + imageSource,
            'virtualPageTitle': 'פתיחת תמונה'
        });

        ShowModal(".imageContainer", ".imageClose");
    }

    var ShareFacebook = function (event) {
        var fb = $(event.target);
        if (fb.length > 0) {
            var personId = fb.data("id");
            var shareUrl = protocol + "//" + host + "/PurimFB.aspx" + ((personId == "") ? "" : "?pId=" + personId);
            var url = "http://www.facebook.com/share.php?u=" + shareUrl;

            dataLayer.push({
                'event': 'GA_Event',
                'Category': 'Share',
                'Action': 'Facebook',
                'Label': shareUrl
            });

            PopUpWindow(url, "Facebook", 750, 300);
        }
    }

    var ErrorHandler = function (message) {
        $(".modalclose").trigger("click");
        ShowModal(".modaldialog", ".modalclose", message);
    }

    var SendMailOK = function (result) {
        $(".modalclose").trigger("click");
        ShowModal(".modaldialog", ".modalclose", result);
    }

    var SendEmail = function (imageUrl) {
        var emailRegEx = /^([\w-\.]+@(?!_)([A-Za-z0-9-]+\.)+[\w-]{2,4})?$/;
        var address = $("#txtEmail").val().trim();
        var statusMessage = $("#sendMailStatus");
        statusMessage.empty();

        var ValidateAddress = function () {
            var result = true;

            if (address == "") {
                result = false;
                statusMessage.html("יש לציין את הכתובת");
            }
            else if (!emailRegEx.test(address.trim())) {
                result = false;
                statusMessage.html("כתובת לא תקינה");
            }

            return result;
        }

        if (ValidateAddress()) {
            var sendData = {
                shareUrl: imageUrl,
                addressTo: address
            }

            ajaxHelper.SendRequest("POST", "Services/MiniSiteWS.asmx/SendMail", sendData, SendMailOK, ErrorHandler);
        }
    }

    var ShareEmail = function (event) {
        var mailBtn = $(event.target);
        if (mailBtn.length > 0) {
            var personId = mailBtn.data("id");
            var shareUrl = protocol + "//" + host + "/Gallery.aspx" + ((personId == "") ? "" : "#" + personId);

            dataLayer.push({
                'event': 'GA_Event',
                'Category': 'Share',
                'Action': 'Mail',
                'Label': shareUrl
            });

            var title = "גם אני השתתפתי בתחרות התחפושת של המדינה";

            var url = "mailto:?subject=" + title + "&body=" + shareUrl;
            location.href = url;

            //var shareUrl = SetImageSource(mailBtn.data("src"));

            //$("#btnSendEmail").off("click")
            //    .on("click", function () {
            //        SendEmail(shareUrl);
            //    });

            //$("#sendMailStatus").empty();
            //$(".imageClose").trigger("click");
            //ShowModal(".sendMailDialog", ".closeMail");
        }
    }

    var PopUpWindow = function (url, title, w, h) {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }

    var DisplayGallery = function (data, options) {
        $.extend(true, settings, options);

        var AddColumn = function (galleryContainer, galleryItems) {
            var columnContainer = $("<div></div>");
            columnContainer.addClass("item");

            $.each(galleryItems, function (i, galItem) {
                columnContainer.append(galItem);
            });

            galleryContainer.append(columnContainer);
        }

        var CreateGalleryItem = function (participantData) {
            var CreateToolButton = function (className) {
                var btn = $("<div></div>");
                btn.addClass("toolButton");
                btn.addClass(className);
                btn.attr("data-id", participantData.Id);
                btn.attr("data-name", participantData.FullName);
                btn.attr("data-dress", participantData.DressName);

                return btn;
            }

            var CreateToolbar = function () {
                var toolbar = $("<div></div>");
                toolbar.addClass("itemToolbar");
                toolbar.append(CreateToolButton("shareFB"));
                toolbar.append(CreateToolButton("shareMail"));
                toolbar.append(CreateToolButton("showBig"));

                return toolbar;
            }

            var galleryItem = $("<div></div>");
            galleryItem.addClass("galleryItem");
            var imageWrp = $("<div></div>");
            imageWrp.addClass("imageWrapper");
            imageWrp.attr({
                "data-id": participantData.Id,
                "data-src": participantData.PictureUrl,
                "data-fullname": participantData.FullName,
                "data-dressname": participantData.DressName
            });
            var itemImage = $("<img />");
            itemImage.prop("src", SetImageSource(participantData.PictureUrl));
            imageWrp.append(itemImage);
            galleryItem.append(imageWrp);
            galleryItem.append("<p class=\"itemTitle\">" + participantData.FullName + "</p>");
            galleryItem.append("<p class=\"itemSubTitle\">" + participantData.DressName + "</p>");

            if (settings.itemToolbar) {
                galleryItem.append(CreateToolbar());
            }

            return galleryItem;
        }

        var container = $(settings.container);
        container.empty();

        if (data != null) {
            if (settings.useCarousel) {
                if (settings.twoRows) {
                    var columnItems = [];

                    $.each(data, function (i, participant) {
                        var gItem = CreateGalleryItem(participant);
                        columnItems.push(gItem);

                        if (i % 2 != 0) {
                            AddColumn(container, columnItems);
                            columnItems = [];
                        }
                    });

                    if (columnItems.length > 0) {
                        AddColumn(container, columnItems);
                        columnItems = [];
                    }
                }
                else {
                    $.each(data, function (i, participant) {
                        var galleryItem = CreateGalleryItem(participant);
                        galleryItem.addClass("item");
                        container.append(galleryItem);
                    });
                }
            }
            else {
                var itemsWrapper = $("<div></div>");
                itemsWrapper.addClass("itemsWrapper");

                $.each(data, function (i, participant) {
                    var galleryItem = CreateGalleryItem(participant);
                    galleryItem.css("width", "137px");
                    itemsWrapper.append(galleryItem);
                });

                container.append(itemsWrapper);
            }

            $(".imageWrapper").click(function () {
                ShowPicture($(this));
            });

            $(".showBig").click(function () {
                var img = $(this).parents(".galleryItem").find(".imageWrapper");
                img.trigger("click");
            });

            if (settings.useCarousel) {
                container.owlCarousel({
                    //responsiveBaseWidth: "#" + container.prop("id"),
                    //itemsCustom: [
                    //    [850, 5],
                    //    [320, 1]
                    //],
                    //pagination: settings.displayPages

                    dots: settings.displayPages,
                    //navText: ["Next", "Prev"],
                    //rtl: true,
                    responsive: {
                        0: {
                            items: 1,
                            stagePadding: 55
                        },
                        680: {
                            items: 5
                        }
                    }
                });

                $(".owl-stage").css("padding-left", 0);
            
                if (settings.displayNavigation) {
                    var owl = container.data("owlCarousel");
                    var navNext = $("<div class=\"navNext\"></div>");
                    var navPrev = $("<div class=\"navPrev\"></div>");

                    //$(".owl-pagination").append(navPrev);
                    //$(".owl-pagination").prepend(navNext);
                    $(".owl-controls").append(navPrev);
                    $(".owl-controls").prepend(navNext);


                    navNext.click(function () {
                        owl.prev();
                    });

                    navPrev.click(function () {
                        owl.next();
                    });
                }
            }

            container.on("click", ".shareFB", ShareFacebook);
            container.on("click", ".shareMail", ShareEmail);
        }
    }

    win.SetGallery = DisplayGallery;
    win.FacebookShare = ShareFacebook;
    win.EmailShare = ShareEmail;
})(window, document, jQuery);