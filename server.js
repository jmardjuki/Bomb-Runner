'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '/public/index.html');

const server = express()
  .use(express.static(__dirname + '/public'))
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

// Heroku doesn't allow websocket?

var bomberPresent = false;
var runnerPresent = false;

var runnerLoc = {lat: NaN, lng: NaN};

var sTime;
var countDown;
var counter;

// Timer
function initializeTimer() {
	sTime = new Date().getTime();
	countDown = 20;
}

function updateTime() {
    var cTime = new Date().getTime();
    var diff = cTime - sTime;
    var seconds = countDown - Math.floor(diff / 1000);
    if (seconds >= 0) {
        var minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        io.sockets.emit('daTimer', seconds);
        console.log(seconds);
    } else {
        io.sockets.emit('showme', runnerLoc);
        io.sockets.emit('daTimer', "zero");
        clearInterval(counter);
    }
}


io.on('connection', function (socket) {
	socket.on('disconnect', function (data) {
  	console.log('Client disconnected')
  	bomberPresent = false;
  	runnerPresent = false;
  });	
  socket.on('rolez', function (data) {
  	if (data == "runner") {
  		if (runnerPresent == false) {
  			runnerPresent = true; // Need to detect when user not here anymore
  			socket.emit('receiveRoles', "runner");
  			// if both ok, tell both to start
  			if ( bomberPresent == true ) {
  				io.sockets.emit('startDaGame', "true");
  				//timer
  				initializeTimer();
  				updateTime();
					counter = setInterval(updateTime, 500);
  			}
  		} else {
  			// Later if possible; if already has a runner
  		}
  	}
  	else if (data == "bomber") {
  		if (bomberPresent == false) {
  			bomberPresent = true; // Need to detect when user not here anymore
  			socket.emit('receiveRoles', "bomber");
  			// if both ok, tell both to start
  			if ( runnerPresent == true ) {
  				io.sockets.emit('startDaGame', "true");
  				//timer
  				initializeTimer();
  				updateTime();
					counter = setInterval(updateTime, 500);
  			}  			
  		} else {

  		}
  	}
  	else {
  		// No roles selected
  	}
  });
  // Keep updating the location
  socket.on('runnerLocation', function (data) {
  	runnerLoc.lat = data.lat;
  	runnerLoc.lng = data.lng;
  });
  socket.on('bomberInit', function (data) {	
	  var bombLat = runnerLoc.lat.toFixed(20);
	  var bombLng = runnerLoc.lng.toFixed(20);  	
	  var data = JSON.stringify({lat: bombLat, lng: bombLng});
	  socket.emit('bomberInitReply', data);

  });  
  socket.on('bomberCompare', function (data) {
  	// Check radius, send colour only
  	// Send back the gps coordinate to both with the colour
		var bomberLoc = {lat: NaN, lng: NaN};
  	bomberLoc.lat = data.lat;
  	bomberLoc.lng = data.lng;

		var blastRadius = 50;
		var blastBorder;
		var blastColor;

		var rad = function(x) {
			return x * Math.PI / 180;
		}; 

		var getDistance = function(p1, p2) {
			var R = 6378137; // Earth’s mean radius in meter
			var dLat = rad(p2.lat - p1.lat);
			var dLong = rad(p2.lng - p1.lng);
			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
				Math.sin(dLong / 2) * Math.sin(dLong / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c;
			return d; // returns the distance in meter
		};

		var distance = getDistance(bomberLoc, runnerLoc);
		var win = false;

    if ( (distance - blastRadius) >= 500){
      blastBorder = "#00FF00";
      blastColor = "#00FF00";
    }

		if ( (distance - blastRadius) < 500 && (distance - blastRadius) > 300){
			blastBorder = "#FFFF00";
		  blastColor = "#FFFF00";
		} 

    else if ( (distance - blastRadius) < 300 && (distance - blastRadius) > 0){
		 	blastBorder = "#FCA500";
		  blastColor = "#FCA500";
		} 

    else if (distance < blastRadius){
		 	blastBorder = "#FF0000";
		  blastColor = "#FF0000";
		  win = true;
		  clearInterval(counter);
		}

    console.log(distance - blastRadius);

		var replyData = {lat: bomberLoc.lat, lng: bomberLoc.lng, radius: blastRadius, colour: blastColor, border1: blastBorder};
  	io.sockets.emit('bomberBomb', replyData);
		if ( win == true ){
			win = false;
			io.sockets.emit('winGG', "win");
			console.log("Game finishes");
				// + do something else to reset
		}

  });

});

// Heroku doesn't allow websocket?
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
