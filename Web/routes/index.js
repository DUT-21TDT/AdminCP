var express = require('express');
var router = express.Router();

router.use('/AdminCP', require(`${__path_routes}/AdminCP`));

module.exports = router;