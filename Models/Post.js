const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  authorId: String,
  userName: String,
  avatar: String,
  images: [

  ],
  likes: { type: Array },
  likeCounter: Number,
  comments: Array,
  created_at: Date,
  text: String
});
postSchema.pre('save', function (next) {
  if (!this.created_at) this.created_at = new Date();
  if (!this.comments) this.comments = [];
  next();
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post; 
