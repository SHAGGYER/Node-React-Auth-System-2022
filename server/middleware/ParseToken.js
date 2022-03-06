const jwt = require("jsonwebtoken");

function ParseToken(req, res, next) {
  if (!req.headers.authorization) return next();
  const token = req.headers.authorization.split(" ")[1]; // Bearer <token here>
  if (!token) return next();

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (!userId) return next();

    res.locals.userId = userId;
    return next();
  } catch (e) {
    next();
  }
}

module.exports = ParseToken;
