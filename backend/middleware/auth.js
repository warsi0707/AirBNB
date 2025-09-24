const jwt = require("jsonwebtoken")
const { JWT_USER_SECRET } = require("../config")


async function authChecker(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(404).json({
        error: "Bad Credentials! Login required"
      })
    }
    const decode = jwt.verify(token, JWT_USER_SECRET)
    if (decode) {
      req.user = decode
      next()
    }
  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }
}
module.exports = {
  authChecker
}