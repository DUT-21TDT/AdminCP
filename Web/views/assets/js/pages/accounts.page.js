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