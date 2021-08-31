function searchFunction() {
  var input, filter, i, txtValue, table;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");

  rows = table.rows;

  for (i = 1; i < (rows.length); i++) {
    var rowDisplay = table.rows[i];
    console.log(rowDisplay);
    x = rows[i].getElementsByTagName("TD")[1];
    txtValue = x.textContent || x.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      rowDisplay.style.display = "";
    }
    else {
      rowDisplay.style.display = "none";
    }
  }
}

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

var editRow = null;
function productDisplay(ctl) {
  $("#productForm").show();
  editRow = $(ctl).parents("tr");
  var cols = editRow.children("td");

  $("#inputName").val($(cols[0]).text());
  $("#inputBrand").val($(cols[1]).text());
  if ($(cols[2]).text() == "Sữa rửa mặt") {
    $("#select").val("srm");
  }
  else {
    $("#select").val("2");
  }

  switch ($(cols[2]).text()) {
    default:
      $("#select").val("");
      break;

    case "Sữa rửa mặt":
      $("#select").val("srm");
      break;

  }

  // Change Update Button Text
  $("#updateButton").text("Cập nhật");
}
function productUpdate() {
  if ($("#updateButton").text() == "Cập nhật") {
    productUpdateInTable();
  }
  else {
    productAddToTable();
  }

  // Clear form 
  formClear();
}

function productUpdateInTable() {
  // Add changed user to table
  $(editRow).after(productBuildTableRow());

  // Remove original product
  $(editRow).remove();

  // Clear form fields
  formClear();

  // Change Update Button Text
  $("#updateButton").text("Lưu");
}

function productAddToTable() {
  // First check if a <tbody> tag exists, add one if not
  if ($("#myTable tbody").length == 0) {
    $("#myTable").append("<tbody></tbody>");
  }

  // Append product to table
  $("#myTable tbody").append(
    productBuildTableRow());
}

function productBuildTableRow() {
  var ret =
    "<tr>" +
    '<td scope="col">' +
    $('#inputName').val() + "</td>" +
    '<td scope="col">' +
    $('#inputBrand').val() + "</td>" +
    '<td scope="col">' +
    $('#select option:selected').text() + "</td>" +
    '<td scope="col">' +
    "Hình ảnh" + "</td>" +
    '<td scope="col" class="edit">' +
    '<i class="fas fa-edit" onclick="productDisplay(this)" style="cursor:pointer"></i>' + " " +
    '<i class="fas fa-trash-alt" onclick="productDelete(this)" style="cursor:pointer"></i>' +
    "</td>"
  "</tr>"

  return ret;
}

// function productDelete(ctl) {
//   $(ctl).parents("tr").remove();
// }

//Delete a product
function productDelete(obj, id) {
  //DELETE (add db)
  ajaxDel(obj, id);
  alert("Xóa thành công");
  $(obj).parents("tr").remove();
}

function ajaxDel(obj, id) {
  var formData = {
    userid: id
  }
  console.log(obj);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "/admin/products/delete/" + id,
    data: JSON.stringify(formData),
    dataType: "json",
    success: function () {
      // location.reload();
    },
    error: function (e) {
      console.log(e.status);
    }
  });
}
