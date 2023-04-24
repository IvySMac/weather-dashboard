var API_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=c2497406e274517dafa1edd628b99c41"

fetch(API_BASE_URL)
.then(function (res){
    if (!res.ok) throw new Error('Oops');

    console.log('results:', res);

    return res.json();
})    
.then(function (data) {
    console.log('data:', data);
   renderWeatherResults(data.Search);
})
.catch(function (error) {
    console.error(error);
})



// var searchButton = document.getElementById('search-button');

// function getWeatherResults() {

//   var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=c2497406e274517dafa1edd628b99c41';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//      console.log(data);
//       }
//     )};

// searchButton.addEventListener('click', getWeatherResults);



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