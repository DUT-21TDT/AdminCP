class food{
    constructor(
        foodId, // string
        foodName, // string
        foodImage, // string
        latestUpdate = new Date().toLocaleString(), // string
        Energy = null, // float
        Carbohydrate = null, // float
        Lipid = null, // float
        Protein = null, // float
        Vitamins = null, // string
        Minerals = null, // string
    ){
        this.foodId = foodId;
        this.foodName = foodName;
        this.foodImage = foodImage;
        this.latestUpdate = latestUpdate;
        // nutrition
        this.Energy = Energy;
        this.Carbohydrate = Carbohydrate;
        this.Lipid = Lipid;
        this.Protein = Protein;
        this.Vitamins = Vitamins;
        this.Minerals = Minerals;
    }
}

module.exports = food;