$('document').ready(function() {

  // get location using IP API
  var location = "http://ip-api.com/json";
  $.getJSON(location, function(data) {
    var lat = data.lat;
    var lon = data.lon;
    var city = data.city;
    var country = data.country;

    // Use location data to get weather data from open weather API
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=5f7bcf238dc7056a7325948af9cb61be", function(data) {

      // Data
      var icon = deriveIcon(data.weather[0].icon);

      var tempInCelsius = Math.round(((data.main.temp) - 273.15 ));
      var tempInFarenheit = tempInCelsius + 32;
      tempInCelsius = tempInCelsius.toFixed(1);
      tempInFarenheit = tempInFarenheit.toFixed(1);

      var windSpeed = data.wind.speed;
      windSpeed = windSpeed.toFixed(1);

      var description = data.weather[0].description;

      // Apply Data To Page
      $("#weather-icon").attr("src", icon);
      $("#wind-speed").text(windSpeed + " mph");
      $("#weather-description").text(description);
      $("#city").text(city);
      $("#temperature").text(tempInCelsius + "°C");

      $("#farenheit").click(function(){
        $("#farenheit").addClass("active");
        $("#celsius").removeClass("active");
        $("#temperature").text(tempInFarenheit + "°F");
      });

      $("#celsius").click(function(){
        $("#celsius").addClass("active");
        $("#farenheit").removeClass("active");
        $("#temperature").text(tempInCelsius + "°C");
      });
    });
  })
})

function deriveIcon(iconCode) {
  // icons from: https://thenounproject.com/maxrandall/collection/weather/?oq=weather&cidx=0
  switch(iconCode) {
    case "01d": // clear sky, day
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77878-200.png";
    case "01n": // clear sky, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77869-200.png";
    case "02d": // some clouds, day
    case "03d": // scattered clouds, day
    case "04d": // broken clouds, day
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77877-200.png";
    case "02n": // some clouds, night
    case "03n": // scattered clouds, night
    case "04n": // broken clouds, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77866-200.png";
    case "09d": // shower rain, day
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77876-200.png";
    case "09n": // shower rain, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77867-200.png";
    case "10d": // rain, day
    case "10n": // rain, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77857-200.png";
    case "11d": // thunderstorm, day
    case "11n": // thunderstorm, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77858-200.png";
    case "13d": // snow, day
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77860-200.png";
    case "13n": // snow, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77872-200.png";
    case "50n": // misr, night
    case "50d": // mist, day
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77881-200.png";
    default: // default make it sunny
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77878-200.png";
  }
}

// add link to pages
var url = document.location.toString();
if (url.match('#')) {
  $('.nav-tabs a[href="#' + url.split('#')[1] + '"]').tab('show');
}

// Change hash for page-reload
$('.nav-tabs a').on('shown.bs.tab', function (e) {
  window.location.hash = e.target.hash;
})
