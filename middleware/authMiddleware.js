var jwt = require("jsonwebtoken");
function authMiddelWare(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const tokenDecode = jwt.verify(token, "ecommerceapi");

    req.userInfo = tokenDecode;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      messege: " Access denied, token required",
    });
  }
}
module.exports = authMiddelWare;
