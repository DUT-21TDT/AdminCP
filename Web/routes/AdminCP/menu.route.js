let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

const {renderMenuPageView} = require(`${__path_controllers}/AdminCP/menu.controller.js`);

router.get("/", auth, renderMenuPageView);

module.exports = router;