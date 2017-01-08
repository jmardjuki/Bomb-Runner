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

// Heroku doesn't allow websocket
io.configure(function () {  
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

var bomberPresent = false;
var runnerPresent = false;

io.on('connection', function (socket) {
	socket.on('disconnect', () => console.log('Client disconnected'));	
  socket.on('rolez', function (data) {
  	if (data == "runner") {
  		if (runnerPresent == false) {
  			runnerPresent = true; // Need to detect when user not here anymore
  			socket.emit('receiveRoles', "runner");
  			// if both ok, tell both to start
  			if ( runnerPresent == true) {
  				console.log("top kek");
  			}

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
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
