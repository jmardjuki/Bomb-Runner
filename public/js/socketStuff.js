var socket = io();


var runnerId = document.getElementById('runner');
var bomberId = document.getElementById('bomber');

var rolezId = $('#rolez');

var startId = document.getElementById('startButton');

var localRole = null;

function runnerMe() {
	console.log("runner");
	rolezId.html("Runner");
	localRole = "runner";
};

function bomberMe() {
	console.log("bomber");
	rolezId.html("Bomber");
	localRole = "bomber";
};

function startGame() {
	socket.emit('rolez', localRole);
};

function removeTitle() {
	 $('#titlePage').detach();
};


runnerId.addEventListener("click", runnerMe, false);
bomberId.addEventListener("click", bomberMe, false);
startId.addEventListener("click", startGame, false);

// First signal receiver
socket.on('receiveRoles', function (data) {
	if ( data == "runner") {
		// Wait for the other player
		console.log("Waiting for bomber");
		socket.on('startDaGame', function (data2) {
			console.log("Starting game now R");
			removeTitle();
			// Remove everything on top
			// Load map
			initMap();
			// Load geoLocation
			runnerRun(socket);

		});		

	} else if ( data == "bomber"){
		console.log('Waiting for runner');
		socket.on('startDaGame', function (data2) {
			removeTitle();
			// Remove everything on top
			initMapBomber(socket);
			// Load map
			console.log("Starting game now P");			
		});
	}
});