$(document).ready(function () {
  
  var ulElement = document.querySelector("#ulSearches");
function setToLocalStorage(text){
  if(localStorage.getItem("history") === null){
    localStorage.setItem("history","[]");
    let subStorageArr = JSON.parse(localStorage.getItem("history"));
    subStorageArr.push(text);
    localStorage.setItem("history",JSON.stringify(subStorageArr)); 
    $("#searchCity").val("");
    checkAndShowsLocalStorageCitys();
  }else{
    let subStorageArr2 = JSON.parse(localStorage.getItem("history"));
    subStorageArr2.push(text);
    localStorage.setItem("history",JSON.stringify(subStorageArr2)); 
    $("#searchCity").val("");
    checkAndShowsLocalStorageCitys()
  };
  };

function checkAndShowsLocalStorageCitys(){
  var checkStorage = JSON.parse(localStorage.getItem("history"))
  if(checkStorage){
    $("#ulSearches").empty()
    for(let i = 0; i < checkStorage.length; i ++){
      var allPastCitys = checkStorage[i]
      var pastCityLi = document.createElement("li");
      pastCityLi.setAttribute("data-index",i);
      var button = document.createElement("button");
     button.textContent = allPastCitys
      console.log(button )
      pastCityLi.append(button)
      ulElement.append(pastCityLi)
    }
 }
}
  
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
  });

  checkAndShowsLocalStorageCitys()
});

