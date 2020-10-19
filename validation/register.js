const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty HTML fields to an empty strings so we can use validator functions (only works with empty strings)
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.passwordConf = !isEmpty(data.passwordConf) ? data.passwordConf : "";
    
    // We check if the NAME field is empty
    // If empty, we save the error in our errors object
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // We check if the EMAIL field is empty
    // If empty, we save the error in our errors object
    // If invalid, we save the error in our errors object as a different message
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // We check if each PASSWORD fields (password & passwordConf) are empty
    // If empty, we save the error in our errors object
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (validator.isEmpty(data.passwordConf)) {
        errors.passwordConf = "Password confirmation field is required";
    }
    // If the password is too short (or too long), we save the error in our errors object
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters long";
    }
    // If the passwords do not match, we save the error in our errors object
    if (!validator.equals(data.password, data.passwordConf)) {
        errors.passwordConf = "Passwords must match";
    }

    // If our object errors is empty (so we have no errors and all the field are filled according to the standards), it will return isValid = true
    // Otherwise, it will return our errors object
    return { errors, isValid: isEmpty(errors) };
};