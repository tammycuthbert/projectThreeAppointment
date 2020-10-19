const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty HTML fields to an empty strings so we can use validator functions (only works with empty strings)
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // We check if the EMAIL field is empty
    // If empty, we save the error in our errors object
    // If invalid, we save the error in our errors object as a different message
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // We check if the PASSWORD field is empty
    // If empty, we save the error in our errors object
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return { errors, isValid: isEmpty(errors) };
};