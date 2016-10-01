"use strict";

var app = app || {};

app.main = (function () {
    function init() {
        app.user = gup('u',window.location);
        app.secret = gup('s',window.location);
        if(app.user && app.secret){
            app.api.init();
        }else{
            prompt("Something went wrong!");
            //maybe just try to show user data here, if user is provided
        }
        
    }
    
    function endLoading() {
        $('#loading').fadeOut();
    }

    function gup( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }

    return{
        init: init,
        endLoading: endLoading
    }
}());