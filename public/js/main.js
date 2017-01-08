"use strict"

function initMap() {
	new GMaps({
	  div: '#map',
	  lat: -12.043333,
	  lng: -77.028333
	});
}

// Gameplay Mechanics //

var map;

// Runner Coordinates //
// var runnerLat = 49.28063452165252;
// var runnerLng = -122.92632579803467;

var runnerLat;
var runnerLng;

// watchPosition function //

var watchID, geoLoc;

function showLocation(runnerposition){
	runnerLat = runnerposition.coords.latitude;
	runnerLng = runnerposition.coords.longitude;
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
		watchID = geoLoc.watchPosition(showLocation, error, options);
	}
	else{
		alert("Sorry, browser does not support geolocation!");
	}
}

// Bomber Features //

function bomberMap(){

      var map = new GMaps({
        el: '#map',
        lat: -12.043333,
        lng: -77.028333,
        zoom: 18
      });

      GMaps.geolocate({
        success: function(position){
          map.setCenter(position.coords.latitude, position.coords.longitude);
        },
        error: function(error){
          alert('Geolocation failed: '+error.message);
        },
        not_supported: function(){
          alert("Your browser does not support geolocation");
        },
        // always: function(){
        //   alert("Done!");
        // }
      });

      

      var runnerLoc = new google.maps.LatLng(runnerLat,runnerLng);

      GMaps.on('click', map, function(event) {

	      var targetlat = event.latLng.lat();
	      var targetlng = event.latLng.lng();

		  var targetCenter = new google.maps.LatLng(targetlat,targetlng);
		  var blastRadius = 50;

		  // var distance = new google.maps.geometry.spherical.computeDistanceBetween(targetCenter, runnerLoc);

		  var blastBorder = "#0000FF";
		  var blastColor = "#0000FF";

		  var rad = function(x) {
			  return x * Math.PI / 180;
			};

			var getDistance = function(p1, p2) {
			  var R = 6378137; // Earth’s mean radius in meter
			  var dLat = rad(p2.lat() - p1.lat());
			  var dLong = rad(p2.lng() - p1.lng());
			  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
			    Math.sin(dLong / 2) * Math.sin(dLong / 2);
			  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			  var d = R * c;
			  return d; // returns the distance in meter
			};

		  var distance = getDistance(targetCenter, runnerLoc);

		  

		  if ( (distance - blastRadius) < 500 && (distance - blastRadius) > 300){
		  	blastBorder = "#FFFF00";
		  	blastColor = "#FFFF00";
		  }

		  if ( (distance - blastRadius) < 300 && (distance - blastRadius) < 500){
		  	blastBorder = "#FCA500";
		  	blastColor = "#FCA500";
		  }

		  if (distance < blastRadius && (distance - blastRadius) < 50){
		  	blastBorder = "#FF0000";
		  	blastColor = "#FF0000";
		  }

		  console.log("Distance: " + distance + ", " + "Blast: " + blastRadius);
		  console.log("Yellow: " + (distance-blastRadius));

	      map.drawCircle({
	      	center: targetCenter,
	      	radius: blastRadius,
	      	strokeColor: blastBorder,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: blastColor,
              fillOpacity: 0.2
	      });
	    	
	    console.log(event.latLng.lat() + "," + event.latLng.lng());
      });

}
