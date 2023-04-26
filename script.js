
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

        forecast(data.list[0]);
        for (i = 7; i < 40; i += 8) {
         forecast(data.list[i]);
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
            var card = $('<div>').addClass('card').attr('style', 'width: 30vw')
            var cardTitle = $('<h3>').addClass('card-title').text(data.name)
            var cardBody = $('<div>').addClass('card-body')
            var tempEl = $('<p>').addClass('card-text').text('Temp: ' + data.main.temp.toFixed(0) + "°F")
            var windEl = $('<p>').addClass('card-text').text('Wind Speed: ' + data.wind.speed)
            var humidityEl = $('<p>').addClass('card-text').text('Humidity: ' + data.main.humidity)
            var iconCode =  $('<img>').addClass('card-img-top').attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png').attr('alt', 'Weather icon').attr('style', 'width: 55px', 'height: 55px');
            $('.weather').append(card.append(cardTitle, iconCode, cardBody, tempEl, windEl, humidityEl))
            getFiveDay(data.id);
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
            getWeatherResults(lat, lon);

        }
        )
}

function forecast(day) {
    var dt_txt = day.dt_txt.split(" ")
    var date = dt_txt[0];
    var windSpeed = day.wind.speed;
    var temperature = day.main.temp;
    var humidity = day.main.humidity;
    console.log(date, windSpeed, temperature, humidity);

}

searchButton.addEventListener('click', getLatLon);


// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=c2497406e274517dafa1edd628b99c41
// * get search term
// * send search to API
// * get results from API
// * render results to result container
// *  - each result should include
// *  - temp
// *  - weather,
//      temp,
//      humidity,
//      wind speed
// * - New results should clear old results
// * - Once results are located, the search term should be emptied
// * - search revealed below search button