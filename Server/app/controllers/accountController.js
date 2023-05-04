let express = require('express');
let router = express.Router();

const controllerName = 'account';
const account = require(__path_models + controllerName);

let data = [
    new account("1", "nvtruongson", "Nguyễn Văn Trường Sơn", "nguyenvantruongson@gmail.com", "06/03/2003", "https://i.imgur.com/cqF2jpp.jpeg", 1, true),
    new account("2", "thuchoang2003", "Nguyễn Thúc Hoàng", "nguyenthuchoang17112003@gmail.com", "17/11/2003", "https://i.imgur.com/yuEqT4B.jpg", 0, false),
    new account("3", "ncnquang", "Nguyễn Cửu Nhật Quang", "ncnquang@gmail.com", "eo biet :>", "", 0, false),
]

router.get("/search", (req, res) => {
    const keyword = req.query.keyword;

    let accounts = null;

    if (keyword === "") {
        accounts = data;
    } else {
        accounts = []
        data.forEach(e => {
            if (e.fullName.includes(keyword)) accounts.push(e);
        })
    }

    res.status(200).json({
        "success": true,
        "notice": "get all accounts",
        "data": accounts
    });
});

router.get("/info/:id", (req, res) => {
    const account = data.find(
        (data) => data.accountId === req.params.id
    );
    
    if (!account) 
    {
        res.status(404).json({
            "success": false,
            "notice": "Don't find the account by Id = " + req.params.id,
            "data": null,
        });
    }else {
        res.status(200).json({
            "success": true,
            "notice": "get account " + account.username + " successful",
            "data": account
        });
    }
});

router.put("/btnChangeLockStatus/", (req, res) => {

    const username = req.body.username;
    const account = data.find(
        (data) => data.username === username
    );

    if (!account) 
    {
        res.status(404).json({
            "success": false,
            "notice": "Don't find the account by Id = " + username,
            "data": null,
        });
    }else {
        account.isBlocked = (!account.isBlocked);
        res.status(200).json({
            "success": true,
            "notice": "Cập nhật trạng thái block thành công!",
            "data": account
        });
    }
});

router.delete("/delete/:username", (req, res) => {

    const username = req.params.username;
    const account = data.find(
        (data) => data.username === username
    );

    if (!account) 
    {
        res.status(404).json({
            "success": false,
            "notice": "Don't find the account by Id = " + username,
        });
    }else {
        let index = data.indexOf(account);
        data.splice(index, 1);
        res.status(200).json({
            "success": true,
            "notice": "Đã xóa tài khoản [" + username + "] ra khỏi hệ thống !",
        });
    }
});


module.exports = router;
