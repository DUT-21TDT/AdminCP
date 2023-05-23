const axios = require('axios');

const controllerName = "menus";

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/admin-access/${controllerName}`});

// [GET] /Menu/
const renderMenuPageView = (req, res, next) => {
    res.render("pages/menu", {
        title: "Quản lý thực đơn",
        name: controllerName,
    });
}

// [GET] /Menu/search?keyword
const getMenuWithKeyword = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;

        let responseData = await instance.get("/all", {
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
            let menus = [];
            
            responseData.data.list.forEach(e => {
                if (e.menuname.toLowerCase().includes(keyword.toLowerCase())) 
                {
                    menus.push(e);
                }
            });

            res.status(200).json({
                "success":true,
                "data":menus,
            });

        } else {
            res.status(404).json({
                "success":false,
                "message": "empty",
                "data":[],
            });
        }
        
    } catch (error) {
        res.status(500);
    }
}

// add
// [GET] /Menu/Add
const renderAddMenuPage = (req, res, next) => {
    res.render("pages/component/menu/form", {
        title: "Thêm thực đơn mới",
        name: controllerName,
        menu: null,
    });
}

// [POST] /Menu/Add
const addMenu = async (req, res, next) => {
    try {
        const menuName = req.body.menuName;
        let menuImage = req.body.menuImage;
        if (menuImage.match("img/default")) menuImage = "";
        const foodIds = req.body.foodIds;

        let foodsList = [];

        foodIds.forEach(e => {
            foodsList.push({"foodid":e.foodId, "amount": e.amount});
        });
        
        const menuInfo = {
            "menuName": menuName,
            "menuImage": menuImage,
            "foodsList": foodsList
        }

        await instance.post(`/create`, menuInfo, {
            headers: {
                Cookie: `token=${req.session.token}` 
            }
        }).then(response => {
            res.send(response.data);
        }).catch((err) => {
            console.log({message: err.message});
            res.status(500).sendFile(__path_views + '/statics/500.html');
        });

    } catch (err){
        console.log(err);
        res.status(500).sendFile(__path_views + '/statics/500.html');
    }
}

// [FUNCTION]
async function getMenuByMenuId(menuId, token){
    let res = await instance.get(`/menuid=${menuId}`, {
        headers: {
            Cookie: `token=${token}` 
        }
    }).then(response => {
        return response.data;
    }).catch((err) => {
        console.log({message: err});
        return null;
    });
    
    return res;
}

// view info 
// [GET] /Menu/info/:menuId
const viewMenuInfo = async (req, res, next) => {
    try {
        const menuId = req.params.menuId;
        console.log(menuId);
        let responseData = await getMenuByMenuId(menuId, req.session.token);

        

        if (responseData.success) {
            let menuInfo = responseData.data;
            res.render("pages/component/menu/info", {
                title: `Xem thực đơn: ${menuId}`,
                name: controllerName,
                menu: menuInfo,
            });

        } else {
            res.status(404).sendFile(__path_views + '/statics/404.html');
        }
        
    } catch (error) {
        // console.log({message:error.message});
        res.status(500).sendFile(__path_views + '/statics/500.html');
    }
}

// edit
const renderEditMenuPage = async (req, res, next) => {
    try {
        const menuId = req.params.menuId;
        const responseData = await getMenuByMenuId(menuId, req.session.token);
        console.log(responseData);

        if (responseData.success) {
            let m = responseData.data;
            let foodsList = [];
            m.foods.list.forEach(e => {
                foodsList.push({"foodid":e.foodid, "amount":e.amount});
            });
            let menu =  {
                "menuId": m.menuid,
                "menuName": m.menuname,
                "menuImage": m.menuImage,
                "foodsList": foodsList,
            }
            res.render("pages/component/menu/form", {
                title: `Chỉnh sửa thông tin thực phẩm: ${menuId}`,
                name: controllerName,
                menu: menu,
            });

        } else {
            res.status(404).sendFile(__path_views + '/statics/404.html');
        }
        
    } catch (error) {
        console.log({message: error.message});
        res.status(500).sendFile(__path_views + '/statics/500.html');
    }
}

const updateMenu = async (req, res, next) => {

    try {
        const menuId = req.params.menuId;
        
        ///=======================
        const menuName = req.body.menuName;
        let menuImage = req.body.menuImage;

        if (menuImage.includes("img/default")) menuImage = "";
        const foodIds = req.body.foodIds;
        
        let foodsList = [];

        foodIds.forEach(e => {
            foodsList.push({"foodid":e.foodId, "amount": e.amount});
        });

        const menuInfo = {
            "menuName": menuName,
            "menuImage": menuImage,
            "foodsList": foodsList
        }

        console.log(menuInfo);

        ///====================================
        let responseData = await instance.put(`/menuid=${menuId}/update`, menuInfo, {
            headers: {
                Cookie: `token=${req.session.token}` 
            }
        }).then(response => {
            res.send(response.data);
        }).catch((err) => {
            console.log({message: err.message});
            return {
                "success": false,
            }
        });

    } catch (err){
        console.log(err);
        res.status(500).sendFile(__path_views + '/statics/500.html');
    }
}

// change menu public status
// [PUT] /set/public/:menuId
const setPublicStatus = async (req, res, next) => {
    const menuId = req.params.menuId;
    console.log(menuId);
    try {
        let responseData = await instance.put(`/menuid=${menuId}/approve`, {}, {
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
                    "message": responseData.message,
                }
            );
        } else {
            res.status(404).json(
                {
                    "success":false,
                    "message": responseData.message,
                }
            );
        }
    } catch (error) {
        res.status(500);
    }
}

// delete
// [DELETE] /Menu/delete/:menuId
const deleteMenuByMenuId = async (req, res, next) => {
    const menuId = req.params.menuId;

    try {
        let responseData = await instance.delete(`/menuid=${menuId}/delete/`, {
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
                    "message": responseData.message,
                }
            );
        } else {
            res.status(404).json(
                {
                    "success":false,
                    "message": responseData.message,
                }
            );
        }
    } catch (error) {
        res.status(500);
    }
}   

module.exports = {
    renderMenuPageView,
    getMenuWithKeyword,

    renderAddMenuPage,
    addMenu,

    viewMenuInfo,

    renderEditMenuPage,
    updateMenu,

    setPublicStatus,
    
    deleteMenuByMenuId,
}