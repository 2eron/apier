var express = require('express');
var app = express();
var server = require('http').createServer(app);
var log4js = require('log4js');
var logger = log4js.getLogger();
var routeRegister = require('./app/route-register');

var port = process.env.PORT || 9000;

app.set('port', port);

/**
 * allow cross origin setting
 */
app.all('*', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
	next();
});

/**
 * register route
 */
routeRegister.init(app);


/**
 * start server
 */
server.listen(port, function(){
	logger.info('Server unit ' + process.pid + ' listening on port ' + port);
});