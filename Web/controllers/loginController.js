var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var axios = require('axios');
const dotenv = require("dotenv");
dotenv.config(`${process.env.SECRET_KEY}`);

const controllerName = 'user';
const MainModel = require(__path_models + controllerName);

router.get("/", (req, res, next) => {
    res.sendFile(__path_views + '/statics/login.html');
});

router.post("/", async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    const instance = axios.create({
        baseURL: 'http://localhost:3000/api/v1/login'
      });
    
    try {
        var data = await instance.post("/", {
            username: username,
            password: password
        }).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
        });
    
        if (data.success) {
            req.session.token = data.data;

            res.status(data["status"]).send("<script> alert('"+data["message"]+"'); window.location = '/AdminCP';</script>");
        } else {
            res.status(data["status"]).send("<script> alert('"+data["message"]+"'); window.location = '';</script>");
        }
    } catch (error) {
        res.status(500).send("<script> alert('500'); window.location = '';</script>");
    }
});

module.exports = router;