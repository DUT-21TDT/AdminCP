const axios = require('axios');
const {text2float} = require(__path_utils + 'general.js');

const controllerName = "foods";

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/admin-access/${controllerName}`});

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

        let responseData = await instance.get("/", 
        {
            headers: {
                Cookie: `token=${req.session.token}` 
            }
        }
        ).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            throw err;
        });

        if (responseData.success) {
            
            let foods = [];

            responseData.data.list.forEach(e => {
                if (e.foodname.toLowerCase().includes(keyword.toLowerCase())) 
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
        console.log({message: error})
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
        // const foodId = req.params.foodId;

        ///==============================================
        const foodName = req.body.foodName;
        let foodImage = req.body.foodImage;
        if (foodImage.match("img/default")) foodImage = "";

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
        ///==============================================

        await instance.post(`/create`, foodInfo, {
            headers: {
                Cookie: `token=${req.session.token}` 
            }
        }).then(response => {
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
const getFoodInfoByFoodId = async (foodId, token) => {

    try {
        let res = await instance.get(`/info/${foodId}`,
        {
            headers: {
                Cookie: `token=${token}` 
            }
        }
        ).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            throw err;
        });
        return res;
    } catch (error) {
        console.log({message: error})
        return null;
    }
    
}

// [GET] /Foods/:foodId 
const getFoodByFoodId = async (req, res, next) => {
    const foodId = req.params.foodId;
    const responseData = await getFoodInfoByFoodId(foodId, req.session.token);
    res.send(responseData); 
}

// [GET] /Foods/info/:foodId 
// view info
const viewFoodInfoByFoodId = async (req, res, next) => {
    try {
        const foodId = req.params.foodId;
        const responseData = await getFoodInfoByFoodId(foodId, req.session.token);
        
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
        const responseData = await getFoodInfoByFoodId(foodId, req.session.token);

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
        if (foodImage.match("img/default")) foodImage = "";

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
        ///==============================================

        let responseData = await instance.put(`/update/${foodId}`, foodInfo,
        {
            headers: {
                Cookie: `token=${req.session.token}` 
            }
        }).then(response => {
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
        let responseData = await instance.delete(`/delete/${foodId}`,
        {
            headers: {
                Cookie: `token=${req.session.token}` 
            }
        }).then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
        });

        if (responseData.success){
            res.status(200).json(
                {
                    "success":true,
                    "notice": responseData.message,
                }
            );
        } else {
            res.status(404).json(
                {
                    "success":false,
                    "notice": responseData.message,
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