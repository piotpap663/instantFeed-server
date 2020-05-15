const mongoose = require('mongoose');

const connectMongoose = require('./mongoose-connect');
const { DB_URL } = process.env;
module.exports = () => {
  mongoose.connect(DB_URL, (err) => connectMongoose(err, DB_URL));
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("✅ database connected ");
  });
}