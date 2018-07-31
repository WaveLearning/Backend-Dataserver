var express = require('express');
var controller = require('./students.controller');
var router = express.Router();

router.get('/', controller.getAllStudents);
// router.get('/search', controller.searchStudents);

module.exports = router;
