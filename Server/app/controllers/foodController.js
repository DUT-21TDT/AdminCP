let express = require('express');
let router = express.Router();

const controllerName = 'food';
const food = require(__path_models + controllerName);

let data = [
    new food("food01", "Chuối", "https://th.bing.com/th/id/R.87bb5dbb99c1b3369d0c38018a28547e?rik=gdCvpm0%2bwBf5Ww&pid=ImgRaw&r=0", 200.0, 20.1, 23.0, 3.2, "B2, A2", "Sắt"),
    new food("food02", "Phở", ""),
    new food("food03", "Bánh mì chả", "")
]

let currNumber = 3;

router.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "notice": "get all foods",
        "data": data
    });
});

router.get("/info/:foodId", (req, res) => {

    const foodInfo = data.find(
        (e) => e.foodId === req.params.foodId
    );

    if (foodInfo){
        res.status(200).json({
            "success": true,
            "notice": `get information about [${foodInfo.foodName}] successfully.`,
            "data": foodInfo
        });    
    } else {
        res.status(404).json({
            "success": false,
            "notice":  "Don't find the food by Id = " + req.params.foodId,
            "data": null
        });
    }
});

router.post("/add", (req, res) => {
    currNumber++;
    try {

        const foodId = `food${currNumber}`;
        let foodInfo = new food(foodId);
        foodInfo.foodName = req.body.foodName;
        foodInfo.foodImage = req.body.foodImage;
        foodInfo.Energy = req.body.Energy;
        foodInfo.Carbohydrate = req.body.Carbohydrate;
        foodInfo.Lipid = req.body.Lipid;
        foodInfo.Protein = req.body.Protein;
        foodInfo.Vitamins = req.body.Vitamins;
        foodInfo.Minerals = req.body.Minerals;
        foodInfo.latestUpdate = new Date().toLocaleString();

        data.push(foodInfo);

        res.status(200).json({
            success:true,
            notice: "Thêm thành công thông tin thực phẩm",
        });

    } catch(err){
        console.log({message: err});
        res.status(500).json({
            success:false,
            notice: "Xảy ra lỗi trong quá trình thêm thông tin thực phẩm!"
        });
    }
});

router.put("/update/:foodId", (req, res) => {
    try {
        const foodId = req.params.foodId;
        let foodInfo = data.find(
            (data) => data.foodId === foodId
        );

        foodInfo.foodName = req.body.foodName;
        foodInfo.foodImage = req.body.foodImage;
        foodInfo.Energy = req.body.Energy;
        foodInfo.Carbohydrate = req.body.Carbohydrate;
        foodInfo.Lipid = req.body.Lipid;
        foodInfo.Protein = req.body.Protein;
        foodInfo.Vitamins = req.body.Vitamins;
        foodInfo.Minerals = req.body.Minerals;
        foodInfo.latestUpdate = new Date().toLocaleString();

        res.status(200).json({
            success:true,
            notice: "Cập nhật thành công!",
        });

    } catch(err){
        res.status(500).json({
            success:false,
            notice: "Xảy ra lỗi trong quá trình cập nhật!"
        });
    }
});

router.delete("/delete/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const foodInfo = data.find(
        (data) => data.foodId === foodId
    );

    if (!foodInfo) 
    {
        res.status(404).json({
            "success": false,
            "notice": "Don't find the food by Id = " + foodId,
        });
    }else {
        let index = data.indexOf(foodInfo);
        data.splice(index, 1);
        res.status(200).json({
            "success": true,
            "notice": "Đã xóa thông tin thực phẩm [" + food.foodName + "] ra khỏi hệ thống !",
        });
    }
});

module.exports = router;
