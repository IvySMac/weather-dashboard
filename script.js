
function todaysDate() {
    var today = new Date();
    var currentDay = document.getElementById('current-day');
    currentDay.textContent = today.toLocaleDateString('en-Us', { year: 'numeric', month: 'short', day: 'numeric' });
}

todaysDate();

var searchButton = document.getElementById('search-button');
function getFiveDay(id) {
  
    var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=c2497406e274517dafa1edd628b99c41&units=imperial`;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        for (i = 7; i < 40; i += 8) {
         var forecastData = data.list[i];
         var forecastDate = forecastData.dt_txt.split(' ')[0];
         var formattedDate = new Date(forecastDate).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'});
         var forecastTemp = forecastData.main.temp.toFixed(0) + '°F';
         var forecastWind = forecastData.wind.speed + ' mph';
         var forecastIcon = forecastData.weather[0].icon;
         var forecastHumidity = forecastData.main.humidity + '%';

         var forecastCard = $('<div>').addClass('card');
         var forecastCardBody = $('<div>').addClass('card-body');
         var forecastDateEl = $('<h5>').addClass('card-title').text(formattedDate);
         var forecastCode =  $('<img>').addClass('card-text').attr('src', 'http://openweathermap.org/img/wn/' + forecastIcon + '.png').attr('alt', 'Weather icon').attr('style', 'width: 100px', 'height: 100px');
         var forecastTempEl = $('<p>').addClass('card-text').text('Temperature: ' + forecastTemp);
         var forecastWindEl = $('<p>').addClass('card-text').text('Wind Speed: ' + forecastWind);
         var forecastHumidityEl = $('<p>').addClass('card-text').text('Humidity: ' + forecastHumidity);
         forecastCardBody.append(forecastDateEl, forecastCode, forecastTempEl, forecastWindEl, forecastHumidityEl);
         forecastCard.append(forecastCardBody, forecastCode);
         $('#forecast').append(forecastCard);
        }
        
        }
        )
}

function getWeatherResults(lat, lon) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c2497406e274517dafa1edd628b99c41&units=imperial`

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var card = $('<div>').addClass('card').attr('style', 'width: 20vw')
            var cardTitle = $('<h3>').addClass('card-title').text(data.name)
            var cardBody = $('<div>').addClass('card-body')
            var iconCode =  $('<img>').addClass('card-text').attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png').attr('alt', 'Weather icon').attr('style', 'width: 100px', 'height: 100px');
            var tempEl = $('<p>').addClass('card-text').text('Temp: ' + data.main.temp.toFixed(0) + "°F")
            var windEl = $('<p>').addClass('card-text').text('Wind Speed: ' + data.wind.speed+ " mph")
            var humidityEl = $('<p>').addClass('card-text').text('Humidity: ' + data.main.humidity+ "%")
            $('.weather').append(card.append(cardTitle, iconCode, cardBody, tempEl, windEl, humidityEl))
            getFiveDay(data.id);

            var fiveCard=$('<div>').addClass('card')
            var fiveCardBody=$('<div>').addClass('card-body')
            var fiveDayTitle=$('<h4>').addClass('five-day').text('5 Day Forecast:');
            fiveCard.append(fiveCardBody);
            $('.five-day').append(fiveDayTitle);
        }
        )


};
function getLatLon(event) {
    var cityname = $(this).siblings(".city-value").val().trim();
    console.log(cityname);
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=c2497406e274517dafa1edd628b99c41`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat
            var lon = data[0].lon
            $('.weather').empty();
            $('.five-day').empty();
            $('#forecast').empty();
            getWeatherResults(lat, lon);
          

        }
        )
}

searchButton.addEventListener('click', getLatLon);

