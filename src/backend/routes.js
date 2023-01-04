const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
require('./database/conn')
const PORT = process.env.PORT || 5000;
var url = process.env.ATLAS_URI;
const User = require('./models/user.model');
const History = require('./models/history.model');
const { default: mongoose } = require('mongoose');
const PasswordUtils = require('../utilities/PasswordUtils');
const session = require('express-session');
const { sessionOptions } = require('./database/session');
const app = express();
var bcrypt = require('bcryptjs');
var saltRounds = parseInt(process.env.SALT_ROUNDS);
var saltStart = parseInt(process.env.SALT_START);
var saltEnd = parseInt(process.env.SALT_END);
app.use(cors(), session(sessionOptions));

var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({extended: true})
mongoose.connect(url)

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})

// Log into the application
app.post('/api/login', jsonParser, async function (req, res) {

    await User.findOne({
        email: req.body.email,
    })
        .then(async (user) => {
            res.status(200)
            var existingSalt = user.password.slice(saltStart, saltEnd);
            var hashedPassword = await bcrypt.hash(req.body.password, existingSalt);
            const match = PasswordUtils.compare(hashedPassword, user.password);

            if (match === true) {
                var session = req.session;
                var date = new Date(req.session.cookie.expires);
                if (req.body.rememberUser == "true") {
                    // Plus one week from the time the session was generated
                    date.setTime(date.getTime() + (168 * 60 * 60 * 1000));
                } else {
                    // Plus one day from the time the session was generated
                    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
                }
                req.session.cookie.expires = date;
                req.session.userId = user._id;
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

    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
        email: req.body.email,
        password: hash
    })

    await user.save()
        .then(data => {
            res.json({ status: 'success', message: 'Registration success.' })
        })
        .catch(error => {
            res.json({ status: 'error', message: 'Registration failure. Error: ', error })
            console.error('Database Error (registration).')
        })

    console.log(user)
});

// Create a Game entry
app.post('/api/record', jsonParser, async function (req, res) {

    try {
        const entry = await History.findOne({
            userId: req.body.userId
        });
        entry.history.push(req.body.result);
        await entry.save()
            .then(() => {
                res.json({ status: 'success', message: 'History save success.' })
            })
    } catch (error) {
        const entry = new History({
            userId: req.body.userId,
            history: [req.body.result]
        });
        await entry.save()
            .then(() => {
                res.json({ status: 'success', message: 'History save success.' })
            })
            .catch((error) => {
                res.json({ status: 'error', message: 'History save failure. Error: ', error })
                console.error(error)
            })
    }
});

// Search for Games associated with ObjectId (userId)
app.get('/api/games/:userId', jsonParser, async function (req, res) {

    try {
        await History.findOne({
            userId: req.params.userId
        })
            .then((result) => {
                console.log(result.history)
                res.json({ status: 'success', message: 'Search game success.', history: result.history })
            })
    } catch (error) {
        res.json({ status: 'error', message: 'History save failure. Error: ', error })
        console.error(error)
    }
});