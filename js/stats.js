/**
    Load a JSON file from an url.
**/
var loadJSON = function(file) {
    return $.getJSON(file, function(json) {
        response = json;
        console.log(response);
        return response;
    });
}

/**
    Load a file from an url.
**/
var loadFile = function(file) {
    return $.get(file, function(content) {
        response = content;
        console.log(response);
        return response;
    });
}

/**
    Compute the number of projects.
**/
var computeProjectsNumber = function(projects) {
    return projects.length;
};

/**
    Compute the stars number of projects.
**/
var computeProjectsStars = function(projects) {
    var result = 0;
    projects.forEach(function(project, key, map){
        result = result + parseInt(project['stargazers_count']);
    });
    return result;
};

/**
    Compute the downloads number of projects.
**/
var computeProjectsDownloads = function(projects) {
    var result = 0;
    projects.forEach(function(project, key, map){
        result = result + parseInt(project['download_count']);
    });
    return result;
};

/**
    Compute the watchers number of projects.
**/
var computeProjectsWatchers = function(projects) {
    var result = 0;
    projects.forEach(function(project, key, map){
        result = result + parseInt(project['watchers_count']);
    });
    return result;
};

/**
    Compute the menu of all projects.
**/
var computeProjectsMenu = function(projects) {
    var result = "";
    projects.forEach(function(project, key, map){
        result = result + "<a class='dropdown-item' href='#"+project['id']+"'>"+project['name']+"</a>";
    });
    return result;
};

/**
    Compute the table of all projects stats.
**/
var computeProjectsStatsTable = function(projects) {
    var result = "";
    projects.forEach(function(project, key, map){
        result = result + "<tr><td>"+project['name']+"</td></tr>";
        result = result + "<td>"+project['stargazers_count']+"</td>";
        result = result + "<td>"+project['watchers_count']+"</td>";
        result = result + "<td>"+project['download_count']+"</td>";
        result = result + "<td>"+project['forks_count']+"</td>";
        result = result + "<td>"+project['updated_at']+"</td></tr>";
    });
    return result;
};

/**
    MAIN PROGRAM EXECUTION
**/
var main = function() {
    var latestPromise = loadFile('data/latest');

    $.when(latestPromise).done(function(last){
        var projectsPromise = loadJSON('data/'+last);

        $.when(projectsPromise).done(function(projects){
            $("#projects_menu").html(function(index, old) {
                return computeProjectsMenu(projects);
            });
            $("#projects_count").text(function(index, old) {
                return computeProjectsNumber(projects);
            });
            $("#stars_count").text(function(index, old) {
                return computeProjectsStars(projects);
            });
            $("#downloads_count").text(function(index, old) {
                return computeProjectsDownloads(projects);
            });
            $("#watchers_count").text(function(index, old) {
                return computeProjectsWatchers(projects);
            });
            $("#stats-table").html(function(index, old) {
                return computeProjectsStatsTable(projects);
            });
        });
    });
};

main();