let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

const {getFoods, addFoodPage} = require(`${__path_controllers}/AdminCP/food.controller.js`);


router.get("/", auth, getFoods);
router.get("/add",auth, addFoodPage);

module.exports = router;