const axios = require('axios');

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/foods`});

let getFoods = async (req, res, next) => {
    try {
        let responseData = await instance.get("/").then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            res.send("<script> alert('500'); window.location = '/AdminCP';</script>");
        });

        if (responseData.success) {
            res.render("pages/foods", {
                title: "Quản lý thực phẩm",
                name: "foods",
                foods: responseData.data,
            });
        } else {
            console.log(responseData.message);
            res.render("pages/foods", {
                title: "Quản lý thực phẩm",
                name: "foods",
                foods: {},
            });
        }
        
    } catch (error) {
        res.status(500);
    }
};

module.exports = {
    getFoods,

};