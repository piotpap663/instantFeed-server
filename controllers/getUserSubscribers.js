const User = require('../Models/User');

module.exports = async (req, res, next) => {
  const _id = req.query.userId;
  try {
    User.findById({ _id }, (err, user) => {
      if (err) {
        console.error(err, "error");
      } else {
        res.send(user.subscribers);
      }
    });
  } catch (error) {
    res.json(error, 'error');
  }
};