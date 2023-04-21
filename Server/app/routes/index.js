var express = require('express');
var router = express.Router();

router.use('/items', require("../controllers/itemController"));
router.use('/login', require("../controllers/loginController"));

module.exports = router;