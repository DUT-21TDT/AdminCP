var express = require('express');
var router = express.Router();


router.get("/", (req, res, next) => {
    res.render("pages/dashboard", {
        title: "Dashboard"});
});

router.get("/dashboard", (req, res, next) => {
    res.render("pages/dashboard", {
        title: "Dashboard",
        name: "dashboard",
    });
});

router.get("/Accounts", (req, res, next) => {
    res.render("pages/accounts", {
        title: "Quản lý tài khoản",
        name: "accounts",
    });
});

router.get("/Foods", (req, res, next) => {
    res.render("pages/foods", {
        title: "Quản lý thực phẩm",
        name: "foods",
    });
});

router.get("/FoodMenu", (req, res, next) => {
    res.render("pages/foodMenu.ejs", {
        title: "Quản lý thực đơn",
        name: "foodMenu",
    });
});

module.exports = router;