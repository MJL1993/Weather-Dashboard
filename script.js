var searchedCities = []

//When opening the page, run localStorage search function/populate page with buttons from localStorage
window.addEventListener("load", function(){
  console.log()

  let localStorageCities = localStorage.getItem("searchedCities")

  searchedCities = JSON.parse(localStorageCities)

    // get the local storage key that holds previously searched cites
  for(let i = 0; i < searchedCities.length; i++){

    console.log(searchedCities[i])

    var searchedBTN = $("<button>").text(searchedCities[i])

    searchedBTN.on("click", function(e) {
      console.log(e)
      searchCity(e.target.textContent)
    })
    
    $(".search-cities").prepend(searchedBTN)
    searchedBTN.addClass("btn")
    searchedBTN.addClass("btn-dark")
    searchedBTN.attr("type", "button")
    
  }

})

function searchCity(city) {

  var key = "3d9cd4f172e0db1e629dcb89ee5c1d36"
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
  var dayLabel = moment().format('L'); 

  // AJAX Call to WeatherMapAPI
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // Store all retrieved data inside object called "response"
    .then(function(response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to text
      $(".city-name").text(response.name + " " + dayLabel);
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      
      // Convert the temp to fahrenheit
      var tempK = response.main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // add temp content to html
      $(".temp").text("Temperature (K) " + tempK);
      $(".temperature").text("Temperature(F): " + tempF.toFixed(2) + " ºF");

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + tempF);

      // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

      if (response.weather[0].main === "Clouds") {
        $(".weather").html("<img src='./assets/Cloudy.svg' style='width: 10%'/>");
      }
      if (response.weather[0].main === "Rain") {
        $(".weather").html("<img src='./assets/Rain.svg' style='width: 10%'/>");
      }
      if (response.weather[0].main === "Clear") {
        $(".weather").html("<img src='./assets/Sunny.svg' style='width: 10%'/>");
      }  

      function uvIndex() {

        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        
        // UV index calculator
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + latitude + "&lon=" + longitude;
      
        // AJAX Call to WeatherMapAPI (for UVI calculation)
        $.ajax({
          url: uvURL,
          method: "GET"
        })
        
          .then(function(response) {

            console.log(uvURL)
            console.log(response)
          
            var uvIndex = response.value
            
            // Display UV Index in HTML
            $(".uv").text("UV Index: " + uvIndex);

            // Conditional to change color of UV Index (also adjust width of color bar)
            if (uvIndex < 3) {
              $(".uv").css({"background-color": "lightseagreen"});
              $(".uv").css({"width": "25%"});
              $(".uv").css({"padding": "10px"});
              $(".uv").css({"border-radius": "5px"});
            }
            if (uvIndex >= 3 && uvIndex <= 6) {
              $(".uv").css({"background-color": "greenyellow"});
              $(".uv").css({"width": "25%"});
              $(".uv").css({"padding": "10px"});
              $(".uv").css({"border-radius": "5px"});
            }
            if (uvIndex >= 6 && uvIndex <= 9) {
              $(".uv").css({"background-color": "yellow"});
              $(".uv").css({"width": "25%"});
              $(".uv").css({"padding": "10px"});
              $(".uv").css({"border-radius": "5px"});
            }
            if (uvIndex >= 9 && uvIndex <= 11) {
              $(".uv").css({"background-color": "orange"});
              $(".uv").css({"width": "25%"});
              $(".uv").css({"padding": "10px"});
              $(".uv").css({"border-radius": "5px"});
            }
            if (uvIndex > 11) {
              $(".uv").css({"background-color": "red"});
              $(".uv").css({"width": "25%"});
              $(".uv").css({"padding": "10px"});
              $(".uv").css({"border-radius": "5px"});
            }

          })


      }
      uvIndex();

    })
  
// 5-Day Forecast (Continuation of searchCity Function)

  var fiveDayAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=" + key;

  // AJAX Call to WeatherMapAPI
  $.ajax({
    url: fiveDayAPI,
    method: "GET"
  })
    // Store all retrieved data inside object called "response"
    .then(function(response) {  
      
      // Log the fiveDayAPI
      console.log(fiveDayAPI);

      // Log the resulting object
      console.log(response);

      // Convert the temp to fahrenheit
      var tempK = response.list[4].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // Forecast Day1 Content
      $(".day1Date").text(moment().add(1, 'day').format('L'));
      $(".day1Temp").text("Temp: " + tempF.toFixed(2) + " ºF");
      $(".day1Hum").text("Humidity: " + response.list[4].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[4].weather[0].main === "Clouds") {
              $(".weather1").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
              $(".weather1").css({"margin-bottom":"5px"});
            }
            if (response.list[4].weather[0].main === "Rain") {
              $(".weather1").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
              $(".weather1").css({"margin-bottom":"5px"});
            }
            if (response.list[4].weather[0].main === "Clear") {
              $(".weather1").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
              $(".weather1").css({"margin-bottom":"5px"});
            }

      // Convert the temp to fahrenheit
      var tempK = response.list[12].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;      

      // Forecast Day2 Content
      $(".day2Date").text(moment().add(2, 'day').format('L'));
      $(".day2Temp").text("Temp: " + tempF.toFixed(2) + " ºF");
      $(".day2Hum").text("Humidity: " + response.list[12].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[12].weather[0].main === "Clouds") {
              $(".weather2").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
              $(".weather2").css({"margin-bottom":"5px"});
            }
            if (response.list[12].weather[0].main === "Rain") {
              $(".weather2").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
              $(".weather2").css({"margin-bottom":"5px"});
            }
            if (response.list[12].weather[0].main === "Clear") {
              $(".weather2").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
              $(".weather2").css({"margin-bottom":"5px"});
            }

      // Convert the temp to fahrenheit
      var tempK = response.list[20].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // Forecast Day3 Content
      $(".day3Date").text(moment().add(3, 'day').format('L'));
      $(".day3Temp").text("Temp: " + tempF.toFixed(2) + "ºF");
      $(".day3Hum").text("Humidity: " + response.list[20].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[20].weather[0].main === "Clouds") {
              $(".weather3").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
              $(".weather3").css({"margin-bottom":"5px"});
            }
            if (response.list[20].weather[0].main === "Rain") {
              $(".weather3").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
              $(".weather3").css({"margin-bottom":"5px"});
            }
            if (response.list[20].weather[0].main === "Clear") {
              $(".weather3").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
              $(".weather3").css({"margin-bottom":"5px"});
            }

      // Convert the temp to fahrenheit
      var tempK = response.list[28].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // Forecast Day4 Content
      $(".day4Date").text(moment().add(4, 'day').format('L'));
      $(".day4Temp").text("Temp: " + tempF.toFixed(2) + " ºF");
      $(".day4Hum").text("Humidity: " + response.list[28].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[28].weather[0].main === "Clouds") {
              $(".weather4").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
              $(".weather4").css({"margin-bottom":"5px"});
            }
            if (response.list[28].weather[0].main === "Rain") {
              $(".weather4").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
              $(".weather4").css({"margin-bottom":"5px"});
            }
            if (response.list[28].weather[0].main === "Clear") {
              $(".weather4").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
              $(".weather4").css({"margin-bottom":"5px"});
            }

      // Convert the temp to fahrenheit
      var tempK = response.list[36].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // Forecast Day5 Content
      $(".day5Date").text(moment().add(5, 'day').format('L'));
      $(".day5Temp").text("Temp: " + tempF.toFixed(2) + "ºF");
      $(".day5Hum").text("Humidity: " + response.list[36].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[36].weather[0].main === "Clouds") {
              $(".weather5").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
              $(".weather5").css({"margin-bottom":"5px"});
            }
            if (response.list[36].weather[0].main === "Rain") {
              $(".weather5").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
              $(".weather5").css({"margin-bottom":"5px"});
            }
            if (response.list[36].weather[0].main === "Clear") {
              $(".weather5").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
              $(".weather5").css({"margin-bottom":"5px"});
            }

    })
}

// Event handler for user clicking the "Search for a City" button
$("#searchBTN").on("click", function(event) {

  // Preventing the button from trying to submit the form
  event.preventDefault();

  // City Variable
  var inputCity = $("#city-input").val().trim();

  // Running the searchCity function(passing in the city as an argument)
  searchCity(inputCity);

  searchedCities.push(inputCity);

  let string = JSON.stringify(searchedCities)
  localStorage.setItem("searchedCities", string)

  console.log(localStorage);

  // When searchCity(inputCity) is run, create a button in html div ".search-cities" (prepend it to the button list)
  var searchedBTN = $("<button>").text(inputCity)
  $('.search-cities').prepend(searchedBTN)
  searchedBTN.addClass("btn")
  searchedBTN.addClass("btn-dark")
  searchedBTN.attr("type", "button")

});