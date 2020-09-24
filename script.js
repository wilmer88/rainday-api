var APIkey = "0b7e120ecb6a0831c512bd4a23e5b882";
var queryURL =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" +
  APIKey +
  "units=imperial";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  $(".city").text("City name" + "response.name");
  $(".wind").text("response.wind.speed");
  $(".humidity").text("response.main.humidity");
  $(".temperture").text("response.main.temp");
});
