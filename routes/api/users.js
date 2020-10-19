const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');

// We load the input validation from our validation scripts (register & login)
const validateRegisterInput = require('../../validation/register')