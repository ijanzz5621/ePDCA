var gDomainName = "http://localhost:8080";

function callAjax(url, data){

    var result = {};

    $.ajax({
        type: 'POST',
        async: false,
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: gDomainName + url,
        success: function (data) {
            result = data;
        }
    });

    return result;
}

(function(){    
});

$(document).ready(function(){   
});

