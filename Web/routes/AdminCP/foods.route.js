let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

const {
    renderFoodsPageView,
    getFoodsWithKeyword,
    addFoodPage,
    submitAddFood,
    deleteFoodByFoodId,} = require(`${__path_controllers}/AdminCP/food.controller.js`);


// management
router.get("/", auth, renderFoodsPageView);
router.get("/search", auth, getFoodsWithKeyword);
// add
router.get("/add",auth, addFoodPage);
router.post("/add", auth, submitAddFood);
// edit
router.get("/edit/:foodId", auth);
router.put("/edit/:foodId", auth);
// view info
router.get("/info/:foodId", auth);
// delete
router.delete("/delete/:foodId", auth, deleteFoodByFoodId);

module.exports = router;