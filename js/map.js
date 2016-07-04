// var myCenter = new google.maps.LatLng(51.508742,-0.120850);

// function initialize() {
//   var mapProp = {
//   center: myCenter,
//   zoom:5,
//   mapTypeId: google.maps.MapTypeId.ROADMAP
// };

// var map = new google.maps.Map(document.getElementById("map"), mapProp);

// var marker = new google.maps.Marker({
//   position: myCenter,
//   title: 'Click to zoom'
// });

// marker.setMap(map);

// // Zoom to 9 when clicking on marker
// google.maps.event.addListener(marker,'click',function() {
//   map.setZoom(9);
//   map.setCenter(marker.getPosition());
//   });
// }
// google.maps.event.addDomListener(window, 'load', initialize);




function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.508742, lng: -0.120850},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

        // HTML5 geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
      }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
