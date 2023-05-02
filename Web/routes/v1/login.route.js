var express = require('express');
var router = express.Router();

const {LoginPageView, LoginSubmitEvent} = require(`${__path_controllers}/login.controller.js`);

router.get("/", LoginPageView);

router.post("/", LoginSubmitEvent);

module.exports = router;