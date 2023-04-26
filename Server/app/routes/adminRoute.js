var express = require('express');
var router = express.Router();

router.use("/users", require("../controllers/userController"))

module.exports = router;