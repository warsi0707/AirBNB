module.exports.isLogedIn = (req, res, next)=>{
    // console.log(req.path, "..", req.originalUrl)
    if(!req.isAuthenticated()){
        //Redirect url after login
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "You most be logged in!")
        return res.redirect("/login")
    }
    next()

}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}