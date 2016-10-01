"use strict";

var app = app || {};

app.social = (function () {
    var permissions = 'public_profile,user_hometown,user_likes,user_location';
    function init() {
        $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
            FB.init({
                appId: '1810463285855790',
                version: 'v2.7',
                xfbml: false
            });
            fbLogin();
        });
    }
    function fbLogin() {
        FB.getLoginStatus(function(data){fbLoginCallback(data)});
    }

    function fbLoginCallback(data) {
        if(data.status==="connected"){
            fbGetData();
        }
        else {
            $('#welcome').show();
        }
    }

    function fbLoginButton(){
        $('#welcomeText').text("Please use the facebook dialog window.");
        FB.login(function(data){
                if(data.status === "connected"){
                   $("#welcome").fadeOut();
                    fbLoginCallback(data);
                }
                else{ //change welcome screen text
                    $('#welcomeText').text("Sorry! Without your facebook data the app can not be used. You can invoke the dialog again on the button.");
                }
            }, //permissions asked
            {scope: permissions}
        );
    };
    
    function fbGetData() {
        FB.api('/me?fields=hometown{location},location{location},likes.limit(100){category,name,fan_count}', fbGetDataCallback);
    }
    
    function fbGetDataCallback(data) {
        app.fbData = data;
        fbPaging(data);
        //grep after v2.7/ then FB.api()... as long as paging.next
    }

    function fbPaging(data) {
        var url;
        if(data.paging){
            for(var i=0; i<data.data.length; i++){
                app.fbData.likes.data.push(data.data[i]);
            }
            if(data.paging.next){
                url = cutUrl(data.paging.next);
                FB.api(url,fbPaging);
            }
            else {
                app.api.init();
                return;
            }
        }
        if(data.likes.paging){
            if(data.likes.paging.next){
                url = cutUrl(data.likes.paging.next);
                FB.api(url,fbPaging);
            }
            else{
                app.api.init();
            }
        }
        else {
            app.api.init();
        }
    }

    function cutUrl(fullURL) {
        return fullURL.slice(31);
    }

    return{
        init: init,
        fbLoginButton: fbLoginButton
    }
}());