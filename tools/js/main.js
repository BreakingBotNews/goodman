"use strict";

var app = app || {};

app.main = (function () {
    function init() {
        app.key = gup('key',window.location);
        var start = gup('start',window.location);
        if(app.key){
            if(start){
                app.api.init(start);
            }
            else{
                app.api.init(0);
            }
        }else{
            prompt("Something went wrong!");
            //maybe just try to show user data here, if user is provided
        }

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
        init: init
    }
}());