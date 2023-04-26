let express = require('express');
let router = express.Router();

const controllerName = 'account';
const account = require(__path_models + controllerName);

let data = [
    new account("1", "nvtruongson", "Nguyễn Văn Trường Sơn", "nguyenvantruongson@gmail.com", "06/03/2003", "https://i.imgur.com/cqF2jpp.jpeg", 1, true),
    new account("2", "thuchoang2003", "Nguyễn Thúc Hoàng", "nguyenthuchoang17112003@gmail.com", "17/11/2003", "", 0, false),
    new account("3", "ncnquang", "Nguyễn Cửu Nhật Quang", "ncnquang@gmail.com", "eo biet :>", "", 0, false),
]

router.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "notice": "get all accounts",
        "data": data
    });
});

router.get("/:id", (req, res) => {
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

module.exports = router;
