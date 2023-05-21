$(document).ready(async ()=>{
    const getCounterNumber = async () => {
        const accounts =  getRespondDataFormAPI("Accounts");
        const foods =  getRespondDataFormAPI("Foods");
        const menus =  getRespondDataFormAPI("Menus");
        const arr = await Promise.all([accounts, foods, menus]);
        return arr;
    }

    const [accounts, foods, menus] = await getCounterNumber();

    $("#txtMemberCounter").text(accounts.data.length);
    $("#txtFoodCounter").text(foods.data.length);
    $("#txtMenuCounter").text(menus.data.length);
});