
var loadJSON = function(file) {
    return $.getJSON(file, function(json) {
        response = json;
        console.log(response);
        return response;
    });
}

var loadFile = function(file) {
    return $.get(file, function(content) {
        response = content;
        console.log(response);
        return response;
    });
}


var latestPromise = loadFile('data/latest');
var projectsPromise = $.when(latestPromise).done(function(last){
    return loadJSON('data/'+last);
});

$.when(projectsPromise).done(function(projects){
    $("#projects_count").text(function(index, old) {
        return projects.length;
    });
});
