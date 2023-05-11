module.exports = function(req, res, next) {
    if (req.session && req.session.token) {
        if (req.session.user.isAdmin) {
            console.log(req.session.token);
            return next();
        } else {
            res.redirect("/");
        }
        
    } else {
        res.redirect("/AdminCP/logout");
    }
}