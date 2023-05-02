module.exports =  (req, res, next) => {
    res.render("pages/dashboard", {
        title: "Dashboard",
        name:"dashboard"
    });
};;