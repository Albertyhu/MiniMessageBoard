var express = require('express');
var router = express.Router();
const formController = require('../controller/formController')

router.get('/', formController.form_get); 

router.post('/', formController.form_post); 

module.exports = router;
