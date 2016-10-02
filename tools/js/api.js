"use strict";

var app = app || {};

app.api = (function () {
    var url='https://bot2.shaula.uberspace.de/heisenberg/api/tools';

    function init(start) {
        url = url + "?apiKey="+app.key;
        internalApiCall(start);
    }

    function internalApiCall(start) {
        $.ajax({
            method: "GET",
            url: url
        })
            .done(function (result) {
                handleResults(result,start);
                app.result = result;
            });
    }

    function writeData() {
        console.log(url);
        var data = {
            category: app.categoryId,
            sections: app.sections
        };
        $.ajax({
            method: "POST",
            url: url,
            data: data
        })
            .done(function (result) {
                var cat = parseInt(app.category);
                cat+=1;
                handleResults(app.result,cat);
                console.log(result);
                console.log("Data written");
            });
    }

    function handleResults(result, category) {
        var sections = result.sections;
        var categories = result.categories;
        var sectionsHtml = "";

        for (var i=0; i<sections.length; i++){
            sectionsHtml+="<li id=i"+sections[i].id+" class='ui-widget-content'>"+sections[i].name+"</li>";
        }

        app.categoryId = categories[category].id;
        app.category = category;

        $('#selectable').html(sectionsHtml);
        $('#cat').html(categories[category].name+" "+app.category);
    }

    return{
        init: init,
        writeData: writeData
    }

}());