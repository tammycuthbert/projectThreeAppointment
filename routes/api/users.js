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
        } else { // Otherwise ...
            const newUser = new User({ // ... we create a new user following the User schema from '/models/user.js' 
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });


            // We hash the password before saving it in the database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) { throw err; }
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // We store our errors and the boolean isValid in a new object, set by the validateLoginInput function (validation/register.js)
    const { errors, isValid } = validateLoginInput(req.body);

    // We check if the validation returned any error
    if (!isValid) {
        return res.status(404).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // If the validation came back without any error, we try to find the user using the email entered in the login 'email' field
    User
        .findOne({ email })
        .then(user => {
            if (!user) { // We the user doesn't exist, we return an error along with a message
                return res.status(400).json({ emailnotfound: "Email not found" });
            } else { // Otherwise (it found a user with the same email) ...
                // We compare the password entered in the 'password' field with the one in the database, associated with the email
                bcrypt
                    .compare(password, user.password)
                    .then(isMatch => { 
                        if (isMatch) { // If it is a match ...
                            // ... we create a JWT (Json Web Token) Payload with the user ID and name
                            const payload = {
                                id: user.id,
                                name: user.name
                            };

                            // Then we sign the token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 31556926 }, // The equivalent to 1 year in seconds
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                }
                            );
                        } else {
                            return res.status(400).json({ passwordincorrect: "Password incorrect" });
                        }
                    });
            }
        });
});

module.exports = router;