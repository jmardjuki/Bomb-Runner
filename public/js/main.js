"use strict"

function initMap() {
	new GMaps({
	  div: '#map',
	  lat: -12.043333,
	  lng: -77.028333
	});
}

var runnerLat;
var runnerLng;

var socketGlo;

function runnerRun(socket) {
	console.log("runnerRun called")
	getLocationUpdate();
	socketGlo = socket;
}
// Gameplay Mechanics //

var map;

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