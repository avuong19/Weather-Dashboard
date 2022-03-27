var apiID="e83c00cd830025a2a9608537f34f4eb2";
var currentDay=moment().format('ll');

var zipCodeEl=$('#zipCode').val();



var searchLocation=function(){
    var zipCodeEl=$('#zipCode').val();
    // format the github api url
  var geoCodingUrl = "http://api.openweathermap.org/geo/1.0/zip?zip="+zipCodeEl+"&appid="+ apiID;

  // make a get request to url
  fetch(geoCodingUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
       response.json().then(function(data) {
          getWeather(data);
         });
      } else {
        alert("Error: Please enter a valid zip code");
      }
    })
    .catch(function(error) {
      alert("Unable to connect to the API");
    });

   

};
var getWeather =function(data){
    var lat=data.lat;
    var lon=data.lon;
    var cityName=data.name;
    
    var weatherApi="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly&appid="+apiID;
    

    fetch(weatherApi)
    .then(function(response) {
      // request was successful
      if (response.ok) {
       response.json().then(function(info) {
          console.log(info);
          getWeatherInfo(info);
         });
      } else {
        alert("Error: something is wrong");
      }
    })
    .catch(function(error) {
      alert("Unable to connect to the API");
    });

    var getWeatherInfo=function(info){
        var timeStamp=info.current.dt;
        var timeStamformated=moment.unix(timeStamp).format('L');
        

        var getCityName=function(){
            $('#cityHeader').text(cityName+ " ("+timeStamformated+')');
        };
        getCityName();

        var getCurrentTemp=function(){
            $('#temp').text('Temp: '+ info.current.temp+' F');
        }
        getCurrentTemp();

        var getCurrentWind=function(){
            $('#wind').text('Wind: '+ info.current.wind_speed+' MPH');
        }
        getCurrentWind();

        var getCurrentHumidity=function(){
            $('#humidity').text('Humidity: '+ info.current.humidity+' %');
        }
        getCurrentHumidity();

        var getCurrentUVIndex=function(){
            $('#uv-index').text('UV index: '+ info.current.uvi);
            var uvIndex=parseInt(info.current.uvi);
            if (uvIndex>=0&& uvIndex<=3){
                $('#uv-index').attr("class", "uv-green") ; 
            }
            else if(uvIndex>3&&uvIndex<8){
                $('#uv-index').attr("class", "uv-yellow") ; 
            }
            else{
                $('#uv-index').attr("class", "uv-red") ; 
            }
        }
        getCurrentUVIndex();
        
        


    }


};

$('#searchBtn').on("click",searchLocation);
