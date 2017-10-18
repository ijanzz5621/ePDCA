function liCheckActionList(actionGuid, username, gender, actionName, createdDate, currentStatus) {
    
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
    
        return `<li class="li-check-action" style="width:100%; display:inline-block;" id="` + actionGuid + `">
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
                            <!--<div class="dropdown">
                                <button id="btnLiMenu" class="dropdown-toggle" type="button" data-toggle="dropdown">
                                                    <span class="caret"></span>
                                                    </button>
                                <ul class="dropdown-menu">
                                    <li><a tabindex="-1" href="#" onclick="editAction('` + actionGuid + `')">Edit</a></li>
                                    <li><a tabindex="-1" href="#" onclick="removeAction('` + actionGuid + `')">Remove</a></li>
                                </ul>-->
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
                            <li><span class="fa fa-check fa-2x" title="Update"></span></li>
                        </ul>
                    </div>
        
                </div>
            </li>`;
    };