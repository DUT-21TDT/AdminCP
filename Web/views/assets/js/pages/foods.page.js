const addDeleteBtnEvent = function () {
    const foodId = $(this).val();
    let msg = `Bạn có muốn xóa thông tin thực phẩm có foodId = [${foodId}] không!`;
    if (confirm(msg)) {
        $.ajax({
            url: `/AdminCP/Foods/delete/${foodId}`,
            type: "DELETE", // <- Change here
            contentType: "application/json",
            success: function (response) {
                if (response.success) {
                    alert(response.notice);
                    window.location = "/AdminCP/Foods";
                }else {
                    alert("Có lỗi xảy ra!\n" + response.notice);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
}



const DataShow2Table = async (keyword="")=> {
    let res = await $.ajax({
        url: `/AdminCP/Foods/search?keyword=${keyword}`,
        type: "GET", // <- Change here
        contentType: "application/json",
        success: (response) => {
            if (response.success) {
                return response.data;
            }else {
                alert("Có lỗi xảy ra!\n" + response.notice);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });

    $("#trData").empty();

    $.each(res.data, (i, food) => { 
        let trHtml = `<tr>
                <td scope="row">${i + 1}</td>
                <td>${food.foodName}</td>
                <td>${food.lastUpdate}</td>`;
        
        trHtml += `
        <td style="text-align: center;">
            <a href="/AdminCP/Foods/edit/${food.foodId}" class="btn btn-success btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Chỉnh sửa thông tin thực phẩm">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>

            </a>
            <a href="/AdminCP/Foods/info/${food.foodId}" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Xem thông tin thực phẩm">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>

            </a>
            <button value="${food.foodId}" class="btn btn-danger btn-sm btnDeleteFood" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Xóa thực phẩm">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>

            </button>
        </td></tr>
        `

        $("#trData").append(trHtml);
    });

    $(".btnDeleteFood").click(addDeleteBtnEvent);
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

$("#trData").ready(
    DataShow2Table()
);

$("#txtSearch").keyup(
    delay(()=> {
        let text = document.getElementById("txtSearch").value;
        text = text.toLowerCase();
        DataShow2Table(text);
    }, 10)
);