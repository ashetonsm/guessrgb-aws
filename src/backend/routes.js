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
                res.json({ status: 'success', error: 'Log in success.' })
            } else {
                res.json({ status: 'error', error: 'Log in error.' })
            }
        } else {
            res.json({ status: 'error', error: 'No user found or something.' })
        }
    } catch (e) {
        res.json({ status: 'error', error: e })
    }
});


// Create a new User
app.post('/api/register', jsonParser, async function (req, res) {

    const hashed = PasswordUtils.hash(req.body.password)

    try {
        const user = await User.create({
            email: req.body.email,
            password: hashed
        })

        if (user._id) {
            console.log(user)
            res.json({ status: 'success', error: 'User creation success.' })
        } else {
            console.log(user)
            res.json({ status: 'error', error: 'User creation failure.' })
        }
    } catch (e) {
        res.json({ status: 'error', error: 'User creation failure.' })
    }
});

// A test.
app.route('/test')
    .get(async function (req, res) {
        console.log("Hello, world!")
        res.send("Hello, tester!")
    })

