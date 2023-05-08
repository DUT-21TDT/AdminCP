const axios = require('axios');

const controllerName = "accounts";

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/${controllerName}`});

let renderAccountsPageView = async (req, res, next) => {
    res.render("pages/accounts", {
        title: "Quản lý tài khoản",
        name: controllerName,
    });
}

let getAccountsWithKeyword = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;

        let responseData = await instance.get("/").then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            throw err;
        });

        if (responseData.success) {

            let accounts = [];

            responseData.data.forEach(e => {
                if (e.fullName.toLowerCase().includes(keyword)) 
                {
                    accounts.push(e);
                }
            });

            res.status(200).json({
                "success":true,
                "data":accounts,
            });
            
        } else {
            res.status(404).json({
                "success":false,
                "notice": "empty",
                "data":[],
            });
        }
        
    } catch (error) {
        res.status(500);
    }
};

let getAccountInfoByID = async (req, res, next) => {
    const accountId = req.params.id;

    try {
        let responseData = await instance.get("/info/" + accountId).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            res.send("<script> alert('Do not find accountId = "+accountId+"'); window.location = '/AdminCP/Accounts';</script>");
        });
        if (responseData.success) {
            res.render("pages/component/account/info", {
                title: "Thông tin tài khoản: " +  accountId,
                name: controllerName,
                accountInfo: responseData.data,
            });
        } else {
            res.render("pages/component/account/info", {
                title: "Thông tin tài khoản: " +  accountId,
                name: controllerName,
                data: null,
            });
        }
        
    } catch (error) {
        res.status(500);
    }
};

let changeBlockStatus = async (req, res, next) => {
    let username = req.params.username;

    try {
        let responseData = await instance.put("/btnChangeLockStatus",{username:username}).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
        });
        if (responseData.success){
            res.status(200).json(
                {
                    "success":true,
                    "notice": responseData.notice,
                }
            );
        } else {
            res.status(404).json(
                {
                    "success":false,
                    "notice": responseData.notice,
                }
            );
        }
    } catch (error) {
        res.status(500);
    }

    
};

let deleteAccountByUsername = async (req, res, next) => {
    let username = req.params.username;

    try {
        let responseData = await instance.delete(`/delete/${username}`).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
        });
        if (responseData.success){
            res.status(200).json(
                {
                    "success":true,
                    "notice": responseData.notice,
                    "data": username 
                }
            );
        } else {
            res.status(404).json(
                {
                    "success":false,
                    "notice": responseData.notice,
                    "data": username 
                }
            );
        }
    } catch (error) {
        res.status(500);
    }
};

module.exports = {
    renderAccountsPageView,
    getAccountsWithKeyword,
    getAccountInfoByID,
    changeBlockStatus,
    deleteAccountByUsername,
};