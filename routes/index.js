var express = require('express');
const messages = require('../public/javascripts/messages')
const formController = require('../controller/formController')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Mini Message Board',
        messages: messages,
    });
});

router.get('/new', formController.form_get);

router.post('/new', formController.form_post); 

module.exports = router;
