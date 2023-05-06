const axios = require('axios');

const controllerName = "foods";

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/${controllerName}`});

const renderFoodsPageView = async(req, res, next) => {
    res.render("pages/foods", {
        title: "Quản lý thực phẩm",
        name: controllerName,
    });
}

let getFoodsWithKeyword = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;

        let responseData = await instance.get("/").then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            throw err;
        });

        if (responseData.success) {
            
            let foods = [];

            responseData.data.forEach(e => {
                if (e.foodName.toLowerCase().includes(keyword)) 
                {
                    foods.push(e);
                }
            });

            res.status(200).json({
                "success":true,
                "data":foods,
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

const addFoodPage = (req, res, next) => {
    res.render("pages/food_comp/form", {
        title: "Thêm thông tin thực phẩm",
        name: controllerName,
    });
}


const text2float = (text) => {
    return parseFloat(text) ? parseFloat(text) : null; 
};

const submitAddFood = (req, res, next) => {
    const foodName = req.body.foodName;
    let foodImage = req.body.foodImage;
    if (foodImage.match("//localhost")) foodImage = "";

    // nutrition
    const energy = text2float(req.body.nutrition.energy);
    const carbohydrate = text2float(req.body.nutrition.carbohydrate);
    const lipid = text2float(req.body.nutrition.lipid);
    const protein = text2float(req.body.nutrition.protein);
    const vitamins = req.body.nutrition.vitamins;
    const minerals = req.body.nutrition.minerals;
    //
    const foodInfo = {
        foodName, foodImage, 
        energy, carbohydrate, lipid, protein, vitamins, minerals
    }

    console.log(foodInfo);
};


// delete
const deleteFoodByFoodId = (req, res, next) => {
    const foodId = req.params.foodId;
    console.log(foodId);
}   

module.exports = {
    renderFoodsPageView,
    getFoodsWithKeyword,
    addFoodPage,
    submitAddFood,


    deleteFoodByFoodId,
};