const { check } = require('express-validator/check');
const request = require('request');
const User = require('../models/user');
const sign_up = [
    check('username', 'must be a name long').isLength({ min: 5, max: 20 }).custom(value => {
        return User.findOne({ username: value }).then(data => {
            if (data) throw new Error('this username is already in use');
            return true
        })
    }),
    check('email').isEmail().withMessage('must be an email').custom(value => {
        return User.findOne({ email: value }).then(data => {
            if (data) throw new Error('this email is already in use')
            return true
        })
    }),
    check('password', 'passwords must be at least 6 chars long and contain one number').isLength({ min: 5 }).matches(/\d/),
    check('confirm-password', 'password-Confirmfield must have the same value as the password field').custom((value, { req }) => {
        if (req.body.password === undefined) return true;
        return value === req.body.password
    }),
    check('g-recaptcha-response').custom((value, { req }) => {
        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            throw new Error('Please select captcha');
        }
        var secretKey = "6LefrVEUAAAAAAwgZZENyY_dfeerXClBDSLNt3Zv";
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        request(verificationUrl, function (error, response, body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if (body.success !== undefined && !body.success) {
                throw new Error("Failed captcha verification");
            }
        })
        return true;
    })
]

module.exports = sign_up;