// front end
const submitBtn = document.getElementById('submitBtn');
let userCity = document.getElementById('city');
const errorMsg = document.querySelector('.errorClass');
let container = document.querySelector('.container');

submitBtn.addEventListener('click', getLocation);

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
  //create div elements for Card container,header,body,and footer.
  let card = document.createElement('div');
  let cardHeader = document.createElement('div');
  let cardBody = document.createElement('div');
  let cardFooter = document.createElement('div');
  //create h3 to display city name
  let title = document.createElement('h3');
  //create p elements to display other weather object properties
  let cardTemp = document.createElement('p');
  let cardFeels = document.createElement('p');
  let cardHumidity = document.createElement('p');
  let cardWind = document.createElement('p');
  //set the text of created elements to the object values
  title.innerText = reqWeather.cityName;
  cardTemp.innerText = reqWeather.temperature;
  cardFeels.innerText = reqWeather.feelsLike;
  cardHumidity.innerText = reqWeather.humidity;
  cardWind.innerText = reqWeather.wind.speed + 'mph';

  //append elements
  cardHeader.appendChild(title);
  cardBody.appendChild(cardTemp);
  cardFooter.appendChild(cardFeels);
  cardFooter.appendChild(cardHumidity);
  cardFooter.appendChild(cardWind);
  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  //append card to DOM
  container.appendChild(card);
}
