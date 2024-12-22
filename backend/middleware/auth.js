const jwt = require("jsonwebtoken")
const { JWT_ADMIN_SECRET } = require("../config")


function adminAuth(req, res, next){
  try{
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
      return res.status(404).json({
          errorMessage: "Bad Credentials!"
      })
    }
    const decode = jwt.verify(accessToken,JWT_ADMIN_SECRET)
    if(decode){
      req.admin = decode
      next()
    }
  }catch(error){
    return res.status(404).json({
      message: error.message
    })
  }
  
  
}
function userAuth(req, res, next){
  const userAccessToken = req.cookies.userAccessToken;

  if(!userAccessToken){
    return res.status(404).json({
      message: "Not authenticated",
      authenticated: false
    })
  }
  const decode =  jwt.verify(userAccessToken,process.env.JWT_USER_SECRET)
  if(decode){
    req.user = decode.user;
    next()
  }
}

module.exports = {
    adminAuth,
    userAuth
}