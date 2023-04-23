var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    res.render("pages/accounts", {
        title: "Quản lý tài khoản",
        name: "accounts",
    });
});

router.get("/info/:id", (req, res, next) => {
    var id = req.params.id;
    res.render("pages/account_comp/info", {
        title: "Thông tin tài khoản: " +  id,
        name: "accounts",
    });
});

router.put("/update/:id", (req, res, next) => {
    var id = req.params.id;
});

router.delete("/delete/:id", (req, res, next) => {
    var id = req.params.id;
});

module.exports = router;