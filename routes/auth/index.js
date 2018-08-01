var express = require('express');
var router = new express.Router();

var controller = require('./auth.controller');

router.post('/login', controller.login);
router.post('/signup', controller.signup);

module.exports = router;
