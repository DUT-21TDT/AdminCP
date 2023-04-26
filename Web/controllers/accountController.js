let express = require('express');
let router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config(`${process.env.SECRET_KEY}`);

const instance = axios.create({baseURL: 'http://localhost:3000/api/v1/accounts'});

router.get("/", async (req, res, next) => {
    
    try {
        let responseData = await instance.get("/").then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            res.send("<script> alert('500'); window.location = '/AdminCP';</script>");
        });

        if (responseData.success) {
            res.render("pages/accounts", {
                title: "Quản lý tài khoản",
                name: "accounts",
                accounts: responseData.data,
            });
        } else {
            console.log(responseData.message);
            res.render("pages/accounts", {
                title: "Quản lý tài khoản",
                name: "accounts",
                accounts: {},
            });
        }
        
    } catch (error) {
        res.status(500);
    }

    
});

router.get("/info/:id", async (req, res, next) => {
    const accountId = req.params.id;

    try {
        let responseData = await instance.get("/" + accountId).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            res.send("<script> alert('Do not find accountId = "+accountId+"'); window.location = '/AdminCP/Accounts';</script>");
        });
        if (responseData.success) {
            res.render("pages/account_comp/info", {
                title: "Thông tin tài khoản: " +  accountId,
                name: "accounts",
                accountInfo: responseData.data,
            });
        } else {
            res.render("pages/account_comp/info", {
                title: "Thông tin tài khoản: " +  accountId,
                name: "accounts",
                data: null,
            });
        }
        
    } catch (error) {
        res.status(500);
    }
});

router.put("/update/:id", (req, res, next) => {
    let id = req.params.id;
});

router.delete("/delete/:id", (req, res, next) => {
    let id = req.params.id;
});

module.exports = router;