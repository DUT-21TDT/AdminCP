let express = require('express');
let router = express.Router();

const {renderAccountsPageView, getAccountsWithKeyword, renderAccountInfo, changeBlockStatus, deleteAccountByUsername} = require(`${__path_controllers}/AdminCP/account.controller.js`);

const auth = require(`${__path_middleware}/auth`);

router.get("/", auth, renderAccountsPageView);

router.get("/search", auth, getAccountsWithKeyword);

router.get("/info/:id", auth, renderAccountInfo);

router.put("/btnChangeLockStatus/:username", changeBlockStatus);

router.delete("/delete/:username", auth, deleteAccountByUsername);

module.exports = router;