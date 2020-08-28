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
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + latitude + "&lon=" + longitude;
      
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
            }
            if (uvIndex >= 3 && uvIndex <= 6) {
              $(".uv").css({"background-color": "greenyellow"});
              $(".uv").css({"width": "25%"});
            }
            if (uvIndex >= 6 && uvIndex <= 9) {
              $(".uv").css({"background-color": "yellow"});
              $(".uv").css({"width": "25%"});
            }
            if (uvIndex >= 9 && uvIndex <= 11) {
              $(".uv").css({"background-color": "orange"});
              $(".uv").css({"width": "25%"});
            }
            if (uvIndex > 11) {
              $(".uv").css({"background-color": "red"});
              $(".uv").css({"width": "25%"});
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
      var tempK = response.list[0].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // Forecast Day1 Content
      $(".day1Date").text(moment().add(1, 'day').format('L'));
      $(".day1Temp").text("Temp: " + tempF.toFixed(2) + " ºF");
      $(".day1Hum").text("Humidity: " + response.list[0].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[0].weather[0].main === "Clouds") {
              $(".weather1").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
            }
            if (response.list[0].weather[0].main === "Rain") {
              $(".weather1").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
            }
            if (response.list[0].weather[0].main === "Clear") {
              $(".weather1").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
            }

      // Convert the temp to fahrenheit
      var tempK = response.list[1].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;      

      // Forecast Day2 Content
      $(".day2Date").text(moment().add(2, 'day').format('L'));
      $(".day2Temp").text("Temp: " + tempF.toFixed(2) + " ºF");
      $(".day2Hum").text("Humidity: " + response.list[1].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[1].weather[0].main === "Clouds") {
              $(".weather2").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
            }
            if (response.list[1].weather[0].main === "Rain") {
              $(".weather2").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
            }
            if (response.list[1].weather[0].main === "Clear") {
              $(".weather2").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
            }

      // Convert the temp to fahrenheit
      var tempK = response.list[2].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // Forecast Day3 Content
      $(".day3Date").text(moment().add(3, 'day').format('L'));
      $(".day3Temp").text("Temp: " + tempF.toFixed(2) + "ºF");
      $(".day3Hum").text("Humidity: " + response.list[2].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[2].weather[0].main === "Clouds") {
              $(".weather3").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
            }
            if (response.list[2].weather[0].main === "Rain") {
              $(".weather3").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
            }
            if (response.list[2].weather[0].main === "Clear") {
              $(".weather3").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
            }

      // Convert the temp to fahrenheit
      var tempK = response.list[3].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // Forecast Day4 Content
      $(".day4Date").text(moment().add(4, 'day').format('L'));
      $(".day4Temp").text("Temp: " + tempF.toFixed(2) + " ºF");
      $(".day4Hum").text("Humidity: " + response.list[3].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[3].weather[0].main === "Clouds") {
              $(".weather4").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
            }
            if (response.list[3].weather[0].main === "Rain") {
              $(".weather4").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
            }
            if (response.list[3].weather[0].main === "Clear") {
              $(".weather4").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
            }

      // Convert the temp to fahrenheit
      var tempK = response.list[4].main.temp;
      var tempF = (tempK - 273.15) * 1.80 + 32;

      // Forecast Day5 Content
      $(".day5Date").text(moment().add(5, 'day').format('L'));
      $(".day5Temp").text("Temp: " + tempF.toFixed(2) + "ºF");
      $(".day5Hum").text("Humidity: " + response.list[4].main.humidity + "%");

            // Conditional to display Sunny, Cloudy, Partly Cloudy, or Rainy svg file

            if (response.list[4].weather[0].main === "Clouds") {
              $(".weather5").html("<img src='./assets/Cloudy.svg' style='width: 25%'/>");
            }
            if (response.list[4].weather[0].main === "Rain") {
              $(".weather5").html("<img src='./assets/Rain.svg' style='width: 25%'/>");
            }
            if (response.list[4].weather[0].main === "Clear") {
              $(".weather5").html("<img src='./assets/Sunny.svg' style='width: 25%'/>");
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
})

// When "Austin" button is clicked, run "searchCity()"
$(".austin").on("click", function(event) {

// Preventing the button from trying to submit the form
event.preventDefault();

// Running the searchCity function(passing in the city as an argument)
searchCity("Austin");
});

// When "Boston" button is clicked, run "searchCity()"
$(".boston").on("click", function(event) {

  // Preventing the button from trying to submit the form
  event.preventDefault();
  
  // Running the searchCity function(passing in the city as an argument)
  searchCity("Boston");
  });

// When "Chicago" button is clicked, run "searchCity()"
$(".chicago").on("click", function(event) {

  // Preventing the button from trying to submit the form
  event.preventDefault();
  
  // Running the searchCity function(passing in the city as an argument)
  searchCity("Chicago");
  });

  // When "Dallas" button is clicked, run "searchCity()"
$(".dallas").on("click", function(event) {

  // Preventing the button from trying to submit the form
  event.preventDefault();
  
  // Running the searchCity function(passing in the city as an argument)
  searchCity("Dallas");
  });

  // When "Houston" button is clicked, run "searchCity()"
$(".houston").on("click", function(event) {

  // Preventing the button from trying to submit the form
  event.preventDefault();
  
  // Running the searchCity function(passing in the city as an argument)
  searchCity("Houston");
  });

  // When "Los Angeles" button is clicked, run "searchCity()"
$(".la").on("click", function(event) {

  // Preventing the button from trying to submit the form
  event.preventDefault();
  
  // Running the searchCity function(passing in the city as an argument)
  searchCity("Los Angeles");
  });

  // When "Miami" button is clicked, run "searchCity()"
$(".miami").on("click", function(event) {

  // Preventing the button from trying to submit the form
  event.preventDefault();
  
  // Running the searchCity function(passing in the city as an argument)
  searchCity("Miami");
  });

  // When "New York" button is clicked, run "searchCity()"
$(".nyc").on("click", function(event) {

  // Preventing the button from trying to submit the form
  event.preventDefault();
  
  // Running the searchCity function(passing in the city as an argument)
  searchCity("New York");
  });










