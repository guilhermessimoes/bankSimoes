function requiredAuthentication(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } 
    next(); 
}

module.exports = requiredAuthentication