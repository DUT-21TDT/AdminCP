var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var axios = require('axios');
const dotenv = require("dotenv");
dotenv.config(`${process.env.SECRET_KEY}`);

router.get("/", async (req, res, next) => {


    // do something before logout
    res.redirect("/AdminCP/login");
});

module.exports = router;