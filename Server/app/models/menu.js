class menu{
    constructor(
        menuId, // string
        menuName, // string
        menuImage,
        foods, // list
        creator, // string
        isPublic = false, // boolean
        latestUpdate = new Date().toLocaleString(),
    ){
        this.menuId = menuId;
        this.menuName = menuName;
        this.menuImage = menuImage;
        this.foods = foods;
        this.creator = creator;
        this.latestUpdate = latestUpdate;
        this.isPublic = isPublic;
    }
};

module.exports = menu;