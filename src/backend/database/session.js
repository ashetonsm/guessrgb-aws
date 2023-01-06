const MongoStore = require("connect-mongo");

module.exports = {
    sessionOptions: {
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 20000, httpOnly: true, signed: true },
        saveUninitialized: false,
        resave: false,
        store: MongoStore.create({
            mongoUrl: process.env.ATLAS_URI,
            ttl: 20000
        })
    }
}