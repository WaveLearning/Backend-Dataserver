var elasticsearch = require('elasticsearch');

// var client = new elasticsearch.Client({
// 	host: 'http://' + config.elasticUser + ':' + config.elasticPW + '@' + config.elasticHost + ':' + config.elasticPort,
// 	log: 'error'
// });

var path = require('path');
var pug = require('pug');
var http = require('http');
var _ = require('lodash');
var fs = require('fs');

exports.index = function(req, res) {
    res.sendFile(path.resolve('public'+ '/index.html'));
};
