const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  // Bearer Token
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];
  if (authToken === undefined)
    return res.status(401).json({
      error: "Unauthorized",
    });
  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        error: "Token is not valid",
      });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
