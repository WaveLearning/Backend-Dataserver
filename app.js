var express   = require('express');

// // Raw data for now-> will change to elastic authentication
// let rawDataUserConfig = fs.readFileSync('userConfigDefault.json');
// let defaultConfigJson = JSON.parse(rawDataUserConfig);

console.info(('Server time: ').yellow, (new Date()).toString());
require('log-timestamp')(function() { return '[' + new Date() + '] %s' });

let app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

require('./routes')(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.info('Node app is running on port', app.get('port'));
});
