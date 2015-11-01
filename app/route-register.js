var express = require('express');
var router = express.Router();
var walk = require('walk');
var logger = require('log4js').getLogger();
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

var base = 'routes';

function registerRoute(routes){
    Object.keys(routes).forEach(function(method){
        var route = routes[method];
        Object.keys(route).forEach(function(path){
            logger.info('register ' + chalk.red(method) + ': ' + path);
            router[method](path, route[path]);
        });
    });
}

exports.init = function(app) {
    var routePath = path.resolve(__dirname, 'routes');
    var walker = walk.walk(routePath, { followLink: false });
    walker.on('file', function (root, fileStat, next) {
        var fileName = fileStat.name;
        logger.info('start register '+ root + '/' + fileName);
        
        // register route
        var route = require('./routes/' + fileName);
        registerRoute(route);
        app.use('/api', router);

        next();
    });

    walker.on('errors', function(root, nodeStatsArray, next){
    	nodeStatsArray.forEach(function(n){
    		logger.error(n.name);
    		logger.error(n.error.message || (n.error.code + ": " + n.error.path));
    	});
    	next();
    });
};