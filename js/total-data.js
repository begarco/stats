
var loadJSON = function(file) {
    var response = undefined;
    $.getJSON(file, function(json) {
        response = json;
        console.log(response);
    });
    console.log(response);
    return response;
}

loadJSON('../data/projects-2018-08-05.json');
loadJSON('data/projects-2018-08-05.json');