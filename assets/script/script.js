var apiID="e83c00cd830025a2a9608537f34f4eb2";

var zipCodeEl=$('#zipCode').val();


$('#searchBtn').on("click",function(){
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

   

});
var getWeather =function(data){
    var lat=data.lat;
    var lon=data.lon;
    
    var weatherApi="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid="+apiID;
    

    fetch(weatherApi)
    .then(function(response) {
      // request was successful
      if (response.ok) {
       response.json().then(function(data) {
          console.log(data);
         });
      } else {
        alert("Error: something is wrong");
      }
    })
    .catch(function(error) {
      alert("Unable to connect to the API");
    });
};
