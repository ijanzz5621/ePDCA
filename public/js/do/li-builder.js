function liActualRootcauseList(rootcauseGuid, username, gender, probStatement, rootcauseTitle, createdDate, currentStatus, actionCount) {

    var displayDate = new Date(createdDate).toLocaleString();

    var imagePath = "";
    var actualRTStyle = "";
    var onclick = "";
    var title = "";

    if (gender === "F")
        imagePath = "/img/user-icon-lady-64.png";
    else
        imagePath = "/img/user-icon-man-64.png";

    actualRTStyle = "color:green;cursor:default;";
    onclick = "";
    title = "Actual root cause";

    var liIsNew = "";
    if (currentStatus === "NEW")
        liIsNew = "<img src=\"/img/new-icon.png\" style=\"width:60px; height:30px;\">";

    return `<li class="li-rootcause" style="min-height:160px;">
            <div class="liContent">
    
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
                    <span class="liContent-title1">` + probStatement + `</span>
                    <br/>
                    <span class="liContent-title2">` + rootcauseTitle + `</span>
                    <br/><br/>
                    <span class="liContent-date">` + displayDate + `</span>
                </div>
                <div class="liFooter">
                    <ul class="footer-item-left">
                        <li>Action: <span>` + actionCount + `</span></li>
                    </ul>
    
                    <ul class="footer-item-right">
                        <li><span class="fa fa-info-circle fa-2x" title="view details"></span></li>
                        <li><span class="fa fa-edit fa-2x" title="view action list" onclick="viewActionList(this, '` + rootcauseGuid + `');"></span></li>
                    </ul>
                </div>
    
            </div>
        </li>`;
};

function liDoActionList(actionGuid, username, gender, actionName, createdDate, currentStatus) {

    var displayDate = new Date(createdDate).toLocaleString();

    var imagePath = "";
    var title = "";

    if (gender === "F")
        imagePath = "/img/user-icon-lady-64.png";
    else
        imagePath = "/img/user-icon-man-64.png";

    var liIsNew = "";
    if (currentStatus === "OPEN")
        liIsNew = "<img src=\"/img/new-icon.png\" style=\"width:60px; height:30px;\">";

    return `<li class="li-rootcause" style="width:350px; display:inline-block;" id="` + actionGuid + `">
            <div class="liContent">
    
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
                                <li><a tabindex="-1" href="#" onclick="editAction('` + actionGuid + `')">Edit</a></li>
                                <li><a tabindex="-1" href="#" onclick="removeAction('` + actionGuid + `')">Remove</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="liContent" style="clear:both;">
                    <span class="liContent-title">` + actionName + `</span>
                </div>
                <div class="liFooter">
                    <ul class="footer-item-left">
                        <li><span class="liContent-status">` + currentStatus + `</span></li>
                        <li><span class="liContent-date">` + displayDate + `</span></li>
                    </ul>
    
                    <ul class="footer-item-right">
                        <li><span class="fa fa-info-circle fa-2x" title="view action details"></span></li>
                    </ul>
                </div>
    
            </div>
        </li>`;
};