const express = require('express');
const app = express();
const router = require('./routes/index');
const auth_route = require('./routes/auth');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport =require('passport');

require('./config/passport')(passport);
require('./config/db');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 3600000 },
    secret: '###########',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



app.use('/', router);
app.use('/auth', auth_route);



app.listen('3000', () => console.log('started'))