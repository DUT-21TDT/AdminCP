var express = require('express');
var router = express.Router();

const routerName = "AdminCP";

router.use('/login', require(`${__path_routes}/${routerName}/login.route.js`));
router.use('/logout', require(`${__path_routes}/${routerName}/logout.route.js`));
router.use('/', require(`${__path_routes}/${routerName}/default.route.js`));
router.use('/Accounts', require(`${__path_routes}/${routerName}/accounts.route.js`));
router.use('/Foods', require(`${__path_routes}/${routerName}/foods.route.js`));

// router.use('/Menu', require(`${__path_routes}/${routerName}/menu.route.js`));

module.exports = router;