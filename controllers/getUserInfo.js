const User = require('../Models/User');

module.exports = async (req, res, next) => {
  const userId = req.query.userId;
  try {
    await User.findById(userId, (err, user) => {
      if (err) {
        console.error(err, "error");
        res.send(err);
      }
      return {
        ...user,
        password: undefined
      };

    })
  } catch (error) {
    res.json(error);
  }
};