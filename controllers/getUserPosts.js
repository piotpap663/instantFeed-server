const Post = require('../Models/Post');
const User = require('../Models/User');

module.exports = async (req, res, next) => {
  const userId = req.query.userId;
  try {
    Post.find({ authorId: userId }).sort({ created_at: "desc" }).exec(async (err, posts) => {
      if (err) {
        console.error(err, "error");
      }
      const aggregated = [];
      await User.find({ "_id": userId }, function (err, users) {
        // eslint-disable-next-line array-callback-return
        posts.map(post => {
          let foundPostAuthor = users.map(user => {
            user.password = undefined;
            return user;
          }).find(user => {
            return user._id.toString() === post.authorId.toString()
          });
          if (!foundPostAuthor) {
            foundPostAuthor = {
              user: 'REMOVED_USER',
              id: '',
              permission: 'USER',
              subscribers: []
            }
          };
          const normalizePost = { ...post.toObject() };
          const obj = {
            ...normalizePost,
            user: foundPostAuthor,
            liked: normalizePost && normalizePost.likes && normalizePost.likes.includes(userId)
          };
          aggregated.push(obj);
        })
      })
      res.send(aggregated);
    });
  } catch (error) {
    res.json(error);
  }
};