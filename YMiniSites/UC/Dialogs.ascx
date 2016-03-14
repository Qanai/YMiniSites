<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Dialogs.ascx.cs" Inherits="YMiniSites.Purim2016.UC.Dialogs" %>
<div class="thanks">
    <div class="closeThanks serviceButton" title="סגור"></div>
    <div class="thanksMessage">הנתונים התקבלו<br />תודה על השתתפותך</div>
    <div class="shareFB serviceButton" title="שתף בפייסבוק"></div>
    <div class="sendMail serviceButton" title="שתף בדוא&quot;ל"></div>
</div>
<div class="modaldialog">
    <div class="modalclose"></div>
</div>
<div class="sendMailDialog">
    <div class="closeMail"></div>
    <input type="hidden" id="shareEmailAddress" />
    <input type="text" id="txtEmail" />
    <input type="button" id="btnSendEmail" value="שלח" />
    <div id="sendMailStatus" class="sendMailStatus"></div>
</div>
