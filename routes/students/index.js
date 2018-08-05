var express = require('express');
var controller = require('./students.controller');
var router = express.Router();

router.get('/', controller.getAllStudents);
router.get('/field/search', controller.searchStudentsByField);
router.get('/global/search', controller.searchStudentsGlobally);

module.exports = router;
