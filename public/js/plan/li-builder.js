
function liPlanList(planGuid, username, gender, problemStatement, createdDate, currentStatus) {

    var displayDate = new Date(createdDate);

    var imagePath = "";
    if (gender === "F")
        imagePath = "/img/user-icon-lady-64.png";
    else 
        imagePath = "/img/user-icon-man-64.png";

    var liIsNew = "";
    if (currentStatus === "NEW")
        liIsNew = "<img src=\"/img/new-icon.png\" style=\"width:60px; height:30px;\">";

    return `<li>
        <div class="liHeader">
            <div style="float:left;position:relative;">
                <ul style="list-style:none;">
                    <li style="display:inline-block;">
                        <div class="liHeader-icon" style="display:inline-block">
                            <img src="` + imagePath + `" style="width:48px; padding:5px;" />
                        </div>
                    </li>
                    <li style="display:inline-block;">
                        <div class="liHeader-creator" style="display:inline-block">` + username + `</div>
                    </li>
                    <li style="display:inline-block;">
                        <div>` + liIsNew + `</div>
                    </li>
                </ul>
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
            <br/><br/>
            <span class="li-created-on">` + displayDate + `</span>
        </div>
        <div class="liFooter">
            <ul class="footer-item-left">
                <li>Root Cause: 10</li>
                <li>Why: 20</li>
            </ul>

            <ul class="footer-item-right">
                <li><input type="button" value="Root Cause" class="btn btn-default" onclick="fnViewRootCause('` + planGuid + `')" /></li>
                <li><input type="button" value="View Details" class="btn btn-default" onclick="fnViewDetails('` + planGuid + `')" /></li>
                <li><input type="button" value="Conversation" class="btn btn-default" onclick="fnViewConversation('` + planGuid + `')" /></li>
            </ul>
        </div>
    </li>`;

}; 

function liPlanRootCauseList(rootcauseGuid, username, gender, rootcauseTitle, createdDate, currentStatus, whyCount){

    var displayDate = new Date(createdDate).toLocaleString();
    
    var imagePath = "";
    if (gender === "F")
        imagePath = "/img/user-icon-lady-64.png";
    else 
        imagePath = "/img/user-icon-man-64.png";

    var liIsNew = "";
    if (currentStatus === "NEW")
        liIsNew = "<img src=\"/img/new-icon.png\" style=\"width:60px; height:30px;\">";

    return `<li class="li-rootcause">
        <div class="liContent" style="width:380px;">

            <div class="liHeader">
                <div style="float:left;position:relative;">
                    <ul style="list-style:none;">
                        <li style="display:inline-block;">
                            <div class="liHeader-icon" style="display:inline-block">
                                <img src="` + imagePath + `" style="width:48px; padding:5px;" />
                            </div>
                        </li>
                        <li style="display:inline-block;">
                            <div class="liHeader-creator" style="display:inline-block">` + username + `</div>
                        </li>
                        <li style="display:inline-block;">
                            <div>` + liIsNew + `</div>
                        </li>
                    </ul>
                </div>
                <div style="float:right">
                    <div class="dropdown">
                        <button id="btnLiMenu" class="dropdown-toggle" type="button" data-toggle="dropdown">
                                            <span class="caret"></span>
                                            </button>
                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="#">Edit</a></li>
                            <li><a tabindex="-1" href="#">Remove</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="liContent" style="clear:both;">
                <span class="liContent-title">` + rootcauseTitle + `</span>
                <br/><br/>
                <span class="liContent-date">` + displayDate + `</span>
            </div>
            <div class="liFooter">
                <ul class="footer-item-left">
                    <li>Why: <span>` + whyCount + `</span></li>
                </ul>

                <ul class="footer-item-right">
                    <li><span class="fa fa-info-circle fa-2x" title="view root cause details"></span></li>
                    <li><span class="fa fa-question-circle fa-2x" title="view why list" onclick="viewWhyList(this, '` + rootcauseGuid + `');"></span></li>
                    <li><span class="fa fa-flag fa-2x" title="mark as actual root cause"></span></li>
                </ul>
            </div>

        </div>
    </li>`;
};

function liPlanRootCauseWhyList(whyGuid, username, gender, whyTitle, createdDate, currentStatus, commentCount){

    var displayDate = new Date(createdDate).toLocaleString();
    
    var imagePath = "";
    if (gender === "F")
        imagePath = "/img/user-icon-lady-64.png";
    else 
        imagePath = "/img/user-icon-man-64.png";

    var liIsNew = "";
    if (currentStatus === "NEW")
        liIsNew = "<img src=\"/img/new-icon.png\" style=\"width:60px; height:30px;\">";

    return `<li class="li-why">
        <div class="liContent" style="width:380px;">
            <div class="liHeader">
                <div style="float:left;position:relative;">
                    <ul style="list-style:none;">
                        <li style="display:inline-block;">
                            <div class="liHeader-icon" style="display:inline-block">
                                <img src="` + imagePath + `" style="width:48px; padding:5px;" />
                            </div>
                        </li>
                        <li style="display:inline-block;">
                            <div class="liHeader-creator" style="display:inline-block">` + username + `</div>
                        </li>
                        <li style="display:inline-block;">
                            <div>` + liIsNew + `</div>
                        </li>
                    </ul>
                </div>
                <div style="float:right">
                    <div class="dropdown">
                        <button id="btnLiMenu" class="dropdown-toggle" type="button" data-toggle="dropdown">
                                            <span class="caret"></span>
                                            </button>
                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="#">Edit</a></li>
                            <li><a tabindex="-1" href="#">Remove</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="liContent" style="clear:both;">
                <span class="liContent-title">` + whyTitle + `</span>
                <br/><br/>
                <span class="liContent-date">` + displayDate + `</span>
            </div>
            <div class="liFooter">
                <ul class="footer-item-left">
                    <li>Comments: <span>` + commentCount + `</span></li>
                </ul>

                <ul class="footer-item-right">
                    <li><span class="fa fa-info-circle fa-2x" title="view why details"></span></li>
                    <li><span class="fa fa-comments-o fa-2x" title="view comment list" onclick="viewCommentList(this, '` + whyGuid + `');"></span></li>
                </ul>
            </div>

        </div>
    </li>`;

}

function liComment(username, userEmail, createdBy, gender, message){

    var imagePath = "";
    if (gender === "F")
        imagePath = "/img/user-icon-lady-64.png";
    else 
        imagePath = "/img/user-icon-man-64.png";

    var commentDate = new Date().toLocaleString();

    var applyStyle = "";

    if (userEmail === createdBy){
        applyStyle = "text-align:right;";
    }

    return `<li>
        <div class="chat-line" style="` + applyStyle + `">
            <div class="chat-icon" style="display:inline-block">
                <img src="` + imagePath + `" style="width:48px; padding:5px; display:inline-block" />
                <span style="display:inline-block">` + username + `</span>
            </div>
            <br/>
            <span class="comment-datetime" style="display:inline-block">` + commentDate + `</span>
            <div class="chat-content" style="display:block">
                ` + message + `
            </div>
        </div>
    </li>`;
}