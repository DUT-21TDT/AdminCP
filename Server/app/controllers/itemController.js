var express = require('express');
var router = express.Router();

const controllerName = 'item';
const MainModel = require(__path_models + controllerName);

let data = [
    new MainModel(1, "haha"),
    new MainModel(2, "hihi")   
]

router.get("/", (req, res, next) => {
    res.send(data);
});
router.get("/:id", (req, res, next) => {
    var id = req.params.id;
    var acctoken = req.body.acctoken;

    const item = data.find(
        (p) => (p.itemID) === parseInt(id)
    );

    if (!item) res.sendStatus(404);

    // console.log(item);

    res.send(item);
});


router.post("/add", (req, res,next) => {
    var itemID = req.body.itemID;
    var itemName = req.body.itemName;
    var token = req.body.token;
    data.push(new MainModel(itemID, itemName));
    res.send(data);
});

module.exports = router;