/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />

(function (win, doc, $) {
    var overlayCss = {
        opacity: 0,
        filter: "alpha(opacity=0)",
        position: "absolute",
        top: 0,
        left: 0,
        "z-index": 900,
        width: "100%",
        "background-color": "#E3EFF5"
    }

    var innerMessageCss = {
        "text-align": "center",
        position: "absolute",
        display: "inline-block",
        width: "90%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    };

    function GetHeight() {
        return Math.min($("body").height(), $(win).height());
    }

    function ModalDialog(modalBoxSelector, closeSelector, message, messageTop) {
        var showMessage = (typeof message != "undefined");

        var overlay = $("<div class=\"ModalOverlay\"></div>");
        var modalBox = $(modalBoxSelector);

        if (showMessage) {
            if (typeof messageTop != "undefined") {
                innerMessageCss.top = messageTop;
            }
            var innerMessage = $("<div></div>");
            innerMessage.html(message);
            innerMessage.css(innerMessageCss);
            modalBox.append(innerMessage);
        }

        modalBox.css("z-index", 1000);
        overlay.css(overlayCss);
        overlay.css("height", $(doc).height());
        $("body").append(overlay);
        overlay.fadeTo(500, 0.7);
        modalBox.fadeIn(500);

        $(".ModalOverlay, " + closeSelector).click(function (e) {
            e.preventDefault();
            $(".ModalOverlay, " + modalBoxSelector).fadeOut(500, function () {
                $(".ModalOverlay").remove();
                if (showMessage) {
                    innerMessage.remove();
                }
            });
        });

        modalBox.css({
            top: ($("body").scrollTop() + (GetHeight() - modalBox.outerHeight()) / 2),
            //left: ($("body").width() - modalBox.outerWidth()) / 2
            left: (modalBox.parent().width() - modalBox.outerWidth()) / 2
        });
    }

    win.ShowModal = ModalDialog;
})(window, document, jQuery);