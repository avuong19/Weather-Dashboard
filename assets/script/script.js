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
        var icon=info.current.weather[0].icon;
        var iconApi="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        document.getElementById("icon").setAttribute("src",iconApi);
        console.log(iconApi);


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
        
        for(i=1;i<=5;i++){
            
            var futureTimeStamp=info.daily[i].dt;
            var futuretimeStamformated=moment.unix(futureTimeStamp).format('L');
            var futureIcon=info.daily[i].weather[0].icon;
            var futureiconApi="http://openweathermap.org/img/wn/"+futureIcon+"@2x.png"
            

            var fiveDayForeCastEl=document.querySelector('#fiveDayForecast');
            //create the card for information 
            var card=document.createElement("div");
            card.classList="card col-lg-auto col-sm-auto col-md-auto m-3";
            fiveDayForeCastEl.appendChild(card);

            var cardHeader=document.createElement("div");
            cardHeader.classList="card-header";
            card.appendChild(cardHeader);
            cardHeader.innerHTML=futuretimeStamformated;

            var cardBody=document.createElement("div");
            cardBody.classList="card-body";
            card.appendChild(cardBody);

            var cardTitle=document.createElement("img");
            cardTitle.classList="card-title";
            cardTitle.setAttribute("id","cardTitle");
            cardBody.appendChild(cardTitle);
            cardTitle.setAttribute("src",futureiconApi);
            

            var cardText=document.createElement("p");
            cardText.classList="card-text";
            cardBody.appendChild(cardText);

            var futureTemp=document.createElement("p");
            futureTemp.setAttribute("id","futureTemp");
            cardText.appendChild(futureTemp);
            futureTemp.innerHTML="Temp: "+ info.daily[i].temp.day+ " F";

            var futureWind=document.createElement("p");
            futureWind.setAttribute("id","futureWind");
            cardText.appendChild(futureWind);
            futureWind.innerHTML="Wind: "+ info.daily[i].wind_speed+ " MPH";


            var futureHumidity=document.createElement("p");
            futureHumidity.setAttribute("id","futureHumidity");
            cardText.appendChild(futureHumidity);
            futureHumidity.innerHTML="Humidity: "+ info.daily[i].humidity+ " %";
            

            var futureUVI=document.createElement("p");
            futureUVI.setAttribute("id","futureUVI");
            cardText.appendChild(futureUVI);
            futureUVI.innerHTML="UV Index: "+ info.daily[i].uvi;
            
        }


    }


};

$('#searchBtn').on("click",searchLocation);
