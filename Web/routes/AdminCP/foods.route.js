let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

const {getFoods, getFoodInfoByID} = require(`${__path_controllers}/AdminCP/food.controller.js`);


router.get("/", auth, getFoods);

module.exports = router;