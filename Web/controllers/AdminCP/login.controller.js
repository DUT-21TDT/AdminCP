var axios = require('axios');

let LoginPageView = (req, res, next) => {
    res.sendFile(__path_views + '/statics/login.html');
}

let LoginSubmitEvent = async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    const instance = axios.create({baseURL: `${process.env.API_URL}/login`});
    
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
};

module.exports = {
    LoginPageView,
    LoginSubmitEvent
};