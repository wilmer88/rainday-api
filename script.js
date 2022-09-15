$(document).ready(function () {
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
  var ulElement = document.querySelector("#ulSearches");
  var APIkey = "3c5008effeceb13ebf5b25bfb8e0b11a";

  function searchWeather(town) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      town +
      "&appid=" +
      APIkey +
      "&units=imperial";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
      var weatherImg = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png" )
      $(".myCity").text("Weather In: " + response.name);
      $(".myCity").append(weatherImg);
      $(".temp").text("Temperture: " + response.main.temp + " °F");
      $(".humid").text("Humidity: " + response.main.humidity + " %");
      $(".wind").text("Wind Speed: " + response.main.temp + " MPH");
      $(".uv").text("UV Index:");
    });
  }

  function getForcast(town){
    var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    town +
    "&appid=" +
    APIkey +
    "&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#forcast-row").empty();
    for (var i = 0; i < response.list.length; i++) {
      // only look at forecasts around 3:00pm
      if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
        var col = $("<div style='margin-bottom: 10px;'>").addClass("col-md-4");
        
        var card = $("<div>").addClass("card bg-primary text-white");
        
        var body = $("<div>").addClass("card-body p-2");

        var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());

        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");

        var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp_max + " °F");
        var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");

        col.append(card.append(body.append(title, img, p1, p2)));
        
        $("#forcast-row").append(col);   
      }
    }
  });
  }

  function checkAndShowsLocalStorageCitys(){
    var checkStorage = JSON.parse(localStorage.getItem("history"));
    if(checkStorage){
      $("#ulSearches").empty()
      for(let i = 0; i < checkStorage.length; i ++){
        var allPastCitys = checkStorage[i]
        var pastCityLi = document.createElement("li");
        pastCityLi.setAttribute("data-index",i);
        var button = document.createElement("button");
       button.textContent = allPastCitys;
        pastCityLi.append(button);
        ulElement.append(pastCityLi);
      };
   };
  };

  function setToLocalStorage(text){
    if(localStorage.getItem("history") === null){
      localStorage.setItem("history","[]");
      let subStorageArr = JSON.parse(localStorage.getItem("history"));
      subStorageArr.push(text);
      localStorage.setItem("history",JSON.stringify(subStorageArr)); 
      $("#searchCity").val("");
      checkAndShowsLocalStorageCitys();
    }else{
        $("#ulSearches").empty()
        let subStorageArr2 = JSON.parse(localStorage.getItem("history"));
        subStorageArr2.push(text);
        localStorage.setItem("history",JSON.stringify(subStorageArr2)); 
        $("#searchCity").val("");
        checkAndShowsLocalStorageCitys()
    };
    };

  $("#ulSearches").on("click", "button", function() {
    $("#ulSearches").empty()
    searchWeather($(this).text());
    getForcast($(this).text());
    checkAndShowsLocalStorageCitys();
  });

  $("#idbutton").on("click", function (e) {
    e.preventDefault;
    var searchTown = $("#searchCity").val();
    searchWeather(searchTown); 
    getForcast(searchTown);
    setToLocalStorage(searchTown)
  });
  checkAndShowsLocalStorageCitys()
});



