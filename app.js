var express   = require('express');
var config  = require('./config');
var http      = require('http');
var util      = require('util');
var path = require('path');
var async = require('async');
var colors  = require('colors');
var fs = require('fs');

// // Raw data for now-> will change to elastic authentication
// let rawDataUserConfig = fs.readFileSync('userConfigDefault.json');
// let defaultConfigJson = JSON.parse(rawDataUserConfig);

console.log(('Server time: ').yellow, (new Date()).toString());
require('log-timestamp')(function() { return '[' + new Date() + '] %s' });

let app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

require('./routes')(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
