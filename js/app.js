


$(document).ready(function() {
    $("#citysearch").click(function(){
        var userSearch = $("#placesearch").val();
        console.log(userSearch);
    
        $.getJSON("https://api.foursquare.com/v2/venues/search?v=20131016&near="+userSearch+"&intent=browse&radius=800&categoryId=507c8c4091d498d9fc8c67a9&client_id=C2IEUINHBL2HEVOHIWNO0GGN5EUHK3PGYH03HCZRP2ETA4CF&client_secret=DOLF3UBQZOY5GX2DP3EXBQ5CW4AHEWMNDGRMH0IHJWZBDSIO", function(data){
        var myResponse = (data.response);
        console.log(myResponse);
        
        $.getJSON("https://api.foursquare.com/v2/venues/search?v=20131016&near="+userSearch+"&intent=browse&radius=800&categoryId=4bf58dd8d48988d1e2931735&client_id=C2IEUINHBL2HEVOHIWNO0GGN5EUHK3PGYH03HCZRP2ETA4CF&client_secret=DOLF3UBQZOY5GX2DP3EXBQ5CW4AHEWMNDGRMH0IHJWZBDSIO", function(datta){
        var Response = (datta.response);
        console.log(Response);

      var locations = []
      var centerpoint = myResponse.venues[0].location.lat
      var centerlat = myResponse.venues[0].location.lng
      console.log(centerpoint);
      console.log(centerlat);
       $.each(myResponse.venues,function(index,value){
            $('.foursquarebox').append("<p class=placeName>"+this.name+"</p>");
            $('.foursquarebox').append("<p class='latlong'>"+this.location.address+", "+this.location.city+"</p>");
           
       
        locations.push([this.name,this.location.lat,this.location.lng])
    });
        console.log(locations);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(centerpoint,centerlat),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
    });
});
    /*var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];*/
    });

   /* var userSearch=("");
$("#citysearch").click(function(){
        userSearch = $("#placesearch").val();
        console.log(userSearch);
    });
//4d4b7105d754a06374d81259
    $.getJSON('https://api.foursquare.com/v2/venues/search?v=20131016&near=boston&intent=browse&radius=800&categoryId=507c8c4091d498d9fc8c67a9&client_id=C2IEUINHBL2HEVOHIWNO0GGN5EUHK3PGYH03HCZRP2ETA4CF&client_secret=DOLF3UBQZOY5GX2DP3EXBQ5CW4AHEWMNDGRMH0IHJWZBDSIO', function(data){
        var myResponse = (data.response);
        console.log(myResponse);
      
      
       $.each(myResponse.venues,function(index,value){
            $('.foursquarebox').append("<p class=placeName>"+this.name+"</p>");
            $('.foursquarebox').append("<p class='latlong'>"+this.location.address+", "+this.location.city+"</p>");
            var artSpot = (this.location.address);
            console.log(artSpot);
            //var placeLat = $(this.location).val();
            //console.log(placeLat);
            });
      
    
           
    
           
    
    });


//$.getJSON("https://maps.googleapis.com/maps/api/js?key=AIzaSyBzVrwxmmY47YJMMxtBnR57Af751GqwOG0&callback=initMap", function(street){
    //$('.googlebox').append("<img src=" +street+">");
    
  //});
*/
});


   