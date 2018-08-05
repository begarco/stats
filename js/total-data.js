
var loadJSON = function(file) {
    var response = undefined;
    $.getJSON(file, function(json) {
        response = json;
        console.log(response);
    });
    return response;
}

var loadFile = function(file) {
    var response = undefined;
    $.get(file, function(content) {
        response = content;
        console.log(response);
    });
    return response;
}


var latestData = loadFile('../data/latest');
var projects = loadJSON('../data/'+latestData);

$("#projects_count").text(function(index, old) {
    return projects.length;
});