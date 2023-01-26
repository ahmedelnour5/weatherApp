// front end
const form = document.getElementById('form');
let userCity = document.getElementById('city');
const errorMsg = document.querySelector('.errorClass');
let container = document.querySelector('.container');

form.addEventListener('submit', getLocation);

//location
let city;
let apiURL;
let reqWeather;
//get city from form. Call getWeather
function getLocation(event) {
  event.preventDefault();
  if (userCity.value === '') {
    errorMsg.style.visibility = 'visible';
  } else {
    city = userCity.value;
    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=e8eda13ee3d73991abe4b0a27ee7dc21`;
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
  reqWeather = weatherCreator(
    weatherObj.name,
    weatherObj.main.temp,
    weatherObj.main.feels_like,
    weatherObj.main.humidity,
    weatherObj.wind
  );
  print(reqWeather);
}
//print object to DOM

//factory function to create weather Object
const weatherCreator = (cityName, temperature, feelsLike, humidity, wind) => {
  return { cityName, temperature, feelsLike, humidity, wind };
};

//function to print elements to DOM
function print(req) {
  //create div element for Card container
  let card = document.createElement('div');
  //create h3 to display city name
  let title = document.createElement('h3');
  title.setAttribute('id', 'cityTitle');
  //create p elements to display other weather object properties
  let cardTemp = document.createElement('p');
  cardTemp.setAttribute('id', 'temperature');
  let cardFeels = document.createElement('p');
  cardFeels.setAttribute('id', 'feels');
  let cardHumidity = document.createElement('p');
  cardHumidity.setAttribute('id', 'humid');
  let cardWind = document.createElement('p');
  cardWind.setAttribute('id', 'wind');
  //set the text of created elements to the object values
  title.innerText = reqWeather.cityName;
  cardTemp.innerHTML = reqWeather.temperature + '&#8457;';
  cardFeels.innerHTML = 'Feels Like: ' + reqWeather.feelsLike + '&#8457;';
  cardHumidity.innerText = 'Humidity: ' + reqWeather.humidity + ' %';
  cardWind.innerText = 'Wind: ' + reqWeather.wind.speed + 'mph';

  //append elements
  card.appendChild(title);
  card.appendChild(cardTemp);
  card.appendChild(cardFeels);
  card.appendChild(cardHumidity);
  card.appendChild(cardWind);

  card.classList.add('card');
  //append card to DOM
  container.appendChild(card);
}
