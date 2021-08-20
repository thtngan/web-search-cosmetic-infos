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
            shouldSwitch= true;
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
        switchcount ++;      
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
}

function searchFunction() {
    var input, filter, ul, li, a, i, txtValue, table;
    input = document.getElementById("myInput");
    filter = input.value.toLowerCase();
    table = document.getElementById("myTable");

    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
        x = rows[i].getElementsByTagName("TD")[n];
        if (x.innerHTML.toLowerCase().indexOf(filter) > -1) {
            
        }
    }

}

function togglePassword(el){
 
    // Checked State
    var checked = el.checked;
  
    if(checked){
     // Changing type attribute
     document.getElementById("password").type = 'text';
  
     // Change the Text
     document.getElementById("toggleText").textContent= "Ẩn";
    }else{
     // Changing type attribute
     document.getElementById("password").type = 'password';
  
     // Change the Text
     document.getElementById("toggleText").textContent= "Hiện";
    }
}

var editRow = null;
function userDisplay(ctl) {
    $("#userForm").show();
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");


    $("#number").val(parseInt($(cols[0]).text()));
    $("#inputName").val($(cols[1]).text());
    $("#inputAccount").val($(cols[2]).text());
    $("#password").val($(cols[3]).text());
    
    if ($(cols[4]).text() == "Quản trị viên"){
        $("#select").val("1");
    }
    else{
        $("#select").val("2");
    }

    // Change Update Button Text
    $("#updateButton").text("Cập nhật");
  }

function userUpdate() {
    if ($("#updateButton").text() == "Cập nhật") {
      userUpdateInTable();
    }
    else {
      userAddToTable();
    }

    // Clear form 
    formClear();
}

function userUpdateInTable() {
    // Add changed user to table
    $(editRow).after(userBuildTableRow());

    // Remove original product
    $(editRow).remove();

    // Clear form fields
    formClear();

    // Change Update Button Text
    $("#updateButton").text("Lưu");
  }

function userAddToTable() {
    // First check if a <tbody> tag exists, add one if not
    if ($("#myTable tbody").length == 0) {
      $("#myTable").append("<tbody></tbody>");
    }

    // Append product to table
    $("#myTable tbody").append(
      userBuildTableRow());
  }

  function userBuildTableRow() {
    var ret =
    "<tr>" +
        '<td scope="col" class="edit">' +
            $('#number').val() + "</td>" +
        '<td scope="col">' +
            $('#inputName').val() + "</td>" +
        '<td scope="col">' +
            $('#inputAccount').val() + "</td>" +
        '<td scope="col" id="pwd">' +
            $('#password').val() + "</td>" +
        '<td scope="col">' +
            $('#select option:selected').text() + "</td>" +
        '<td scope="col" class="edit">' +
            '<i class="fas fa-edit" onclick="userDisplay(this)" style="cursor:pointer></i>' + " " +
            '<i class="fas fa-trash-alt" onclick="userDelete(this) style="cursor:pointer"></i>' + 
        "</td>"
    "</tr>"

    return ret;
  }

  function userDelete(ctl) {
    $(ctl).parents("tr").remove();
  }

function formClear() {
    $("#inputName").val("");
    $("#inputAccount").val("");
    $("#number").val("");
    $("#password").val("");
    $("#select").val("");
    
}


