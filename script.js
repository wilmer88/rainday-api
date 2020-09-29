$(document).ready(function(){
  
  var APIkey = "0b7e120ecb6a0831c512bd4a23e5b882";
  
  function searchWeather(town){
    var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + town + "&appid=" + APIkey + "&units=imperial";
    $.ajax({
      url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response)
    
     $(".myCity").text("City:" + response.name);
     $(".temp").text("Temperture:" + response.main.temp);
     $(".humid").text("Humidity:" + response.main.humidity);
    // $(".temperture").text("response.main.temp");
  });
  }
  
  
  
  $("#idbutton").on("click", function(e){
    e.preventDefault
    var searchTown = $("#searchCity").val();
    console.log(searchTown)
  searchWeather(searchTown)
})




})
