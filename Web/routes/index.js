var express = require('express');
var router = express.Router();

router.use('/login', require("../controllers/loginController"));
router.use('/logout', require("../controllers/logoutController"));
router.use("/", require('../controllers/mainController'));

module.exports = router;