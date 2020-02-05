// Sign up at https://openweathermap.org/ to obtain an API key
var OPEN_WEATHER_KEY = 'ceaa75c659c3266da54b7b7c43c317f2';

var getLocation = document.getElementById("getLocation");
var searchBox = document.getElementById("search-box");
var input = document.getElementById("search-input");

var weatherData = document.getElementById("weather-data");
var cityName = document.getElementById("city");
var degree = document.getElementById("degree");
var saveData = document.getElementById("save-data");
var invalid = document.getElementById("invalid");
var detailWeather = document.getElementById("description");
var weatherIcon = document.getElementById("weather-icon");

var boxTitle = document.getElementById("box-title");
var cityList = document.getElementById("city-list");

var savedCity = [];
var inputData;
loadDataQueries();

saveData.addEventListener("click", function(e) {
    e.preventDefault();

    var name = inputData;
    writeDataQueries(name);
});

function writeDataQueries(query) {
    savedCity.push(query);
    if (savedCity.length === 1) {
        boxTitle.classList.remove("hidden");
    }
    changeQueries();
}

function changeQueries() {
    var queryJson = JSON.stringify(savedCity);
    localStorage.setItem("city-query", queryJson);
    displaySavedCity();
}

function loadDataQueries() {
    try {
        var queryJson = localStorage.getItem("city-query");
        var queries = JSON.parse(queryJson) || [];
        savedCity = queries;
        if (savedCity.length > 0) {
            displayWeather(savedCity[0]);
            inputData = savedCity[0];
            boxTitle.classList.remove("hidden");
        }
    } catch(e) {
        savedCity = [];
    }
    displaySavedCity();
}

function displaySavedCity() {
    cityList.innerHTML = "";
    savedCity.forEach(function (item) {
        var cityElement = document.createElement("li");
        var listName = document.createElement("a");
        listName.setAttribute("href", "#");
        listName.setAttribute("class", "btn btn-light");
        listName.innerHTML = item;
        listName.addEventListener("click", function(e) {
            displayWeather(item);
            inputData = item;
            input.value = item;
        });
        listName.classList.add("place-left");

        var removeCity = document.createElement("a");
        removeCity.setAttribute("href", "#");
        removeCity.setAttribute("class", "btn btn-secondary");
        removeCity.innerHTML = "Remove";
        removeCity.addEventListener("click", function (e) {
            removeWeather(item);
        });
        removeCity.classList.add("place-right");

        cityElement.appendChild(listName);
        cityElement.appendChild(removeCity);
        cityList.appendChild(cityElement);
    });
}

function removeWeather(inputValue) {
    var filteredList = savedCity.filter(function (item) {
        return inputValue !== item;
    });
    savedCity = filteredList;
    if (savedCity.length < 1) {
        boxTitle.classList.add("hidden");
    }
    changeQueries();
}

searchBox.addEventListener("submit", function(e) {
    e.preventDefault();

    inputData = input.value;
    displayWeather(inputData);
});

function displayWeather(inputValue) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + inputValue + "&appid=" + OPEN_WEATHER_KEY + "&units=imperial";

    fetchFunction(url);
}

getLocation.addEventListener("click", function(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
        var lat = parseFloat(position.coords.latitude).toFixed(4);
        var long = parseFloat(position.coords.longitude).toFixed(4);
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + OPEN_WEATHER_KEY + "&units=imperial";
        fetchFunction(url);
    }
}); 


function fetchFunction(inputValue) {
    var fetchLink = fetch(inputValue);
    fetchLink.then(function (response){
        response.json().then(function (data) {
            if (response.status === 200) {
                invalid.classList.add("hidden");
                invalid.classList.remove("block");
                weatherData.classList.remove("hidden");

                var name = data.name;
                var temp = parseInt(data.main.temp, 10);
                var icon = data.weather[0].icon;
                var detail = data.weather[0].main;
                var detail2 = data.weather[0].description;

                weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                cityName.textContent = name;
                degree.textContent = temp + "°";
                detailWeather.textContent = detail + " (" + detail2 + ")";
            } else {
                invalid.classList.remove("hidden");
                invalid.classList.add("block");
                weatherData.classList.add("hidden");
            }
        });
    });
}

