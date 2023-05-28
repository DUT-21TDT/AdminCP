var axios = require('axios');

let LoginPageView = (req, res, next) => {
    res.sendFile(__path_views + '/statics/login.html');
}

let LoginSubmitEvent = async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    const instance = axios.create({baseURL: `${process.env.API_URL}/login`});
    
    try {
        var responseData = await instance.post("/", {
            username: username,
            password: password
        }).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
        });

        if (responseData.success) {

            req.session.token = responseData.token;
            req.session.userId = responseData.data.userid;
            
            // console.log(responseData.data.avatar);
            // console.log(responseData.token)
            res.redirect("/AdminCP");
            // res.status(responseData["status"]).send("<script> alert('"+responseData["message"]+"'); window.location = '/AdminCP';</script>");
        } else {
            res.status(responseData["status"]).send("<script> alert('"+responseData.message +"'); window.location = '';</script>");
        }
    } catch (error) {
        console.log({message:error});
        res.status(500).send(`<script> alert('500'); window.location = '';</script>`);
    }
};

module.exports = {
    LoginPageView,
    LoginSubmitEvent
};