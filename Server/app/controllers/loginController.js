var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


const controllerName = 'user';
const MainModel = require(__path_models + controllerName);

let data = [
    new MainModel("admin", "admin", "https://i.imgur.com/yuEqT4B.jpg"),
    new MainModel("test123", "test123", "https://i.imgur.com/yuEqT4B.jpg"),
    new MainModel("Administrator", "Administrator", "https://i.imgur.com/cqF2jpp.jpeg")
]

router.post("/", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username == "" || password == "") 
        res.status(200).json(
            {
                "success": false,
                "status":403,
                "message": "Username or password is empty!",
                "data": null            
            }
        );
    
    const token = jwt.sign({
        "username": username, 
        "password": password,   
       }, 
       'shhhhh',
       {
           expiresIn: "2h",
       });
    
    var user = new MainModel(null, null, null, null);

    data.forEach(e => {
        if (e.username == username && e.password == password) {
            user = e;
        }
    });

    if (user.username != null) {
        user.token = token;

        res.status(200).json(
            {
                "success": true,
                "status":200,
                "message": "Login successful",
                "data": user,
            }
        );
    } else
    res.status(200).json(
        {
            "success": false,
            "status":403,
            "message": "Username or password is wrong!",
            "data": null
        }
    );
});


router.post("/auth", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username == "" || password == "") 
        res.status(200).json(
            {
                "status":false,
                "message": "Username or password is empty!",
                "data": null            
            }
        );
    
    const token = jwt.sign({
        "username": username, 
        "password": password,   
       }, 
       'shhhhh',
       {
           expiresIn: "2h",
       });
    
    var user = new MainModel(null, null, null);

    data.forEach(e => {
        if (e.username == username && e.password == password) {
            user = e;
        }
    });

    if (user.username != null) {
        user.token = token;

        res.status(200).json(
            {
                "status": true,
                "message": "Login successful",
                "data": user,
            }
        );
    } else
    res.status(200).json(
        {
            "status": false,
            "message": "Username or password is wrong!",
            "data": null
        }
    );

    res.send(data);
});


module.exports = router;