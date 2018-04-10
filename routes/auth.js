const router = require('express').Router();
const bcrypt = require('bcryptjs');
const sign_up = require('../validation/sign-up');
const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const User = require('../models/user');
const passport = require('passport');

router.get('/login', (req, res) => {
    if (req.user) {
       redirect('/')
    } else {
        res.render('pages/login', {
            title: 'login',
            messages: req.flash('signup'),
            msg: req.flash('loginMessage'),
            user: req.user
        })
    }
})
router.get('/sign-up', (req, res) => {
    if (req.user) {
        redirect('/')
    } else {
        res.render('pages/sign-up', {
            title: 'signup',
            errors: false,
            matched: false,
            user: req.user
        })
    }
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/auth/login')
})

router.post('/sign-up', sign_up, (req, res) => {
    const { username, password, email } = req.body;
    const errors = validationResult(req);
    const matched = matchedData(req);
    const salt = bcrypt.genSaltSync(10);
    if (!errors.isEmpty()) {
        res.render('pages/sign-up', {
            errors: errors.mapped(),
            title: 'url shortener-signup',
            matched: matched
        })
    } else {
        new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, salt)
        }).save();
        req.flash('signup', `<div class="alert alert-success" role="alert">register done!,now you can login</div>`)
        res.redirect('/auth/login');
    }
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));


module.exports = router;