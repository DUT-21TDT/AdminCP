const DataShow2Table = async (keyword="")=> {

    let res = await $.ajax({
            url: `/AdminCP/Accounts/search?keyword=${keyword}`,
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

    $.each(res.data, (i, account) => {
        let trHtml = `<tr>
                <td scope="row">${i + 1}</td>
                <td>${account.fullName}</td>
                <td>`;
        if (account.isBlocked){
            trHtml += '<span class="badge bg-danger">Đã dừng hoạt động</span>';
        } else {
            trHtml += '<span class="badge bg-success">Đang hoạt động</span>';
        }

        trHtml += `</td><td>${account.username}</td>
                    <td>${account.email}</td><td>`;

        
        if (account.isBlocked) {
            trHtml += `<button value="${account.username}" class="btn btn-secondary btnChangeLockStatus unlock" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Bỏ chặn tài khoản">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
 <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
</svg>
</button>`
        } else {
            trHtml += `<button value="${account.username}" class="btn btn-secondary btnChangeLockStatus lock" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Chặn tài khoản">
                        
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
</svg>
                </button>`
        }

        trHtml += `
                    <a href="/AdminCP/Accounts/info/${account.accountId}" class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Xem thông tin tài khoản">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg>

                        </a>
                    <button value="${account.username}" class="btn btn-danger btnDeleteAccount" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Xóa tài khoản">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>

                        </button>
        `

        trHtml += `</td></tr>`;
        $("#trData").append(trHtml);
    });

    $(".btnDeleteAccount").click(function () {
        const username = $(this).val();
        let msg = `Bạn có muốn xóa thành viên có username = [${username}] không!`;
        if (confirm(msg)) {
            $.ajax({
                url: `/AdminCP/Accounts/delete/${username}`,
                type: "DELETE", // <- Change here
                contentType: "application/json",
                success: function (response) {
                    if (response.success) {
                        alert(response.notice);
                        window.location = "";
                    }else {
                        alert("Có lỗi xảy ra!\n" + response.notice);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
    
    $(".btnChangeLockStatus").click(function () {
        const username = $(this).val();
        let msg = `Bạn có muốn chặn truy cập đối tượng có username = [${username}] không!`;
        if ($(this).hasClass("unlock")) 
            msg = `Bạn có muốn bỏ chặn truy cập đối tượng có username = [${username}] không!`;
    
        if (confirm(msg)) {
            $.ajax({
                url: `/AdminCP/Accounts/btnChangeLockStatus/${username}`,
                type: "PUT",
                contentType: "application/json",
                success: function (response) {
                    if (response.success) {
                        alert(response.notice);
                        window.location = "";
                    }else {
                        alert("Có lỗi xảy ra!\n" + response.notice);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
}

$("#trData").ready(()=> {
    DataShow2Table();
});

$("#txtSearch").keyup(()=> {
    let text = document.getElementById("txtSearch").value;
    DataShow2Table(text);
});