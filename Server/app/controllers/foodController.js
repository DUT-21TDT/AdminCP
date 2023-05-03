let express = require('express');
let router = express.Router();

const controllerName = 'food';
const food = require(__path_models + controllerName);

let data = [
    new food("food01", "Chuối", "", ),
    new food("food02", "Phở", ""),
    new food("food03", "Bánh mì chả", "")
]

router.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "notice": "get all foods",
        "data": data
    });
});

module.exports = router;
