$(document).ready(async ()=>{
    const accounts = await getRespondDataFormAPI("Accounts");
    $("#txtMemberCounter").text(accounts.data.length);
    const foods = await getRespondDataFormAPI("Foods");
    $("#txtFoodCounter").text(foods.data.length);
});