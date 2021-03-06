/* global alert home google */

window.map = (function () {
  'use strict';

  var waypoints;
  var clearMapButton = document.querySelector('.clear-map');
  clearMapButton.addEventListener('click', clearMap);

  function initMap (data) {
    var map = new google.maps.Map(document.getElementById('map'));
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: map
    });

    directionsDisplay.addListener('directions_changed', function () {
      var directions = directionsDisplay.getDirections();
      var legs = directions.routes[0].legs[0];
      waypoints = legs.via_waypoint;
      home.setDestination(JSON.stringify(directions.request.destination));
      home.setWaypoints(waypoints);
      computeTotalDistance(directions);
    });

    var startPoint = data.startPoint;
    var endPoint = data.endPoint || data.startPoint;
    if (endPoint.match(/["]/g)) { endPoint = JSON.parse(endPoint); }
    waypoints = data.mapDetails || [];
    displayRoute(startPoint, endPoint, directionsService, directionsDisplay, waypoints);
  }

  function displayRoute (startPoint, endPoint, service, display, waypoints) {
    var points = waypoints
      .map(function (pt) { return { lat: pt.location.lat, lng: pt.location.lng }; })
      .map(function (latlng) { return new google.maps.LatLng(latlng); })
      .map(function (latlng) { return { location: latlng }; });
    service.route({
      origin: startPoint,
      destination: endPoint,
      waypoints: points,
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
    if (!result) { return; }
    var myroute = result.routes[0];
    var total = myroute.legs
      .map(function (leg) { return leg.distance.value; })
      .reduce(function (accum, distance) { return accum + distance; }, 0);
    renderDistance(total);
  }

  function renderDistance (total) {
    document.getElementById('total').innerHTML = `${total / 1000}` + ' km';
  }

  function clearMap () {
    home.removePoints();
    initMap({
      startPoint: home.taskInfo[1].value
    });
  };

  return {
    initMap: initMap
  };
})();
