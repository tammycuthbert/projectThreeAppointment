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
