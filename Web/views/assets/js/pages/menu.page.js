const addDeleteBtnEvent = function () {
    const menuId = $(this).val();
    let msg = `Bạn có muốn xóa thực đơn ${menuId} không!`;
    if (confirm(msg)) {
        $.ajax({
            url: `/AdminCP/Menu/delete/${menuId}`,
            type: "DELETE", // <- Change here
            contentType: "application/json",
            success: function (response) {
                if (response.success) {
                    alert(response.notice);
                    window.location = "/AdminCP/Menu";
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

const setMenuStatusBtnEvent = function () {
    const menuId = $(this).val();
    let msg = `Bạn có muốn thay đổi trạng thái công khai của thực đơn ${menuId} không!`;
    if (confirm(msg)) {
        $.ajax({
            url: `/AdminCP/Menu/set/public/${menuId}`,
            type: "PUT", // <- Change here
            contentType: "application/json",
            success: function (response) {
                if (response.success) {
                    alert(response.notice);
                    window.location = "/AdminCP/Menu";
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
        url: `/AdminCP/Menu/search?keyword=${keyword}`,
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

    $.each(res.data, (i, m) => { 
        let trHtml = `<tr>
                <td scope="row">${i + 1}</td>
                <td>${m.menuName}</td>`;
        
        if (m.isPublic) {
            trHtml += `<td style="text-align: center;"><span class="badge bg-success">Đã công khai</span></td>`;
        } else {
            trHtml += `<td><span class="badge bg-warning">Đang chờ kiểm duyệt</span></td>`;
        }

        trHtml += `<td style="text-align: center;">${m.latestUpdate}</td><td style="text-align: center;">`

        trHtml += `<button value="${m.menuId}" class="btn btn-secondary btn-sm btnPublic" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Thay đổi trạng thái công khai">`;

        if (!m.isPublic) {
            trHtml +=  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
          </svg>`;
        } else {
            trHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          </svg>`;
        }

        trHtml += `</button> 
        
        <a href="/AdminCP/Menu/edit/${m.menuId}" class="btn btn-success btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Chỉnh sửa thông tin thực đơn">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>

            </a>
            <a href="/AdminCP/Menu/info/${m.menuId}" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Xem thông tin thực đơn">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>

            </a>
            <button value="${m.menuId}" class="btn btn-danger btnDeleteMenu btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Xóa thực đơn">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>

            </button>
        </td></tr>
        `

        $("#trData").append(trHtml);
    });

    $(".btnDeleteMenu").click(addDeleteBtnEvent);
    $(".btnPublic").click(setMenuStatusBtnEvent);
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