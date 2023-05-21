const DataShow2Table = (data, curr_page, page_size = 5)=> {
    $("#trData").empty();
    $.each(data, (i, food) => {
        // tiền xử lý dữ liệu

        $.each(food, (key, value)=>{ food[key] = (!value)? "": value; });

        let trHtml = `<tr>
                <td scope="row">${(curr_page - 1) * page_size + (i + 1)}</td>
                <td>${food.foodname}</td>
                <td>${food.energy}</td>
                <td>${food.carbohydrate}</td>
                <td>${food.lipid}</td>
                <td>${food.protein}</td>
                <td>${food.vitamins}</td>
                <td>${food.minerals}</td>
                `
            trHtml += `<td><center><button value="${food.foodid}" class = "btn btn-success addFoodToMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
              </svg> Thêm </button></center></td>`
                
            trHtml +=`
                </tr>
                `
        $("#trData").append(trHtml);
    });
    $(".addFoodToMenu").click(addFoodToMenu);
};

const controllerName = "Foods";
let data;

$("#trData").ready(async () => {
        data = await getData(controllerName, "", page_size);
        paginationView(1, data);
    }
);

let typingTimer;
const page_size = 5;
const doneTypingInterval = 100;  //time in ms (5 seconds)
let $input = $("#txtSearch");

//on keyup, start the countdown
$("#txtSearch").keyup(function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
        let text = document.getElementById("txtSearch").value;
        data = await getData(controllerName, text, page_size);
        paginationView(1, data, page_size);
    }, doneTypingInterval);
});

//on keydown, clear the countdown 
$("#txtSearch").keydown(function () {
  clearTimeout(typingTimer);
});

let curValue = {
    "Energy":0,
    "Carbohydrate":0,
    "Lipid":0,
    "Protein":0,
    "Vitamins":"",
    "Minerals":"",
}

const searchFoodInfoById = async (foodId) =>{
    
    if (!data) {
        data = await getData(controllerName, "", page_size);
    }
    

    for (let i = 0; i < data.length; i++) {
        for(let j = 0;j<data[i].length;j++){
            if (data[i][j].foodid.toString() === foodId.toString()){
                let food = data[i][j];
                $.each(food, (key, value)=>{ food[key] = (!value)? "": value; });
                return food;
            }
        }
    }
    return null;
}

const addFoodId2List = (foodId) => {
    let isFound = false;
    for (const element of foodIds) {
        const e = element;
        if (e.foodId == foodId) {
            element.amount += 1;
            isFound = true;
            break;
        }
    }
    if (!isFound) foodIds.push({"foodId": foodId, "amount":1});
}

const removeFoodIdInFoodList = (foodId) => {
    for (const element of foodIds) {
        const e = element;
        if (e.foodId == foodId) {
            element.amount -= 1;
            
            if (element.amount == 0) {
                let idx = foodIds.indexOf(element);
                foodIds.splice(idx, 1);
            }
            break;
        }
    }
}

const loadDataFood = async () => {
    $("#dataFood").empty();
    for (const element of foodIds) {
        const {foodId, amount} = element;
        const food = await searchFoodInfoById(foodId);
        // render to HTML
        if (food) {
            const trHTML = `<tr>
                            <td  class ="w-100">[${food.foodid}] <a href="#" style="color:black;">${food.foodname}</a></td>
                            <td style="text-align: center;" >${amount}</td>
                            <td><button value="${food.foodid}" class="btn btn-danger btn-sm removeFoodIdInFoodList"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-minus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                          </svg></button></td>
                        </tr>`;
            $("#dataFood").append(trHTML);
            updateTotalNutritionValue(food, amount);
        }
    }

    $(".removeFoodIdInFoodList").click(removeFood);
} 

const addFoodToMenu = function () {
    const foodId = $(this).val();
    addFoodId2List(foodId);
    loadDataFood();
}

const removeFood = function () {
    const foodId = $(this).val();
    removeFoodIdInFoodList(foodId);
    loadDataFood();
}