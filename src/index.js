var port = 1419;
var minecraftIp = 'modpack.cb-craft.net'; // Cbcraft IP
var pingInterval = 60; // In seconds

var http    = require('http');
var express = require('express');
var app     = express();
var server  = http.Server(app);
var io      = require('socket.io')(server);
var query   = require(__dirname + '/libs/queryServer.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

server.listen(port, function() {
    console.log('Server listening on *:' + port);
});

/*
 * Update server every minute and send via socket.io
 */

var currentStatus = { status: false, updated: new Date() };

function emitStatus() {
    query.queryServer(minecraftIp, function(response) {
        currentStatus = { status: response, updated: new Date() };
        io.emit('status', currentStatus);
    });
}

emitStatus();
setInterval(emitStatus, pingInterval* 1000);

io.on('connection', function(socket) {
    socket.emit('status', currentStatus);
});