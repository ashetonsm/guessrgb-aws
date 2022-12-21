const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
require('./database/conn')
const PORT = process.env.PORT || 5000;
var url = process.env.ATLAS_URI;
const User = require('./models/user.model');
const { default: mongoose } = require('mongoose');
const PasswordUtils = require('../utilities/PasswordUtils');
const app = express();
app.use(cors());

var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({extended: true})
mongoose.connect(url)

// node backend/server.js
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})

// Log into the application
app.post('/api/login', jsonParser, async function (req, res) {

    try {
        const user = await User.findOne({
            email: req.body.email,
        })

        if (user) {
            res.status(200)
            let hashedInput = PasswordUtils.hash(req.body.password)
            const match = PasswordUtils.compare(hashedInput, user.password)
            if (match === true) {
                res.json({ status: 'success', message: 'Log in success.' })
            } else {
                res.json({ status: 'error', message: 'Log in error.' })
            }
        } else {
            res.json({ status: 'error', message: 'No user found or something.' })
        }
    } catch (e) {
        res.json({ status: 'error', message: e })
    }
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
            console.error('Database Error.')
        })

});