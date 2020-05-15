const Post = require('../Models/Post');
const User = require('../Models/User');

module.exports = async (req, res, next) => {
  const userId = req.query.userId;
  let subscribers = [];
  if (typeof req.query.subscribers === "string") {
    // angular converts array with one value to value
    subscribers.push(req.query.subscribers);
  } else {
    subscribers = req.query.subscribers || [];
  }
  const subscribersWithoutUser = subscribers.filter(subscriberId => subscriberId !== userId);
  try {
    Post.find({
      $or: [
        { authorId: { $in: subscribers } },
        { likes: { $in: subscribersWithoutUser } },
      ],
    }).sort({ created_at: "desc" }).exec(function (err, posts) {
      const postAuthors = posts.map(post => post.authorId).filter(post => post.authorId !== userId);
      User.find({ "_id": { "$in": postAuthors } }, function (err, users) {
        const aggregated = [];
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
        res.send(aggregated);
      })
    });
  } catch (error) {
    res.json(error);
  }
};