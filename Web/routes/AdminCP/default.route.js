let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

router.get("/", auth, require(`${__path_controllers}/default.controller.js`));

module.exports = router;