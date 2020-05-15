const User = require('../Models/User');

module.exports = async (req, res, next) => {
  const _id = req.body.params.subscriber;
  const authorId = req.body.params.authorId;
  try {
    User.findOneAndUpdate({ _id: authorId }, {
      $pull: { "subscribers": _id }
    }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ done: true });
      }
    });
  } catch (error) {
    res.json(error);
  }
};