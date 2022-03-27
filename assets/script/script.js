var apiID="e83c00cd830025a2a9608537f34f4eb2";

var zipCodeEl=$('#zipCode').val();


$('#searchBtn').on("click",function(){
    
    // format the github api url
  //var apiUrl = "http://api.openweathermap.org/geo/1.0/zip?zip="+zipCodeEl+"&appid="+ apiID;

  // make a get request to url
  //fetch(apiUrl)
   // .then(function(response) {
      // request was successful
     // if (response.ok) {
       // console.log(response);
       // response.json().then(function(data) {
        //  console.log(data);
          
          
       // });
     // } else {
       // alert("Error: Please enter a valid zip code");
     // }
   // })
   // .catch(function(error) {
   //   alert("Unable to connect to the API");
   // });

  console.log(zipCodeEl);

});