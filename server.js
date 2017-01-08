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
  				socket.emit('startDaGame', "true");
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
  				io.sockets.emit('startDaGame', "isTrue");
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
  	console.log(data);
  	runnerLoc.lat = data.lat;
  	runnerLoc.lng = data.lng;
  });

});

// Heroku doesn't allow websocket?
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
