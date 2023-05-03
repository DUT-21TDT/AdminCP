let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

router.get("/", auth, require(`${__path_controllers}/AdminCP/default.controller.js`));

module.exports = router;