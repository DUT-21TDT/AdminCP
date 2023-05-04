let express = require('express');
let router = express.Router();

router.get("/", (req, res, next) => {


    // res.send(req.session.username);
    
    try {
        res.render("pages/test", {layout:"./layouts/test_layout"});
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;