
var loadJSON = function(file) {
    var response = undefined;
    $.getJSON("test.json", function(json) {
        response = json;
        console.log(response);
    });
    console.log(response);
    return response;
}

loadJSON('../data/projects.json');