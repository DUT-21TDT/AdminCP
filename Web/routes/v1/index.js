var express = require('express');
var router = express.Router();

router.use('/login', require(`${__path_routes}/v1/login.route.js`));
router.use('/logout', require(`${__path_routes}/v1/logout.route.js`));
router.use('/', require(`${__path_routes}/v1/default.route.js`));
router.use('/Accounts', require(`${__path_routes}/v1/accounts.route.js`));
// router.use('/Foods', require(`${__path_routes}/v1/foods.route.js`));
// router.use('/Menu', require(`${__path_routes}/v1/menu.route.js`));

module.exports = router;