let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

const {uploadFile} = require(`${__path_controllers}/AdminCP/upload.controller.js`);

router.post("/", auth, uploadFile);

module.exports = router;