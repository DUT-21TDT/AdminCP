$(document).ready(async ()=>{
    const getCounterNumber = async () => {
        const accounts =  getRespondDataFormAPI("Accounts");
        const foods =  getRespondDataFormAPI("Foods");
        const arr = await Promise.all([accounts, foods]);
        return arr;
    }

    const [accounts, foods] = await getCounterNumber();

    $("#txtMemberCounter").text(accounts.data.length);
    $("#txtFoodCounter").text(foods.data.length);
});