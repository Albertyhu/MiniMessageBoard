const async = require('async'); 
const { body, validationResult } = require('express-validator')
const messages = require('../public/javascripts/messages')

exports.form_get = (req, res, next) => {
    res.render("form", {
        title: "Create a new message", 
        error: [], 
    })
}

exports.form_post = [
    body("messageText", "Your message cannot be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("username", "Your username cannot be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        const newMessage = {
            text: req.body.messageText,
            user: req.body.username,
            added: new Date(),
        }
        const error = validation(Result);
        if (!error.isEmpty()) {
            res.render('form', {
                title: "Create a new message",
                error: error.array()
            })
            return;
        }
        try {
            messages.push(newMessage)
            res.redirect("/")
        } catch (error) {
            console.log(`Error in posting: ${error}`)
            alert(`Error in posting: ${error}`)
        }
   
    }
] 