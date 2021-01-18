const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
    check('firstName').notEmpty().withMessage('First Name is Required'),
    check('lastName').notEmpty().withMessage('Last Name is Required'),
    check('email').isEmail().withMessage('Email is Required'),
    check('password').notEmpty().withMessage('The password must be 6+ chars long and contain a number'),

];
exports.validateSigninRequest = [
    check('email').isEmail().withMessage('Email is Required'),
    check('password').notEmpty().withMessage('The password must be 6+ chars long and contain a number'),

];
exports.isRequestValidated = (req, res, next) =>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next();
}