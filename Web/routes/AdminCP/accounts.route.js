let express = require('express');
let router = express.Router();

const {getAccounts, getAccountInfoByID, changeBlockStatus, deleteAccountByUsername} = require(`${__path_controllers}/AdminCP/account.controller.js`);

const auth = require(`${__path_middleware}/auth`);

router.get("/", auth, getAccounts);

router.get("/info/:id", auth, getAccountInfoByID);

router.put("/btnChangeLockStatus/:username", changeBlockStatus);

router.delete("/delete/:username", auth, deleteAccountByUsername);

module.exports = router;