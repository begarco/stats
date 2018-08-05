
var loadJSON = function(file) {
    var response = undefined;
    $.getJSON(file, function(json) {
        response = json;
        console.log(response);
    });
    console.log(response);
    return response;
}

loadJSON('../data/projects.json');
loadJSON('data/projects.json');