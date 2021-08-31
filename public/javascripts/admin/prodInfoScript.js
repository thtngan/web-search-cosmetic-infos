// $("#main").addClass("disabledbutton");

$('#main :input').attr('disabled', true);
$('#btnAfter').hide();

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

    //Auto disable input
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
    $("#ingredient").val(item.Ingredients);
    $("#contraindication").val(item.Contraindications);
    //Web 1
    $("#nameWeb1").val(item.Web1.name);
    $("#link1").val(item.Web1.url);
    //Web 2
    $("#nameWeb2").val(item.Web2.name);
    $("#link2").val(item.Web2.url);
    //Web 3
    $("#nameWeb3").val(item.Web3.name);
    $("#link3").val(item.Web3.url);
}

//Edit button 
$("#btnEdit").click(() => {
    $('#main :input').attr('disabled', false);
    $('#btnAfter').show();
    $('#btnEdit').hide();

})

//Update data
// $("#btnSave").click(() => {
//     ajaxUpdate();

// })

function ajaxUpdate() {
    //Prepare form data:
    var type;
    switch ($("#select").val()) {
        case "srm":
            type = "Sữa rửa mặt";
            break;
        case "Nước tẩy trang":
            break;
        case "dtt":
            type = "Dầu tẩy trang";
            break;
        case "toner":
            type = "Nước hoa hồng";
            break;
        case "lotion":
            type = "Sữa dưỡng"
            break;
        case "es":
            type = "Essence"
            break;
        case "amp":
            type = "Ampoule"
            break;
        case "kcn":
            type = "Kem chống nắng"
            break;
        case "xcn":
            type = "Xịt chống nắng"
            break;
        case "xk":
            type = "Xịt khoáng"
            break;
        default:
            type = "";
            break;
    }

    var id = window.location.href.split("/")[5];
    var formData = {
        _id: id.split("#")[0],
        Name: $("#name").val(),
        Type: type,
        Img: $("#inputGroupFile04").val(),
        Brand: $("#brand").val(),
        Volume: $("#volume").val(),
        Description: $("#description").val(),
        Ingredients: $("#ingredient").val(),
        Contraindications: $("#contraindication").val(),
        //Web 1
        Web1_name: $("#nameWeb1").val(),
        Web1_link: $("#link1").val(),
        //Web 2
        Web2_name: $("#nameWeb2").val(),
        Web2_link: $("#link2").val(),
        //Web 3
        Web3_name: $("#nameWeb3").val(),
        Web3_link: $("#link3").val()
    }

    console.log(formData);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url:'/admin/products/update',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function () {
            console.log("done")
            // location.reload();
            // alert(result.msg);
        },
        error: function (e) {
            console.log(e.status);
        }
    });
}




