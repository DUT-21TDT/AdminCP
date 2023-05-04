const axios = require('axios');

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/accounts`});

let AccountsRenderView = async (req, res, next) => {
    res.render("pages/accounts", {
        title: "Quản lý tài khoản",
        name: "accounts",
    });
}

let getAccountsWithKeyword = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;
        let responseData = await instance.get(`/search?keyword=${keyword}`).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            res.send("<script> alert('500'); window.location = '/AdminCP';</script>");
        });

        res.json(
            {
                "success": true,
                "data":responseData.data,
            }    
        );
        
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
    AccountsRenderView,
    getAccountsWithKeyword,
    getAccountInfoByID,
    changeBlockStatus,
    deleteAccountByUsername,
};