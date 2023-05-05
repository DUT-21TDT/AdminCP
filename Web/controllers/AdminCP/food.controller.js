const axios = require('axios');

const controllerName = "foods";

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/${controllerName}`});

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
                name: controllerName,
                foods: responseData.data,
            });
        } else {
            console.log(responseData.message);
            res.render("pages/foods", {
                title: "Quản lý thực phẩm",
                name: controllerName,
                foods: {},
            });
        }
        
    } catch (error) {
        res.status(500);
    }
};

const addFoodPage = (req, res, next) => {

    res.render("pages/food_comp/form", {
        title: "Thêm thông tin thực phẩm",
        name: controllerName,
    });

}

module.exports = {
    getFoods,
    addFoodPage,
};