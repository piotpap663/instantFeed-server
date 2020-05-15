const Post = require('../Models/Post');

module.exports = async (req, res, next) => {
  try {
    let postId = req.body.params.postId,
      userId = req.body.params.userId;
    if (!postId || !userId) {
      res.send({ info: 'Not enough data', data: req.body });
      next();
    } else {
      await Post.findById(postId, async (err, post) => {
        const posts = post.toObject();
        let likes = await posts.likes.includes(userId) ? posts.likes.filter(subscriberId => subscriberId !== userId) : [...posts.likes, userId];
        let done = function (err, result) {
          if (err) {
            console.log("Finished error", err, 'error')
            return res.status(500);
          }
          return res.send(result);
        }
        await Post.update(
          { _id: postId },
          { $set: { likes: likes } },
          done
        );
      });
    }
  } catch (error) {
    console.log("catched error");
    res.send({
      error
    });
  }
};
