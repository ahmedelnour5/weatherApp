// front end
const submitBtn = document.getElementById('submitBtn');
let userCity = document.getElementById('city');
const errorMsg = document.querySelector('.errorClass');

submitBtn.addEventListener('click', getLocation);

//location
let city;
let apiURL;

//get city from form. Call getWeather
function getLocation(event) {
  if (userCity.value === '') {
    errorMsg.style.visibility = 'visible';
  } else {
    city = userCity.value;
    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e8eda13ee3d73991abe4b0a27ee7dc21`;
    getWeather(apiURL);
  }
}

//make API call using fetch. Pass in location and api key. Return response
function getWeather(apiURL) {
  fetch(apiURL, { mode: 'cors' })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      getData(response);
    });
}
//clean data and create object
function getData(weatherObj) {
  return weatherCreator(
    weatherObj.name,
    weatherObj.main.temp,
    weatherObj.main.feels_like,
    weatherObj.main.humidity,
    weatherObj.wind
  );
}
//print object to DOM

//factory function to create weather Object
const weatherCreator = (cityName, temperature, feelsLike, humidity, wind) => {
  return { cityName, temperature, feelsLike, humidity, wind };
};
