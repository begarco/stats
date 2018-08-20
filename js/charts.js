/**
    Load a JSON file from an url.
**/
var loadJSON = function(file) {
    return $.getJSON(file, function(json) {
        response = json;
        return response;
    });
}

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


var historyPromise = loadJSON('data/history.json');

$.when(historyPromise).done(function(history){

    // Maximum value
    var maxi = Math.ceil(Math.max.apply(null, history['downloads'], history['stars'], history['forks'])*1.05);
    var maxi_var = Math.ceil(Math.max.apply(null, history['downloads_var'], history['stars_var'], history['forks_var'])*1.05);

    // Evolution chart
    var ctx = document.getElementById("evolChart");
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: history['labels'],
        datasets: [
        {
          label: "Stars",
          lineTension: 0.3,
          backgroundColor: "rgba(216,216,17,0.2)",
          borderColor: "rgba(216,216,17,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(216,216,17,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(216,216,17,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: history['stars'],
        },
        {
          label: "Downloads",
          lineTension: 0.3,
          backgroundColor: "rgba(2,216,117,0.2)",
          borderColor: "rgba(2,216,117,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,216,117,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,216,117,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: history['downloads'],
        },
        {
          label: "Forks",
          lineTension: 0.3,
          backgroundColor: "rgba(216,2,117,0.2)",
          borderColor: "rgba(216,2,117,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(216,2,117,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(216,2,117,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: history['forks'],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: maxi,
              maxTicksLimit: 5
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: true
        }
      }
    });

    // Variation chart
    ctx = document.getElementById("varChart");
    myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: history['labels'],
        datasets: [
        {
          label: "New Stars",
          lineTension: 0.3,
          backgroundColor: "rgba(216,216,17,0.2)",
          borderColor: "rgba(216,216,17,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(216,216,17,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(216,216,17,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: history['stars_var'],
        },
        {
          label: "New Downloads",
          lineTension: 0.3,
          backgroundColor: "rgba(2,216,117,0.2)",
          borderColor: "rgba(2,216,117,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,216,117,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,216,117,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: history['downloads_var'],
        },
        {
          label: "New Forks",
          lineTension: 0.3,
          backgroundColor: "rgba(216,2,117,0.2)",
          borderColor: "rgba(216,2,117,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(216,2,117,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(216,2,117,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: history['forks_var'],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: maxi_var,
              maxTicksLimit: 5
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: true
        }
      }
    });
});