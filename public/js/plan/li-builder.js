
function liPlanList(planGuid, username, gender, problemStatement, createdDate, isNew) {

    var imagePath = "";
    if (gender === "F")
        imagePath = "/img/user-icon-lady-64.png";
    else 
        imagePath = "/img/user-icon-man-64.png";

    var liIsNew = "";
    if (isNew === "Y")
        liIsNew = "<li id=\"liFooter-right-isnew\"><img src=\"/img/new-icon.png\" style=\"width:60px; height:30px;\"></li>";

    return `<li>
        <div class="liHeader">
            <div style="float:left;position:relative;">
                <div class="liHeader-icon" style="display:inline-block">
                    <img src="` + imagePath + `" style="width:48px; padding:5px;" />
                </div>
                <div class="liHeader-creator" style="display:inline-block">` + username + `</div>
            </div>
            <div style="float:right">
                <div class="dropdown">
                    <button id="btnLiMenu" class="dropdown-toggle" type="button" data-toggle="dropdown">
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a tabindex="-1" href="/user/plan-edit?planGuid=` + planGuid + `">Edit</a></li>
                        <li><a tabindex="-1" href="/user/plan-remove?planGuid=` + planGuid + `">Remove</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="liContent" style="clear:both;">
            <span class="li-prob-statement">` + problemStatement + `</span>
            <br/>
            <span class="li-created-on">` + createdDate + `</span>
        </div>
        <div class="liFooter">
            <ul id="footer-item-right">
                ` + liIsNew + `
            </ul>

            <ul id="footer-item-left">
                <li><input type="button" value="Root Cause" class="btn btn-default" onclick="fnViewRootCause('` + planGuid + `')" /></li>
                <li><input type="button" value="View Details" class="btn btn-default" onclick="fnViewDetails('` + planGuid + `')" /></li>
                <li><input type="button" value="Conversation" class="btn btn-default" onclick="fnViewConversation('` + planGuid + `')" /></li>
            </ul>
        </div>
    </li>`;

}; 