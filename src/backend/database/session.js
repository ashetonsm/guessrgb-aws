module.exports = {
    sessionOptions: {
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 20000, httpOnly: true, signed: true },
        saveUninitialized: true,
        resave: false,
    }
}