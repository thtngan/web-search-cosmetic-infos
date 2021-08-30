function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//Show infomation
//Show infomation
var editRow = null;
function display(ctl) {
    editRow = $(ctl).parents("tr");
    var currentRow = editRow.children("td");


    // console.log($(currentRow).text());
    var User_value = $.trim($(currentRow[0]).text());
    var Date_value = $(currentRow[1]).text().split(" ").join("");
    var Title_value = $.trim($(currentRow[2]).text());
    var Detail_value = $.trim($(currentRow[3]).text());
    var Number_value = $.trim($(currentRow[5]).text());
    var Mail_value = $.trim($(currentRow[6]).text());
    var Id_value = $.trim($(currentRow[7]).text());

    console.log(Id_value);


    // Set up modal-body
    $('.modal-body').empty(); // clear the body of any old content
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.innerHTML = "<b>Tên người dùng: </b>" + User_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Số điện thoại: </b>" + Number_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Email: </b>" + Mail_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Tiêu đề: </b>" + Title_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Chi tiết: </b>" + Detail_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Ngày gửi: </b>" + Date_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = '<div class="hideIdData" >' + Id_value + '</div>';
    ul.appendChild(li);

    $('.modal-body').append(ul);

    //Show
    $("#modal").modal('show');

    // myModal.show()
}


$("#btnDelete").click((e) => {
    // e.preventDefault();
    // console.log($('.hideIdData').text());
    const id = $('.hideIdData').text();
    var formData = {
        userid: id
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/admin/feeds/delete/" + id,
        data: JSON.stringify(formData),
        dataType: "json",
        success: function () {
            location.reload();

        },
        error: function (e) {
            console.log(e.status);
        }
    });

    alert("Xóa thành công");
    location.reload();

});
