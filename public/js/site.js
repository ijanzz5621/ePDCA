var gDomainName = "http://localhost:12345";

function callAjax(url, data) {

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

function callAjax2(url, data) {
    return $.ajax({
        type: 'POST',
        async: true,
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: gDomainName + url
        /*, success: function (data) {
            result = data;
        }*/
    });
}

(function () {
});

$(document).ready(function () {
});

$(document).ajaxStart(function () {
    $('#img-ajax-loading').show('slow');
});

$(document).ajaxStop(function () {
    $('#img-ajax-loading').hide('slow');
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/*$(document).on('keypress', 'input', function(e){
    //e.preventDefault();
    if (e.keyCode === 13){
        //focus to the next input
        alert('You pressed enter!')
        //$(this).next('textarea').focus();
    }
    
});*/

$('input').on("keypress", function (e) {
    /* ENTER PRESSED*/
    if (e.keyCode == 13) {
        /* FOCUS ELEMENT */
        var inputs = $(this).parents("form").eq(0).find(":input");
        var idx = inputs.index(this);

        alert(idx);

        if (idx == inputs.length - 1) {
            inputs[0].select()
        } else {
            inputs[idx + 1].focus(); //  handles submit buttons
            inputs[idx + 1].select();
        }
        return false;
    }
});


