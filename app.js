/**
* Module dependencies.
*/

const express = require('express');
const routes = require('./routes');
const twiliort = require('./routes/twilio_listener');
const calls = require('./routes/calllog');
const http = require('http');
const path = require('path');
const fs = require('fs');
const socket = require('socket.io');

const cors = require('cors')

var app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

const server = http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
  console.log('Express server listening on port ' + app.get('port'));
});
const io = socket(server);

app.use('/', routes(io));
app.use('/', twiliort(io));
app.use('/logs', calls);

io.on('connection', (socket) => {
  console.log('Connection at:  ', socket.id);
  socket.on('call', function(data) {
    io.sockets.emit('call', data);
  });
});

const interval = setInterval(function() {
  io.sockets.emit('call', {
      id: "203-907-7424",
      name: "Chris Lim",
      action: "in-progress",
      mood: 12
  });
}, 10000);
