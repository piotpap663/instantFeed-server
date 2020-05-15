const User = require('../Models/User');
const uuid = require('uuid');

module.exports = async (req, res, next) => {
  let user = req.body.user,
    password = req.body.password,
    permission = req.body.permission || 'USER';
  if (!user || !password || !permission) {
    res.send({ info: 'Not enough data' });

  } else {
    await User.findOne({ user }, (err, foundUser) => {
      if (foundUser) {
        res.send({ info: 'User exists' });
        next();
      }
      else {
        User.create({
          user,
          password,
          permission,
          uuid: uuid()
        }).then(() => {
          res.send({
            user,
            password,
            permission,
            uuid: uuid()
          });
          next();
        })
      }

    });


    // we're connected!
  }
};
