var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth');


router.get("/", auth, (req, res, next) => {
    res.render("pages/dashboard", {
        title: "Dashboard",
        name:"dashboard"
    });
});

router.get("/dashboard", (req, res, next) => {
    res.render("pages/dashboard", {
        title: "Dashboard",
        name: "dashboard",
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