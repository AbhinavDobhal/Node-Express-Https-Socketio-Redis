
var fs = require('fs');
//var http = require('http');
var https = require('https');
var io = require('socket.io')(https);
var redis = require('redis');

var privateKey  = fs.readFileSync('ssl/key.pem', 'utf8');
var certificate = fs.readFileSync('ssl/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');  
});

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

  var i=1;
io.on('connection', function (socket) {
    i++;
  console.log(i+'::>>>user connected');
 // var redisClient = redis.createClient();



/*
  redisClient.psubscribe('*', (error, count) => {
    console.log('error, count =>', error, count);
  });

  redisClient.on('pmessage', (pattern, channel, message) => {
    console.log('pattern, channel, message =>', pattern, channel, message);
    message = JSON.parse(message);
    io.emit(message.event, channel, message.data);
  });

  */
 
  socket.on('disconnect', function() {
    redisClient.quit();
  });
 
});



//httpServer.listen(8081);
httpsServer.listen(8443);

