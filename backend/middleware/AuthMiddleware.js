const jwt = require('jsonwebtoken')

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRETE);
    req.email = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token!" });
  }
};
