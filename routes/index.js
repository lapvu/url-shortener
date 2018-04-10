const router = require('express').Router();
const Url = require('../models/url');
const randomstring = require("randomstring");
router.get('/', (req, res) => {
    if (req.user) {
        Url.find({ id_user: req.user.id }).sort({ _id: -1 }).exec((err, url) => {
            res.render('pages/index', {
                title: 'url shortener',
                user: req.user,
                url: url
            })
        })
    } else {
        Url.find({ cookies: req.cookies['connect.sid'] }).sort({ _id: -1 }).exec((err, url) => {
            res.render('pages/index', {
                title: 'url shortener',
                user: req.user,
                url: url
            })
        })
    }
})
router.post('/get-url', async (req, res) => {
    const url = req.body.url;
    const short_url = 'http://localhost:3000/' + randomstring.generate(6);
    if (!req.user) {
        const match_url = await Url.findOne({ url: url, cookies: req.cookies['connect.sid'] })
        if (!match_url) {
            await new Url({
                url: url,
                short_url: short_url,
                cookies: req.cookies['connect.sid']
            }).save();
        }
        Url.find({ cookies: req.cookies['connect.sid'] }).sort({ _id: -1 }).exec((err, url) => {
            if (err) console.log(err);
            res.send(url)
        })
    } else {
        const match_url = await Url.findOne({ url: url, id_user: req.user.id })
        if (!match_url) {
            await new Url({
                url: url,
                short_url: short_url,
                id_user: req.user.id,
            }).save();
        }
        Url.find({ id_user: req.user.id }).sort({ _id: -1 }).exec((err, url) => {
            res.send(url)
        })
    }
})

module.exports = router;    