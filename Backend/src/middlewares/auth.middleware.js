const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
//Get Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Token not found' });
  }


  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res
      .status(401)
      .json({ error: 'Invalid token' });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      id: payload.userId,
      email: payload.email
    };
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Invalid token or expired' });
  }
};
