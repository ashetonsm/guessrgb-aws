const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
require('./database/conn')
const PORT = process.env.PORT || 5000;
var url = process.env.ATLAS_URI;
const User = require('./models/user.model');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(cors());

var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({extended: true})

console.log(url)
mongoose.connect(url)

// node backend/server.js
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})


// Log into the application
app.post('/api/login', jsonParser, async function (req, res) {
    console.log(req.body)

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (user) {
        res.status(200)
        res.send(JSON.stringify('Found user: ' + user))
    } else {
        res.json({ status: 'error', error: 'No user found or something.' })
    }
});


// Create a new User
app.post('/api/register', jsonParser, async function (req, res) {
    console.log(req.body)

    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        // world@email.com

        res.status(200)
        res.send(JSON.stringify('Created account for ' + req.body.email))
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email or something.' })
    }
});

// A test.
app.route('/test')
    .get(async function (req, res) {
        console.log("Hello, world!")
        res.send("Hello, tester!")
    })

