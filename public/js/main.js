"use strict"

var map;
var runnerLat;
var runnerLng;

function initMap() {
	new GMaps({
	  div: '#map',
	  lat: 49.2827,
	  lng: -123.1216
	});		  

	if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {

          	var myCenter;

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            var myCenter = new google.maps.LatLng(pos.lat,pos.lng);

            var mapCanvas = document.getElementById("map");
  			    var mapOptions = {center: myCenter, zoom: 15};
            var map = new google.maps.Map(mapCanvas, mapOptions);
            var marker = new google.maps.Marker({position:myCenter});
            marker.setMap(map);
            
           }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });

        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

}


var socketGlo;

function runnerRun(socket) {
	console.log("runnerRun called")
	getLocationUpdate();
	socketGlo = socket;
}
// Gameplay Mechanics //

// watchPosition function //
var watchID, geoLoc;

function showLocation(runnerposition){
	runnerLat = runnerposition.coords.latitude;
	runnerLng = runnerposition.coords.longitude;
	var data = JSON.stringify({lat: runnerLat, lng: runnerLng});
	console.log(data);
	socketGlo.emit('runnerLocation', data);



}

function errorHandler(err){
	if (err.code == 1){
		console.log("Error: Access is denied.");
	} else if (err.code ==2){
		console.log("Error: Position is unavailable.");
	}
}

function getLocationUpdate(){
	if (navigator.geolocation){
		var options = {timeout:10000};
		geoLoc = navigator.geolocation;
		watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
	}
	else{
		alert("Sorry, browser does not support geolocation!");
	}
}
