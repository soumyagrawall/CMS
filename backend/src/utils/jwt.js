const jwt = require("jsonwebtoken");
const env = require("../config/env");

const signToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      username: user.username
    },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );
};

const verifyToken = (token) => jwt.verify(token, env.jwt.secret);

module.exports = {
  signToken,
  verifyToken
};
