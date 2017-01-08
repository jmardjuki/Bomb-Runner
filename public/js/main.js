"use strict"

var map;
var runnerLat;
var runnerLng;

function initMap() {
	map = new GMaps({
	  div: '#map',
	  lat: 49.2827,
	  lng: -123.1216
	});		  

}

var bombLat;
var bombLng;


function initMapBomber(socket) {
	socketGlo = socket;
	map = new GMaps({
	  div: '#map',
	  lat: 49.2827,
	  lng: -123.1216
	});
	socketGlo.emit('bomberInit', "init");
  socketGlo.on('bomberInitReply', function (data) {
  	console.log( "coordinates of runner =====>" + data);
  	var jsonObj = $.parseJSON(data);
  	bombLat = jsonObj.lat;
  	bombLng = jsonObj.lng;
  	if ( isNaN(bombLat) || isNaN(bombLng) ) {
  			socketGlo.emit('bomberInit', "init");
  	}
  	else {
  		  map.setCenter(bombLat, bombLng);
  		  bomberMap();
  	}
  });
}

var socketGlo;

function runnerRun(socket) {
	console.log("runnerRun called")
	getLocationUpdate();
	socketGlo = socket;
	socket.on('winGG', function (data) {
		alert("GG!");
	});	

}
// Gameplay Mechanics //

// watchPosition function //
var watchID, geoLoc;

function showLocation(runnerposition){
	runnerLat = runnerposition.coords.latitude;
	runnerLng = runnerposition.coords.longitude;
	var data = {lat: runnerLat, lng: runnerLng};
	console.log(data);
	socketGlo.emit('runnerLocation', data);

	console.log("test");

	map.removeMarkers();

	map.addMarker({
	  lat: runnerLat,
	  lng: runnerLng,
	});

  map.setCenter(runnerLat, runnerLng);

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
		socket.on('bomberBomb', function (data) {
	  	console.log('bomber blast!')
			var targetCenter = new google.maps.LatLng(data.lat,data.lng);
			var blastRadius = data.radius;
			var blastBorder = data.border1;
			var blastColor = data.colour;

			map.drawCircle({
		    center: targetCenter,
		    radius: blastRadius,
		    strokeColor: blastBorder,
	      strokeOpacity: 0.8,
	      strokeWeight: 2,
	      fillColor: blastColor,
	      fillOpacity: 0.2
		  });			
	  });	

	}
	else{
		alert("Sorry, browser does not support geolocation!");
	}
}


function bomberMap(){      
	GMaps.on('click', map, function(event) {
	  var targetlat = event.latLng.lat();
	  var targetlng = event.latLng.lng();
		var data = {lat: targetlat, lng: targetlng};
		socketGlo.emit('bomberCompare', data);

		socket.on('winGG', function (data) {
			alert("You hit the target! Game is finish. GG!");
	  });	

		socket.on('bomberBomb', function (data) {
			var targetCenter = new google.maps.LatLng(data.lat,data.lng);
			var blastRadius = data.radius;
			var blastBorder = data.border1;
			var blastColor = data.colour;

			map.drawCircle({
		    center: targetCenter,
		    radius: blastRadius,
		    strokeColor: blastBorder,
	      strokeOpacity: 0.8,
	      strokeWeight: 2,
	      fillColor: blastColor,
	      fillOpacity: 0.2
		  });			
	  });	

	  
	  console.log(event.latLng.lat() + "," + event.latLng.lng());
  });

}