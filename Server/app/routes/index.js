var express = require('express');
var router = express.Router();

router.use('/items', require("../controllers/itemController"));
router.use('/login', require("../controllers/loginController"));
router.use("/accounts", require("../controllers/accountController"));

// router.use('/admin', require("../routes/adminRoute"))

module.exports = router;