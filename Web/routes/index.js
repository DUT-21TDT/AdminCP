var express = require('express');
var router = express.Router();

router.use('/', require(`${__path_routes}/v1`));

module.exports = router;