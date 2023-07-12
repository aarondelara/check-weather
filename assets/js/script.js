
var searchButton = document.querySelector('#search-button');
var inputCity = document.querySelector('#city-name');
var cityContainer = document.querySelector('#current-city');
var forecastContainer = document.querySelector('#forecast');

function getLocation(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=a8469e3590068e1ffd438d0a50ae7be8`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            getCurrentWeather(lat, lon);
            getForecastWeather(lat, lon);
        })
}

function getCurrentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a8469e3590068e1ffd438d0a50ae7be8&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var section = convertDataToHTML(data, true);
            cityContainer.appendChild(section);
        })
}

function convertDataToHTML(data, cityName) {
    var section = document.createElement('section');
    var time = document.createElement('h2');
    var icon = document.createElement('img');
    var temp = document.createElement('p');
    var wind = document.createElement('p');
    var humidity = document.createElement('p');
    
    section.className = 'city';
    var t = new Date(data.dt*1000);
    time.textContent = `${t.getMonth()}/${t.getDate()}/${t.getFullYear()} ${t.getHours().toString().padStart(2,`0`)}:${t.getMinutes().toString().padStart(2,`0`)} `;
    icon.setAttribute(`src`, `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    temp.textContent = "Temp: " + data.main.temp + "\u00B0" + "F";
    wind.textContent = "Wind: " + data.wind.speed + " MPH";
    humidity.textContent = "Humidity: " + data.main.humidity + "%";
    if (cityName) {
        var city = document.createElement('h2');
        city.textContent = data.name;
        section.appendChild(city);
    }
    section.appendChild(time);
    section.appendChild(icon);
    section.appendChild(temp);
    section.appendChild(wind);
    section.appendChild(humidity);
    return section;
}


function getForecastWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a8469e3590068e1ffd438d0a50ae7be8&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.list.length; i++) {
                var forecastData = data.list[i];
                var section = convertDataToHTML(forecastData);
                forecastContainer.appendChild(section);
            }

        })
}


searchButton.addEventListener('click', function () {
    var searchedCity = inputCity.value;
    getLocation(searchedCity);
})

inputCity.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchButton.click();
    }
});