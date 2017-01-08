"use strict"

function initializeMap() {
	new GMaps({
	  div: '#map',
	  lat: -12.043333,
	  lng: -77.028333
	});
}

function runnerRun(socket) {
	var lat = -12.043333;
	var lng = -77.028333;	
	var data = JSON.stringify({lat: lat, lng: lng});
	socket.emit('runnerLocation', data);
}