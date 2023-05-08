const axios = require('axios');
const {text2float} = require(__path_utils + 'general.js');

const controllerName = "foods";

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/${controllerName}`});

// [GET] /Foods/
const renderFoodsPageView = async(req, res, next) => {
    res.render("pages/foods", {
        title: "Quản lý thực phẩm",
        name: controllerName,
    });
}

// [GET] /Foods?search
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

// [GET] /Foods/add
const addFoodPage = (req, res, next) => {
    res.render("pages/component/food/form", {
        title: "Thêm thông tin thực phẩm",
        name: controllerName,
        food: null,
    });
}

// [POST] /Foods/add
const submitAddFood = async (req, res, next) => {
    try {
        const foodId = req.params.foodId;

        ///==============================================
        const foodName = req.body.foodName;
        let foodImage = req.body.foodImage;
        if (foodImage.match("//localhost")) foodImage = "";

        // nutrition
        const Energy = text2float(req.body.nutrition.energy);
        const Carbohydrate = text2float(req.body.nutrition.carbohydrate);
        const Lipid = text2float(req.body.nutrition.lipid);
        const Protein = text2float(req.body.nutrition.protein);
        const Vitamins = req.body.nutrition.vitamins;
        const Minerals = req.body.nutrition.minerals;
        //
        const foodInfo = {
            foodName, foodImage, 
            Energy, Carbohydrate, Lipid, Protein, Vitamins, Minerals
        }
        ///==============================================

        await instance.post(`/add`, foodInfo).then(response => {
            res.send(response.data);
        }).catch((err) => {
            console.log({message: err});
            res.status(500).sendFile(__path_views + '/statics/500.html');
        });
    } catch (err){
        console.log(err);
        res.status(500).sendFile(__path_views + '/statics/500.html');
    }
    
};


// [FUNCTION]
const getFoodInfoByFoodId = async (foodId) => {
    let res = await instance.get(`/info/${foodId}`).then(response => {
        return response.data;
    }).catch((err) => {
        console.log({message: err});
        return null;
    });

    return res;
}

// [GET] /Foods/:foodId 
const getFoodByFoodId = async (req, res, next) => {
    const foodId = req.params.foodId;
    const responseData = await getFoodInfoByFoodId(foodId);
    res.send(responseData); 
}

// [GET] /Foods/info/:foodId 
// view info
const viewFoodInfoByFoodId = async (req, res, next) => {
    try {
        const foodId = req.params.foodId;
        const responseData = await getFoodInfoByFoodId(foodId);
        if (responseData.success) {
            let food = responseData.data;
            res.render("pages/component/food/info", {
                title: `Xem thông tin thực phẩm: ${foodId}`,
                name: controllerName,
                food: food,
            });

        } else {
            res.status(404).sendFile(__path_views + '/statics/404.html');
        }
        
    } catch (error) {
        res.status(500).sendFile(__path_views + '/statics/500.html');
    }
}


// edit
// [GET] /Foods/edit/:foodId
const renderFoodEditPage = async (req, res, next) => {
    try {
        const foodId = req.params.foodId;
        const responseData = await getFoodInfoByFoodId(foodId);

        if (responseData.success) {
            let food = responseData.data;
            res.render("pages/component/food/form", {
                title: `Chỉnh sửa thông tin thực phẩm: ${foodId}`,
                name: controllerName,
                food: food,
            });

        } else {
            res.status(404).sendFile(__path_views + '/statics/404.html');
        }
        
    } catch (error) {
        res.status(500).sendFile(__path_views + '/statics/500.html');
    }
}

// [PUT] /Foods/update/:foodId
const updateFoodInfo = async (req, res, next) => {

    const notice = {
        err: "Cập nhật thất bại, vui lòng kiểm tra lại",
        success: "Cập nhật thành công",
    }

    try {

        const foodId = req.params.foodId;

        ///==============================================
        const foodName = req.body.foodName;
        let foodImage = req.body.foodImage;
        if (foodImage.match("//localhost")) foodImage = "";

        // nutrition
        const Energy = text2float(req.body.nutrition.energy);
        const Carbohydrate = text2float(req.body.nutrition.carbohydrate);
        const Lipid = text2float(req.body.nutrition.lipid);
        const Protein = text2float(req.body.nutrition.protein);
        const Vitamins = req.body.nutrition.vitamins;
        const Minerals = req.body.nutrition.minerals;
        //
        const foodInfo = {
            foodName, foodImage, 
            Energy, Carbohydrate, Lipid, Protein, Vitamins, Minerals
        }
        ///==============================================

        let responseData = await instance.put(`/update/${foodId}`, foodInfo).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            throw err;
        });

        if (responseData.success) {
            res.status(200).json({
                "success": true,
                "notice": notice.success,
            });
        } else {
            res.json({
                "success": false,
                "notice": notice.err,
            });
        }

    } catch (error) {
        res.json({
            "success": false,
            "notice": notice.err,
        });
    }
}

// delete
// [DELETE] /Foods/delete/:foodId
const deleteFoodByFoodId = async (req, res, next) => {
    let foodId = req.params.foodId;

    try {
        let responseData = await instance.delete(`/delete/${foodId}`).then(response => {
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
}   

module.exports = {
    renderFoodsPageView,
    getFoodByFoodId,
    getFoodsWithKeyword,

    addFoodPage,
    submitAddFood,
    viewFoodInfoByFoodId,

    renderFoodEditPage,
    updateFoodInfo,

    deleteFoodByFoodId,
};