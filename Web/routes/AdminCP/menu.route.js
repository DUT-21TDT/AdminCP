let express = require('express');
let router = express.Router();

const auth = require(`${__path_middleware}/auth`);

const {
    renderMenuPageView,
    getMenuWithKeyword,

    renderAddMenuPage,
    addMenu,

    viewMenuInfo,

    renderEditMenuPage,
    updateMenu,

    setPublicStatus,
    
    deleteMenuByMenuId,} = require(`${__path_controllers}/AdminCP/menu.controller.js`);

router.get("/", auth, renderMenuPageView);
router.get("/search", auth, getMenuWithKeyword);

// add
router.get("/add", auth, renderAddMenuPage);
router.post("/add", auth, addMenu);

// view info
router.get("/info/:menuId", auth, viewMenuInfo);

// edit
router.get("/edit/:menuId", auth, renderEditMenuPage);
router.put("/update/:menuId", auth, updateMenu);

// set public status
router.put("/set/public/:menuId", auth, setPublicStatus);

// delete
router.delete("/delete/:menuId", auth, deleteMenuByMenuId);

module.exports = router;