const Post = require('../Models/Post');
const uuid = require('uuid');

module.exports = async (req, res, next) => {
  let authorId = req.body.authorId,
    images = req.body.image,
    text = req.body.text;
  if (!authorId || !images || !text) {
    res.send({ info: 'Not enough data', data: req.query });
    next();
  } else {
    Post.create({
      authorId,
      images,
      likeCounter: 0,
      likes: [],
      text,
      uuid: uuid()
    });
    // we're connected!
    res.send({
      done: true
    });
    next();
  }
};
