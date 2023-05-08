const axios = require('axios');

const controllerName = "menu";

// API calling
const instance = axios.create({baseURL: `${process.env.API_URL}/${controllerName}`});

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

        let responseData = await instance.get("/").then(response => {
            return response.data;
        }).catch((err) => {
            console.log({message: err});
            throw err;
        });

        if (responseData.success) {
            
            let ListMenu = [];

            responseData.data.forEach(e => {
                if (e.menuName.toLowerCase().includes(keyword)) 
                {
                    ListMenu.push(e);
                }
            });

            res.status(200).json({
                "success":true,
                "data":ListMenu,
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
const addMenu2Database = (req, res, next) => {
    
}

// [FUNCTION]
async function getMenuByMenuId(menuId){
    let res = await instance.get(`/info/${menuId}`).then(response => {
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

        let responseData = await getMenuByMenuId(menuId);

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
        res.status(500).sendFile(__path_views + '/statics/500.html');
    }
}

// edit
const renderEditMenuPage = (req, res, next) => {

}

const updateMenu = (req, res, next) => {
    
}

// change menu public status
// [PUT] /set/public/:menuId
const setPublicStatus = async (req, res, next) => {
    const menuId = req.params.menuId;
    console.log(menuId);
    try {
        let responseData = await instance.put(`/set/public/${menuId}`).then(response => {
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

// delete
// [DELETE] /Menu/delete/:menuId
const deleteMenuByMenuId = async (req, res, next) => {

    const menuId = req.params.menuId;

    try {
        let responseData = await instance.delete(`/delete/${menuId}`).then(response => {
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
    renderMenuPageView,
    getMenuWithKeyword,

    renderAddMenuPage,
    addMenu2Database,

    viewMenuInfo,

    renderEditMenuPage,
    updateMenu,

    setPublicStatus,
    
    deleteMenuByMenuId,
}