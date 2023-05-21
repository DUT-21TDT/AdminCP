$("#changeFoodImg").on("click",function (e){
    var fileDialog = $('<input type="file" name="Image" accept=".png,.jpg,.jpeg">');
    fileDialog.click();
    fileDialog.on("change", onFileSelected);
    return false;
});

var onFileSelected = async function(e){
    var formData = new FormData();
    formData.append('Image',$(this)[0].files[0]);
    var notice = document.getElementById("txtNotice");
    notice.innerText = "Đang tải ảnh, vui lòng đợi xíu nhaaa!";
    notice.style.color = "black";
    await $.ajax({
            url: `/AdminCP/upload`,
            type: "POST", // <- Change here
            data: formData,
            contentType: false,
            processData: false,
            success: (response) => {
                notice.innerText = response.notice;
                notice.style.color = "red";
                if (response.success){
                    document.getElementById("Image").src = response.data.link;
                    notice.style.color = "green";
                }
            },
            error: function (err) {
                notice.innerText = "Xảy ra lỗi khi thực hiện upload ảnh!";
                notice.style.color = "red";
                console.log(err);
            }
    });
};