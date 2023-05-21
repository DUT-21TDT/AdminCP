
async function getFoodInfoByFoodId(foodId) {
    let res = await $.get(`/AdminCP/Foods/get/${foodId}`).done((response)=> {
        // console.log(response);
        if (response.success){
            return response.data;
        } else {
            return null;
        }
    }).fail((err) =>{
        console.log(err);
    })

    return res;
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

function uniqueString(text){
    var li = removeDuplicates(text.replace(", ", ",").split(","));
    let res = "";
    for (const element of li) {
        res += `${element},`;
    }
    return res;
}

function printListString(text){
    
    return text.slice(0, -1);
}

function updateTotalNutritionValue(dataFood, amount){

    // nutrition
    curValue.Energy += text2float(dataFood.energy) * amount;
    curValue.Carbohydrate += text2float(dataFood.carbohydrate) * amount;
    curValue.Lipid += text2float(dataFood.lipid) * amount;
    curValue.Protein += text2float(dataFood.protein) * amount;
    curValue.Vitamins = uniqueString(curValue.Vitamins + dataFood.vitamins);
    curValue.Minerals = uniqueString(curValue.Minerals + dataFood.minerals);

    // update nutrition value
    $("#txtEnergy").text(`${curValue.Energy.toFixed(2)} Calo`);
    $("#txtCarbohydrate").text(`${curValue.Carbohydrate.toFixed(2)} g`);
    $("#txtLipid").text(`${curValue.Lipid.toFixed(2)} g`);
    $("#txtProtein").text(`${curValue.Protein.toFixed(2)} g`);
    $("#txtVitamins").text(`${printListString(curValue.Vitamins)}`);
    $("#txtMinerals").text(`${printListString(curValue.Minerals)}`);

    // console.log(Energy, Carbohydrate, Lipid, Protein, Vitamins, Minerals);

}