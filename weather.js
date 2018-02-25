
let updateWidget = function(data) {
console.log("Got weather data: ", data)
  // update temperature value rounded to the nearest integer
  jQuery(".card-text").html("<p>It is "+ data.main.temp.toFixed(0) +" degrees outside </p>" )
  // update city name
  jQuery(".card-title").html("<h4>"+data.name+"</h4>")
  // update weather icon (using the first icon returned in the weather array)
  jQuery(".card-img-top").attr("src", "http://openweathermap.org/img/w/"+data.weather[0].icon+".png")
}

let getWeather = function(pos) {
  let position = pos.coords
  // update latitude with the value returned from the getLocation function
  let latitude = position.latitude.toFixed(4)
  // update longitude with the value returned from the getLocation function
  let longitude = position.longitude.toFixed(4)
  let apiKey = 'd03946f17daef3554b530763e5ce0526'; // REPLACE THIS VALUE with your own key.
  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

let getLocation = function(event) {
  console.log("Starting Trace...")
  // Trace current location & pass it to the getWeather function
  navigator.geolocation.getCurrentPosition(getWeather);
  console.log("Location Traced...")
}

let button = jQuery("#get_forecast")
button.on("click", getLocation);


////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
