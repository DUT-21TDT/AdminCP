const permission = {
    Admin : 1,
    User : 0,
}
module.exports = async function(req, res, next) {
    if (req.session && req.session.token) {
        
        const response = await require("../controllers/AdminCP/account.controller")
        .getAccountInfoByID(req.session.userId, req.session.token);

        if (response.success) {
            const user = response.data;
            if (user.permission == permission.Admin) {
                res.locals.user = user;
                return next();
            } else {
                res.redirect("/");
            }
        } else {
            res.redirect("/AdminCP/logout");
            return;
        }
        
    } else {
        res.redirect("/AdminCP/logout");
    }
}