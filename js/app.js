userSearch = ""
 getSites = function(){


    //public art
        $.getJSON("https://api.foursquare.com/v2/venues/search?v=20131016&near="+userSearch+"&intent=browse&radius=8000&categoryId=507c8c4091d498d9fc8c67a9&client_id=C2IEUINHBL2HEVOHIWNO0GGN5EUHK3PGYH03HCZRP2ETA4CF&client_secret=DOLF3UBQZOY5GX2DP3EXBQ5CW4AHEWMNDGRMH0IHJWZBDSIO", function(data){
        var myResponse = (data.response);
        //console.log(myResponse);
       //museums 
        $.getJSON("https://api.foursquare.com/v2/venues/search?v=20131016&near="+userSearch+"&intent=browse&radius=8000&categoryId=4bf58dd8d48988d18f941735&client_id=C2IEUINHBL2HEVOHIWNO0GGN5EUHK3PGYH03HCZRP2ETA4CF&client_secret=DOLF3UBQZOY5GX2DP3EXBQ5CW4AHEWMNDGRMH0IHJWZBDSIO", function(artmuseum){
        var Response = (artmuseum.response);
        console.log(Response);
//galleries
        $.getJSON("https://api.foursquare.com/v2/venues/search?v=20131016&near="+userSearch+"&intent=browse&radius=8000&categoryId=4bf58dd8d48988d1e2931735&client_id=C2IEUINHBL2HEVOHIWNO0GGN5EUHK3PGYH03HCZRP2ETA4CF&client_secret=DOLF3UBQZOY5GX2DP3EXBQ5CW4AHEWMNDGRMH0IHJWZBDSIO", function(artgallery){
        var ArtResponse = (artgallery.response);
        console.log(ArtResponse);

      var locations = []
      var centerpoint = myResponse.venues[0].location.lat
      var centerlat = myResponse.venues[0].location.lng
      console.log(centerpoint);
      console.log(centerlat);

      $(".museumBox").append("<h2> Art Museums </h2>");
      $(".publicArtBox").append("<h2>Art Galleries</h2>");
      $(".galleryBox").append("<h2> Public Art </h2>");

      $.each(Response.venues,function(index,value){
        $(".museumBox").append('<h4 style="text-decoration:underline">'+this.name+'</h4>')
        $(".museumBox").append('<h4>'+this.location.address+ '</h4>');
        locations.push([this.name,this.location.lat,this.location.lng]);
      })

       $.each(myResponse.venues,function(index,value){
        $(".publicArtBox").append('<h4 style="text-decoration:underline">'+this.name+'</h4>')
        $(".publicArtBox").append('<h4>'+this.location.address+'</h4>');
            locations.push([this.name,this.location.lat,this.location.lng])
        });
       $.each(ArtResponse.venues,function(index,value){
        $(".galleryBox").append('<h4 style="text-decoration:underline">'+this.name+'</h4>')
        $(".galleryBox").append('<h4>'+this.location.address+'</h4>');
        locations.push([this.name,this.location.lat,this.location.lng])
       })


    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
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
    });
    };

$(document).ready(function() {
  $("#placesearch").keyup(function(event){
    console.log("HERROOOOO")
    if(event.keyCode == 13) {
        console.log("enter keyyyy")
        userSearch = $("#placesearch").val();
        if ($(".museumBox:has(h4)")) {
            $("h4").html("");
            $('h2').html("");
            getSites()
        }
        else {
            getSites();
        }
 
        };
      
          });

    $("#citysearch").click(function(){
        userSearch = $("#placesearch").val();
        if ($(".museumBox:has(h4)")) {
            $("h4").html("");
            getSites()
        }
        else {
            getSites();
        }
 
        });

    $('#addMuseum').parent("h4").click(function() {
      console.log(this)
      $('#siteList').append('<p>'+this+'</p>')
    })
});


   
