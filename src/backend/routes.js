const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
require('./database/conn')
const PORT = process.env.PORT || 5000;
var url = process.env.ATLAS_URI;
const User = require('./models/user.model');
const { default: mongoose } = require('mongoose');
const PasswordUtils = require('../utilities/PasswordUtils');
const session = require('express-session');
const { sessionOptions } = require('./database/session');
const app = express();
app.use(cors(), session(sessionOptions));

var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({extended: true})
mongoose.connect(url)

// node backend/server.js
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})

// Log into the application
app.post('/api/login', jsonParser, async function (req, res) {

    await User.findOne({
        email: req.body.email,
    })
        .then((user) => {
            res.status(200)
            let hashedInput = PasswordUtils.hash(req.body.password)
            const match = PasswordUtils.compare(hashedInput, user.password)
            if (match === true) {
                var session = req.session;
                console.log(req.session);
                res.json({ status: 'success', message: 'Log in success.', session })
            } else {
                res.json({ status: 'error', message: 'Log in error.' })
            }
        })
        .catch(error => {
            res.json({ status: 'error', message: 'Log in failure. Error: ', error })
            console.error('Database Error (login).')
        })
});

// Create a new User
app.post('/api/register', jsonParser, async function (req, res) {

    const hashed = PasswordUtils.hash(req.body.password)
    var user = new User({
        email: req.body.email,
        password: hashed
    })

    await user.save()
        .then(data => {
            res.json({ status: 'success', message: 'Registration success.' })
        })
        .catch(error => {
            res.json({ status: 'error', message: 'Registration failure. Error: ', error })
            console.error('Database Error (registration).')
        })

});