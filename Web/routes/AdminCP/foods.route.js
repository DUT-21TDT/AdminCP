let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

const {
    renderFoodsPageView,
    getFoodsWithKeyword,
    
    addFoodPage,
    submitAddFood,

    viewFoodInfoByFoodId,

    renderFoodEditPage,
    updateFoodInfo,

    deleteFoodByFoodId,} = require(`${__path_controllers}/AdminCP/food.controller.js`);


// management
router.get("/", auth, renderFoodsPageView);
router.get("/search", auth, getFoodsWithKeyword);
// add
router.get("/add",auth, addFoodPage);
router.post("/add", auth, submitAddFood);
// view info
router.get("/info/:foodId", auth, viewFoodInfoByFoodId);
// edit
router.get("/edit/:foodId", auth, renderFoodEditPage);
router.put("/update/:foodId", auth, updateFoodInfo);
// delete
router.delete("/delete/:foodId", auth, deleteFoodByFoodId);

module.exports = router;