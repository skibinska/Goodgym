var directionsDisplay = '';

function initMap () {
  var startCity = {lat: 51.507368, lng: -0.128142};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: startCity
  });

  var directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map
  });

  directionsDisplay.addListener('directions_changed', function () {
    computeTotalDistance(directionsDisplay.getDirections());
  });

  // This is the function that we will need to run to render the map. directionsDisplay
  // will either have to come from the database or the runId in the params
  displayRoute('Camberwell, London, UK', 'Peckham, London, UK', directionsService,
  directionsDisplay);
}

function displayRoute (origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: 'WALKING'
  }, function (response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

function computeTotalDistance (result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}

// This is aysnc
setTimeout(function () {
  console.log(directionsDisplay);
}, 500);
