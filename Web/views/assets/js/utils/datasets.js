// pagination
function paginate (arr, size) {
    return arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size)
      let page = acc[idx] || (acc[idx] = [])
      page.push(val)
  
      return acc
    }, [])
  }


// Implementation in ES6
function pagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}

const paginationView = (curr_page, data, page_size = 10) => {
    if (curr_page < 1) {
        alert("Dữ liệu không hợp lệ");
        return;
    }
    DataShow2Table(data[curr_page - 1], curr_page, page_size);
    const pages_threshold = 2;
    const pages = pagination(curr_page, data.length); // page 1 activate
    // ....................
    const paginationControl = $("#pagination");
    paginationControl.empty();

    if (pages.length >= pages_threshold){
        pages.forEach(p => {
            if (p === "...") {
                paginationControl.append(` <span>${p}</span> `);
            } if (p == curr_page) {
                paginationControl.append(` <button class="btn btn-success pgBtn" name="${p}" disabled>${p}</button> `);
            } else {
                paginationControl.append(` <button id="${p}" value=${p} name="${p}" class="btn btn-success pgBtn" >${p}</button> `);
            }
        });
    }

    $(".pgBtn").click((e) => {
        const page_number = $(e.target).val();
        paginationView(page_number, data);
    });
}
  
// get data
async function getRespondDataFormAPI(controllerName="Foods",keyword = ""){
    let res = await $.ajax({
        url: `/AdminCP/${controllerName}/search?keyword=${keyword}`,
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
    return res;
}
async function getData(controllerName="Foods",keyword = "", page_size = 10){
    const res = await getRespondDataFormAPI(controllerName, keyword);
    return paginate(res.data, page_size);
}
