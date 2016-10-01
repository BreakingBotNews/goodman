"use strict";

var app = app || {};

app.api = (function () {
    var url='https://bot2.shaula.uberspace.de/heisenberg/api/settings';
    
    function init() {
        internalApiCall();
    }

    function internalApiCall() {
        url = url + "?u="+app.user+"&s="+app.secret;
        $.ajax({
            method: "GET",
            url: url
        })
            .done(function (result) {
               handleResults(result);
            });
    }

    function handleResults(result) {
        var articles = result.articles;
        var themes = result.themes;
        var articlesHtml = "<h2>Last Articles</h2>";
        var themesHtml = "<h2>Themes</h2><ol>";

        for(var i=0;i<articles.length; i++){
            articlesHtml+="<div class='article'>";
            articlesHtml+="<h5>"+articles[i].headline+"</h5>";
            articlesHtml+="<p>"+articles[i].trailText+"</p>";
            articlesHtml+="</div>";
        }

        for(var i=0;i<themes.length; i++){
            themesHtml+="<li>"+themes[i].name+"</li>";
        }

        themesHtml+="</ol>";

        $('#articles').html(articlesHtml);
        $('#themes').html(themesHtml);
        app.main.endLoading();
    }
    
    return{
        init: init
    }

}());