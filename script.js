$(document).ready(function () {
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
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
      setToLocalStorage(town)
      $(".myCity").text("Weather In:" + response.name);
      $(".temp").text("Temperture:" + response.main.temp);
      $(".humid").text("Humidity:" + response.main.humidity);
      $(".wind").text("Wind Speed:" + response.main.temp);
      $(".uv").text("UV Index:");
    });
   
  }
  


  $("#idbutton").on("click", function (e) {

    e.preventDefault;
    var searchTown = $("#searchCity").val();
    
    searchWeather(searchTown);
    makeHistoryListBtn(searchTown);
  
  });
});

function setToLocalStorage(text){
 
if(localStorage.getItem("history") === null){
  localStorage.setItem("history","[]")
}
  pastCitys = JSON.parse(localStorage.getItem("history"));

  pastCitys.push(text);
 
  localStorage.setItem("history",JSON.stringify(pastCitys));
  console.log(pastCitys);
}

 

function makeHistoryListBtn(text){
  
  let historyLi = $("<li>");
  let historyButtn = $("<button>").addClass("Cbtn");
  historyButtn.text(text)

  historyLi.append(historyButtn)
  $("#ulSearches").append(historyLi)
  $("#searchCity").val("");
}
