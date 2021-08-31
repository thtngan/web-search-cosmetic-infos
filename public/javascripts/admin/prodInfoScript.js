$(document).ready(function () {
    // console.log(window.location.href.split("/")[5]);
    var id = window.location.href.split("/")[5];

    var formData = {
        prodId: id.split("#")[0]
    }
    $.ajax({
        type: "POST",
        url: '/admin/products/post',
        contentType: "application/json",
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            displayProduct(data.prod[0]);
        },
        error: function (e) {
            console.log(e.status);
        }

    });

    // $("#name").val("Hello");
});

function displayProduct(item) {
    $("#name").val(item.Name);
    $("#brand").val(item.Brand);

    switch (item.Type) {
        case "Sữa rửa mặt":
            $("#select").val("srm");
            break;
        case "Nước tẩy trang":
            $("#select").val("ntt");
            break;
        case "Dầu tẩy trang":
            $("#select").val("dtt");
            break;
        case "Nước hoa hồng":
            $("#select").val("toner");
            break;
        case "Sữa dưỡng":
            $("#select").val("lotion");
            break;
        case "Essence":
            $("#select").val("es");
            break;
        case "Ampoule":
            $("#select").val("amp");
            break;
        case "Kem chống nắng":
            $("#select").val("kcn");
            break;
        case "Xịt chống nắng":
            $("#select").val("xcn");
            break;
        case "Xịt khoáng":
            $("#select").val("xk");
            break;
        default:
            $("#select").val("");
            break;

    }

    $("#volume").val(item.Volume);
    $("#description").val(item.Description);


}

