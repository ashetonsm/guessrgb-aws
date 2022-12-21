const { MongoClient } = require("mongodb")
require('dotenv').config({ path: `${__dirname}/.env`, debug: true, override: true })
var url = process.env.ATLAS_URI
const dbName = "guessrgb";

let dbConnection;

module.exports = {
  connectDB: function (callback) {
    return new Promise((resolve, reject) => {
      if (dbConnection) {
        resolve();
      }

      MongoClient.connect(url)
        .then((client) => {
          dbConnection = client.db(dbName);
          resolve();
          console.log("Successfully connected to MongoDB!")
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          console.log("Could not connect to MongoDB...")
        });
    });
  },
  getDB: function () {
    return dbConnection
  }
};