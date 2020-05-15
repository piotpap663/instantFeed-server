const Post = require('../Models/Post');

module.exports = async (req, res, next) => {
  try {
    const _id = req.body.params.postId;
    Post.findByIdAndRemove({ _id }, (err, post) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.send({
        post
      });
    });
  } catch (error) {
    res.json(error);
  }
};