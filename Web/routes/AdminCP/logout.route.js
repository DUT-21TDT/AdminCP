var express = require('express');
var router = express.Router();

router.get("/", require(`${__path_controllers}/logout.controller.js`));

module.exports = router;