let express = require('express');
let router = express.Router();

const controllerName = 'menu';
const menu = require(__path_models + controllerName);

let data = [
    new menu("menu01", "Bữa sáng cho người gầy", "", [{"foodId": "food01", "amount": 2}, {"foodId": "food02", "amount": 1}], "Administrator", true),
    new menu("menu02", "Bữa sáng được chia sẻ bởi test123", "", [{"foodId": "food02", "amount": 1}], "test123", false),
]

router.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "notice": "get all menu",
        "data": data
    });
});


router.get("/info/:menuId", (req, res) => {

    const menuInfo = data.find(
        (e) => e.menuId === req.params.menuId
    );

    if (menuInfo){
        res.status(200).json({
            "success": true,
            "notice": `get information about [${menuInfo.menuName}] successfully.`,
            "data": menuInfo
        });    
    } else {
        res.status(404).json({
            "success": false,
            "notice":  "Don't find the food by Id = " + req.params.menuId,
            "data": null
        });
    }
});

router.put("/set/public/:menuId", (req, res) => {
    const menuId = req.params.menuId;
    const menuInfo = data.find(
        (data) => data.menuId === menuId
    );

    if (!menuInfo) 
    {
        res.status(404).json({
            "success": false,
            "notice": "Don't find the menu by Id = " + menuId,
        });
    }else {
        menuInfo.isPublic = !(menuInfo.isPublic);
        res.status(200).json({
            "success": true,
            "notice": "Đã chuyển trạng thái của thực đơn [" + menuInfo.menuName + "] thành " + (menuInfo.isPublic ? "công khai" : " đang chờ xử lý"),
        });
    }
});

router.delete("/delete/:menuId", (req, res) => {
    const menuId = req.params.menuId;
    const menuInfo = data.find(
        (data) => data.menuId === menuId
    );

    if (!menuInfo) 
    {
        res.status(404).json({
            "success": false,
            "notice": "Don't find the menu by Id = " + menuId,
        });
    }else {
        let index = data.indexOf(menuInfo);
        data.splice(index, 1);
        res.status(200).json({
            "success": true,
            "notice": "Đã xóa thực đơn [" + menuInfo.menuName + "] ra khỏi hệ thống !",
        });
    }
});

module.exports = router;