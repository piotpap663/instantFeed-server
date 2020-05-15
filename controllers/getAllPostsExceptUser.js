const Post = require('../Models/Post');
const User = require('../Models/User');

module.exports = async (req, res, next) => {
  const userId = req.query.userId;
  try {
    Post.find({ 'authorId': { $ne: userId } }, async (err, posts) => {
      if (err) {
        console.error(err, "error");
      }
      const aggregated = [];
      await User.find({ "_id": { $ne: userId } }, function (err, users) {
        // eslint-disable-next-line array-callback-return
        posts.map(post => {
          const normalizePost = { ...post.toObject() };
          const obj = {
            ...normalizePost,
            user: users.map(user => {
              user.password = undefined;
              return user;
            }).find(user => {
              return user._id.toString() === post.authorId.toString()
            }),
            liked: normalizePost && normalizePost.likes && normalizePost.likes.includes(userId)
          };
          if (obj.user) {
            aggregated.push(obj);
          }
        })
      })
      res.send(aggregated);
    });
  } catch (error) {
    res.json(error, 'error');
  }
};