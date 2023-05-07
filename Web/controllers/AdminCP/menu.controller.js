const axios = require('axios');

const controllerName = "menu";

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/${controllerName}`});

let renderMenuPageView = (req, res, next) => {
    res.render("pages/menu", {
        title: "Quản lý thực đơn",
        name: controllerName,
    });
}

module.exports = {
    renderMenuPageView,
    
}