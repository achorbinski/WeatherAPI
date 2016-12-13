var input = document.getElementById("query");
var button = document.getElementById("getdata");
var resultsCity = document.getElementById("results");
var zipcode = document.getElementById("zipcode");
var resultsHiTemp = document.getElementById("hightemp");
var resultsLowTemp = document.getElementById("lowtemp");
var icon = document.getElementById("weathericon");


var map = L.map('map').setView([45.601140, -122.801056], 3);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


button.addEventListener("click", function(){
    var urlStart ="//api.wunderground.com/api/abeb70190a054e0f/conditions/forecast/q/";
    var urlEnd =".json";
    
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", callback);
    xhr.open("GET", urlStart + input.value + urlEnd);
    xhr.send();
    
    
    function callback() {
        var data = JSON.parse(xhr.responseText);
        
        var htmlStringCity = "";
        var htmlStringHighTemp = "";
        var htmlStringLowTemp = "";
        var htmlStringIconKey = "";
        
        htmlStringCity += data.current_observation.display_location.full
        htmlStringHighTemp += data.forecast.simpleforecast.forecastday[0].high.fahrenheit
        htmlStringLowTemp += data.forecast.simpleforecast.forecastday[0].low.fahrenheit
        htmlStringIconKey += data.current_observation.weather


        resultsCity.innerHTML = htmlStringCity;
        resultsHiTemp.innerHTML = htmlStringHighTemp;
        resultsLowTemp.innerHTML = htmlStringLowTemp;
        zipcode.innerHTML = input.value;
        
        if(htmlStringIconKey === "Overcast") {
            icon.src = "WeatherIconz/lightrain.png"
        } else {icon.src = "WeatherIconz/thunderstorms.png"
            
        };
    };
});

