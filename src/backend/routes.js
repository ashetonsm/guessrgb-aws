require('./database/conn');

const History = require('./models/history.model');
const User = require('./models/user.model');

const bcrypt = require('bcryptjs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const express = require('express');
const PasswordUtils = require('../utilities/PasswordUtils');
const session = require('express-session');
const { sessionOptions } = require('./database/session');

const PORT = process.env.PORT || 5000;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const saltStart = parseInt(process.env.SALT_START);
const saltEnd = parseInt(process.env.SALT_END);
const url = process.env.ATLAS_URI;

const app = express();

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5000'
        ],
        credentials: true
    }),
    express.json(),
    cookieParser(),
    session(sessionOptions),
    express.urlencoded({ extended: true })
);

mongoose.connect(url)

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})

app.get('/', (req, res) => {
    console.log(req.session)

})

// Log into the application
app.post('/api/login', async function (req, res) {

    await User.findOne({
        email: req.body.email,
    })
        .then(async (user) => {
            res.status(200)
            var existingSalt = user.password.slice(saltStart, saltEnd);
            var hashedPassword = await bcrypt.hash(req.body.password, existingSalt);
            const match = PasswordUtils.compare(hashedPassword, user.password);

            if (match === true) {
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
                res.send();
            } else {
                res.status(401);
                res.send();
            }
        })
        .catch(error => {
            res.json({ status: 'error', message: 'Log in failure. Error: ', error })
            console.error('Database Error (login).')
        })
});

// Create a new User
app.post('/api/register', async function (req, res) {

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
app.post('/api/record', async function (req, res) {

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
app.get('/api/games/:userId', async function (req, res) {

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