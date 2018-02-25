// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-log';

// requirements
var Tail = require('tail').Tail;
var socket = require('websocket').server;
var https = require('https');
const fs = require('fs');

// Port where we'll run the websocket server
var port = 1337;
var clients = [ ];
var json = "";

// Choose the log file you want to monitor
var tail = new Tail('/var/log/auth.log');

// I suggest grabbing a let's encrypt certificate with certbot
var options = {
  key: fs.readFileSync('/etc/letsencrypt/*/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/*/fullchain.pem')
};

// Creating https and websocket servers.
var server = https.createServer(options, function(request, response) {
	console.log((new Date()) + ' Received HTTP(S) request for ' + request.url);
    response.writeHead(404); // sends 404 response so browser stops loading, otherwise it keeps loading 
    response.end();
});

server.listen(port, function() {
    console.log((new Date()) + " Server is listening on port " + port);
});

var wsServer = new socket({
    httpServer: server,
	autoAcceptConnections: false
});

// connection attempt
wsServer.on('request', function(request) {
	console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
	
	var connection = request.accept(null, request.origin); 
	var index = clients.push(connection) - 1;
	
	console.log((new Date()) + ' Connection accepted.');
	 
	// user sent some message
	//connection.on('message', function(message) {
	//	if (message.type === 'utf8') { // accept only text.
	//		console.log((new Date()) + 'Received : '+ message.utf8Data);
	//	}
	//});
	
	connection.on('close', function(connection) {
		console.log((new Date()) + " Peer from " + request.origin + " disconnected.");
		// remove user from the list of connected clients
		clients.splice(index, 1);
	});
});

tail.on('line', function(msg) {
	
	// anonymize / mask / hide IPs
	msg = msg.replace( /\b(?:\d{1,3}\.){3}\d{1,3}\b/, "*.*.*.*" ).replace ( / port \d* /, " port **** " );
	console.log('> Broadcasting: ' + msg); // display what we just sent
	
	json = JSON.stringify({ data: msg });
	// broadcast message to all connected clients
	for (var i=0; i < clients.length; i++) {
		clients[i].sendUTF(json);
	}
	
});