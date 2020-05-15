module.exports = function (err, dbURL) {
  if (err) {
    console.log('⛔ Error connecting to: ' + dbURL);
  } else {
    console.log('✅ Connected to: ' + dbURL);
  }
}