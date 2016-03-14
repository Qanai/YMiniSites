/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />

(function (w, $) {
    var ajaxHelper = {};

    ajaxHelper.SendRequest = function (requestType, serviceUrl, dataObject, successCallbackFunc, errorCallbackFunc) {
        $.ajax({
            type: requestType,
            url: serviceUrl,
            data: JSON.stringify(dataObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var returnData = null;

                if ((data != null) && (data.d != null)) {
                    returnData = $.parseJSON(data.d);
                }
                
                successCallbackFunc(returnData);
            },
            error: function (resultObject) {
                errorCallbackFunc(resultObject);
            }
        });
    }

    ajaxHelper.SendFile = function (serviceUrl, fileObject, successCallbackFunc, errorCallbackFunc) {
        var dataForm = new FormData();
        dataForm.append("uploadedFile", fileObject);
        $.ajax({
            type: "POST",
            url: serviceUrl,
            contentType: false,
            processData: false,
            data: dataForm,
            success: function (returnData, status, xhr) {
                successCallbackFunc(returnData, status, xhr);
            },
            error: function (xhr, status, err) {
                errorCallbackFunc(xhr, status, err);
            }
        });
    }

    w.ajaxHelper = ajaxHelper;
})(window, jQuery);