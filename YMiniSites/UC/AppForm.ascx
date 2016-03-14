<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AppForm.ascx.cs" Inherits="YMiniSites.Purim2016.UC.AppForm" %>
<div class="formBG pageItem">
    <div class="appContainer">
        <div class="fileUploadWrapper">
            <label class="titleForm">השתתפות</label>
            <div class="fileUpload">
                <input type="file" id="fileUploader" class="fileButton" />
            </div>
        </div>
        <div class="inputWrapper">
            <input type="text" class="inputForm defaultInput" value="שם מלא" id="fullname" name="fullname" data-default="שם מלא" maxlength="25" />
            <input type="text" class="inputForm defaultInput" value="טלפון" id="phone" name="phone" data-default="טלפון" />
            <input type="text" class="inputForm defaultInput" value="עיר" id="city" name="city" data-default="עיר" maxlength="15" />
            <input type="text" class="inputForm defaultInput" value="דוא''ל" id="email" name="email" data-default="דוא''ל" maxlength="70" />
            <input type="text" class="inputForm defaultInput age" value="גיל" id="age" name="age" data-default="גיל" maxlength="3" />
            <input type="text" class="inputForm defaultInput dress" value="שם התחפושת" id="dressName" name="dressName" data-default="שם התחפושת" />
            <div class="clear"></div>
            <div class="tosWrap">
                <input type="checkbox" name="tos" id="tos" />
                <label for="tos">
                    קראתי ואישרתי את
                        <asp:HyperLink NavigateUrl="#" ID="tosLink" Target="_blank" runat="server">התקנון</asp:HyperLink></label>
            </div>
            <div id="send" class="sendButton"></div>
            <div class="appNote">
                <span class="red">*</span>
                <span>שדה חובה</span>
            </div>
            <%--<input type="button" id="test" value="Send OK" />--%>
        </div>
        <div class="clear"></div>
    </div>
</div>
