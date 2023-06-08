
var searchButton = document.querySelector('#search-button')
var inputCity = document.querySelector('#city-name')

function getLocation(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=a8469e3590068e1ffd438d0a50ae7be8`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            getCurrentWeather(lat, lon)
        })
    console.log('hello')
}

function getCurrentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a8469e3590068e1ffd438d0a50ae7be8&units=imperial`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            displayCurrentWeather(data)
        })
}

function displayCurrentWeather(data) {
    var currentCity = document.querySelector('#city')
    var icon = document.querySelector('#weather-icon')
    var currentTemp = document.querySelector('#temp')
    var currentWind = document.querySelector('#wind')
    var currentHumidity = document.querySelector('#humidity')

    currentCity.textContent = data.name
    icon.setAttribute(`src`, `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    currentTemp.textContent = "Temp: " + data.main.temp + "\u00B0" + "F"
    currentWind.textContent = "Wind: " + data.wind.speed + " MPH"
    currentHumidity.textContent = "Humidity: " + data.main.humidity + "%"
}

function getForecastWeather(lat,lon) {
    fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a8469e3590068e1ffd438d0a50ae7be8&units=imperial`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        displayCurrentWeather(data)
    })
}



searchButton.addEventListener('click', function () {
    var searchedCity = inputCity.value
    getLocation(searchedCity)
})

inputCity.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('#search-button').click();
    }
});

var currentDate = newDate();
var formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
console.log(formattedDate);
