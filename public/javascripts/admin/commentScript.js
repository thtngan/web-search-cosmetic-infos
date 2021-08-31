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

function searchFunction() {
    var input, filter, i, txtValue, table;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");

    rows = table.rows;

    for (i = 1; i < (rows.length); i++) {
        var rowDisplay = table.rows[i];
        console.log(rowDisplay);
        x = rows[i].getElementsByTagName("TD")[0];
        txtValue = x.textContent || x.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            rowDisplay.style.display = "";
        }
        else {
            rowDisplay.style.display = "none";
        }
    }

}

//Show infomation
var currentRow = null;
function display(ctl) {
    currentRow = $(ctl).parents("tr");
    console.log(currentRow.find("td:eq(3)"));
    var Product_value = $.trim(currentRow.find("td:eq(0)").text());
    var Name_value = $.trim(currentRow.find("td:eq(1)").text());
    var Mail_value = $.trim(currentRow.find("td:eq(5)").text());
    var Rating_value = $.trim(currentRow.find("td:eq(8)").text());
    var Detail_value = $.trim(currentRow.find("td:eq(2)").text());
    // var Date_value = $.trim(currentRow.find("td:eq(6)").text());
    var Date_value = currentRow.find("td:eq(6)").text().split(" ").join("");
    var Time_value = currentRow.find("td:eq(7)").text().split(" ").join("");
    var Id_value = $.trim(currentRow.find("td:eq(9)").text());

    // Set up modal-body
    $('.modal-body').empty(); // clear the body of any old content
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.innerHTML = "<b>Tên sản phẩm: </b>" + Product_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Tên người dùng: </b>" + Name_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Email: </b>" + Mail_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Xếp hạng: </b>" + Rating_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Bình luận: </b>" + Detail_value;
    ul.appendChild(li);
    var li = document.createElement('li');
    li.innerHTML = "<b>Ngày giờ tạo: </b>" + Date_value + " - " + Time_value;
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
    const id = $('.hideIdData').text();
    var formData = {
        userid: id
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/admin/comments/delete/" + id,
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
