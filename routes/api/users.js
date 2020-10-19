const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');

// We load the input validation from our validation scripts (register & login)
const validateRegisterInput = require('../../validation/register')

const validateLoginInput = require("../../validation/login");

// We load the User model from our models script
const User = require('../../models/user');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // We store our errors and the boolean isValid in a new object, set by the validateLoginInput function (validation/register.js)
    const { errors, isValid } = validateRegisterInput(req.body);
});

// We check if the validation returned any error
if (!isValid) {
    return res.status(400).json(errors);
}

   // If the validation came back without any error, we check if the user already exist in the database
   User
   .findOne({ email: req.body.email }) // We try to find an similar email to the one entered in the email field
   .then(user => {
       if (user) { // If it returned an object (user), which means it found a user using the same email address, ...
           return res.status(400).json({ email: "Email already exists" }); // ... we exit and return an error 400 along with a message 
       }


       else { // Otherwise ...
        const newUser = new User({ // ... we create a new user following the User schema from '/models/user.js' 
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });