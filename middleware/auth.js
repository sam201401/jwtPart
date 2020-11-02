const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //const token = req.header("token");
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log("token is "+token);
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
