var express   = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var index = require('./routes/index');
var studentsRouter = require('./routes/students');
// var authRouter = require('./routes/auth');

//create an express app
let app = express();

app.use(logger('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

//routing
app.use('/', index);
app.use('/students', studentsRouter);
// app.use('/auth', authRouter);   //This feature is disabled!!

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* eslint-disable no-unused-vars */
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});
/* eslint-disable no-unused-vars */

module.exports = app;
