module.exports = function (req, res) {
  req.logout();
  res.send({ done: true });
};
