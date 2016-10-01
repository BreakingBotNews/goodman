"use strict";

var app = app || {};

app.api = (function () {
    var url='https://bot2.shaula.uberspace.de/heisenberg/api/settings';
    
    function init() {
        internalApiCall();
    }

    function internalApiCall() {
        url = url + "?u="+app.user+"&s="+app.secret;
        var data = {
            user: app.user,
            secret: app.secret,
            fbData: app.fbData
        };
        $.ajax({
            method: "POST",
            url: url,
            data: data
        })
            .done(function (result) {
              app.main.endLoading();
            });
    }
    
    return{
        init: init
    }

}());