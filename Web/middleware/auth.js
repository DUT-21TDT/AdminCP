module.exports = function(req, res, next) {
    if (req.session && req.session.token) {
        console.log(req.session.token);
        return next();
    } else {
        res.redirect("/AdminCP/logout");
    }
}