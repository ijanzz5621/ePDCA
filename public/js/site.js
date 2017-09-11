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

$(document).ajaxStart(function(){
    $('#img-ajax-loading').show('slow');
});

$(document).ajaxStop(function(){
    $('#img-ajax-loading').hide('slow');
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


