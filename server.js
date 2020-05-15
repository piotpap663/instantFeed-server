require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const passport = require('passport');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

const logout = require('./controllers/logout');
const login = require('./controllers/login');
const addPost = require('./controllers/addPost');
const getAllPostsExceptUser = require('./controllers/getAllPostsExceptUser.js');
const removePost = require('./controllers/removePost');
const like = require('./controllers/like');
const getPosts = require('./controllers/getPosts');
const getUserPosts = require('./controllers/getUserPosts');
const getUserSubscribers = require('./controllers/getUserSubscribers');
const addUser = require('./controllers/addUser');
const subscribeUser = require('./controllers/subscribeUser');
const unSubscribeUser = require('./controllers/unSubscribeUser');
const getUserInfo = require('./controllers/getUserInfo');
const connectToMongo = require('./services/connectToMongo');
const initPassport = require('./services/initPassport');

const {
  ENDPOINT_ADD_USER,
  ENDPOINT_GET_USER_INFO,
  ENDPOINT_GET_USER_SUBSCRIBERS,
  ENDPOINT_SUBSCRIBE_USER,
  ENDPOINT_UNSUBSCRIBE_USER,
  ENDPOINT_ADD_POST,
  ENDPOINT_GET_POSTS,
  ENDPOINT_GET_USER_POSTS,
  ENDPOINT_REMOVE_POST,
  ENDPOINT_GET_ALL_POSTS_EXCEPT_USER,
  ENPOINT_LOGIN,
  ENPOINT_LOGOUT,
  ENDPOINT_LIKE,
  PORT = 3000
} = process.env;

const publicPath = path.join(__dirname, '..', 'public');
connectToMongo();

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(session({
  secret: 'anything'
}));
app.use(passport.initialize());
app.use(passport.session());
initPassport();

app.use(express.static(publicPath));

// passportLocal
app.post(ENPOINT_LOGIN, login);
app.get(ENPOINT_LOGOUT, logout);

// subscribersId [], image, text
app.post(ENDPOINT_ADD_POST, addPost);


// subscribersId [] - userId, table of subscriber id's
app.get(ENDPOINT_GET_POSTS, getPosts);
app.get(ENDPOINT_GET_USER_SUBSCRIBERS, getUserSubscribers);
// Posts[]

app.get(ENDPOINT_GET_USER_POSTS, getUserPosts);


app.get(ENDPOINT_GET_ALL_POSTS_EXCEPT_USER, getAllPostsExceptUser);

// id: string
app.post(ENDPOINT_REMOVE_POST, removePost);

// User {user, password, permission}
app.post(ENDPOINT_ADD_USER, addUser);

// id
app.post(ENDPOINT_GET_USER_INFO, getUserInfo);

// _id - i will follow him, authorId - me
app.post(ENDPOINT_SUBSCRIBE_USER, subscribeUser);
app.post(ENDPOINT_UNSUBSCRIBE_USER, unSubscribeUser);

// postId, userId
app.post(ENDPOINT_LIKE, like);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log('✅ Server is up! Port:', PORT);
});