//Get data from server
var records = [];
var flagType = [];
var flagSkin = [];
var flagLabel = [];

$.ajax({
  url: "/search/autocompleteSearch",
  dataType: "json",
  type: "GET",

  success: function (data) {
    records = data;
    console.log(records);
    if (records[0].label == "Không tìm thấy sản phẩm")
      document.getElementById('numberResult').innerHTML = 0 + " kết quả";
    else
      document.getElementById('numberResult').innerHTML = data.length + " kết quả";
    generateLi();
  },
  err: function (err) {
    console.log(err.status);
  }
});

function generateLi() {
  var ul = document.getElementById("containerItem");
  var i = 0;
  records.forEach((item) => {
    // console.log(item);
    flagType[i] = 1;
    flagSkin[i] = 1;
    flagLabel[i] = 1;
    i++;
    var li = document.createElement('li');
    if (item.skin == null) {
      li.innerHTML = '<h4><b>' + item.label + '</b></h4>';

    }
    else {
      var buffer = item.pictureData.toString('base64')

      li.innerHTML = '<div class="list_item_container"><a class="linkSearch" href="/info/'
        + item.label + '"><div class="imageSearch"><img src="data:image/png;base64,'
        + buffer + '" alt="product images" class="img-fluid"in></div><div class="skinSearch">'
        + item.skin + '</div><div class="typeSearch">'
        + item.type + '</div><div class="labelSearch"><h4><b>'
        + item.label + '</b></h4></div></a></div>';
    }
    ul.appendChild(li);
  })
  // console.log(flagType);
  // console.log(flagSkin);
}


// $('#ui-id-1').bind('DOMSubtreeModified', function () {
//   $('#containerItem').html($('#ui-id-1').html());
// });


//Filter script: SKIN
$('input[type=radio][name=btnradio]').on('change', function () {
  const ul = document.querySelectorAll("#containerItem li .linkSearch");
  // console.log(ul[0]);
  switch ($(this).val()) {
    case 'btnradio0':
      //alert("Mọi loại da");
      $("#containerItem li").hide();
      const ul0 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength0 = 0;
      for (let i = 0; i < ul0.length; i++) {
        if (flagType[i] == 1 && flagLabel[i] == 1) {
          $(`#containerItem li:nth-child(${i + 1})`).show();
          flagSkin[i] = 1; numberLength0++;
        }
      }
      console.log(flagType);
      console.log(flagSkin);

      document.getElementById('numberResult').innerHTML = numberLength0 + " kết quả";
      break;
    case 'btnradio1':
      $("#containerItem li").hide();
      const ul1 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength1 = 0;
      for (let i = 0; i <= ul1.length - 1; i++) {
        if (ul1[i].textContent == "Da dầu") {
          flagSkin[i] = 1; //show
          if (flagType[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength1++;
          }
        }
        else {
          flagSkin[i] = 0 //hide
        }
      }
      console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength1 + " kết quả";
      break;
    case 'btnradio2':
      //alert("Da khô");
      $("#containerItem li").hide();
      const ul2 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength2 = 0;
      for (let i = 0; i <= ul2.length - 1; i++) {
        if (ul2[i].textContent == "Da khô") {
          flagSkin[i] = 1;
          if (flagType[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength2++;
          }

        } else {
          flagSkin[i] = 0 //hide
        }
      }
      console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength2 + " kết quả";
      break;
    case 'btnradio3':
      //alert("Da mụn");
      $("#containerItem li").hide();
      const ul3 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength3 = 0;
      for (let i = 0; i <= ul3.length - 1; i++) {
        if (ul3[i].textContent == "Da mụn") {
          flagSkin[i] = 1;
          if (flagType[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength3++;
          }
        } else {
          flagSkin[i] = 0 //hide
        }
      }
      console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength3 + " kết quả";
      break;
    case 'btnradio4':
      //alert("Da nhạy cảm");
      $("#containerItem li").hide();
      const ul4 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength4 = 0;
      for (let i = 0; i <= ul4.length - 1; i++) {
        if (ul4[i].textContent == "Da nhạy cảm") {
          flagSkin[i] = 1;
          if (flagType[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength4++;
          }
        } else {
          flagSkin[i] = 0 //hide
        }
      }
      console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength4 + " kết quả";
      break;
  }
});

//Filter script: TYPE
$('input[type=radio][name=btnradio-type]').on('change', function () {
  var ul, numberLength;
  switch ($(this).val()) {
    // case 'btnradio-type0':
    //   //alert("Mọi loại da");
    //   $("#containerItem li").show();
    //   const ul0 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");

    //   document.getElementById('numberResult').innerHTML = ul0.length + " kết quả";
    //   break;

    case 'btnradio-type0':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Sữa rửa mặt") {
          flagType[i] = 1;
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type1':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Nước tẩy trang") {
          flagType[i] = 1;
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type2':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Dầu tẩy trang") {
          flagType[i] = 1;
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type3':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Nước hoa hồng") {
          flagType[i] = 1
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type4':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Sữa dưỡng") {
          flagType[i] = 1;
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type5':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Essence") {
          flagType[i] = 1
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type6':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Ampoule") {
          flagType[i] = 1
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type7':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Kem chống nắng") {
          flagType[i] = 1
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type8':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Xịt chống nắng") {
          flagType[i] = 1
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;
    case 'btnradio-type9':
      $("#containerItem li").hide();
      ul = document.querySelectorAll("#containerItem li .linkSearch .typeSearch");
      numberLength = 0;
      for (let i = 0; i <= ul.length - 1; i++) {
        if (ul[i].textContent == "Xịt khoáng") {
          flagType[i] = 1
          if (flagSkin[i] == 1 && flagLabel[i] == 1) {
            $(`#containerItem li:nth-child(${i + 1})`).show();
            numberLength++;
          }
        } else {
          flagType[i] = 0 //hide
        }
      } console.log(flagType);
      console.log(flagSkin);
      document.getElementById('numberResult').innerHTML = numberLength + " kết quả";
      break;

  }
});


function searchFunction() {
  var input, filter, i, txtValue, table;
  input = document.getElementById("searchbar");
  filter = input.value.toUpperCase();

  ul = document.querySelectorAll("#containerItem li .linkSearch .labelSearch");
  $("#containerItem li").hide();
  numberLength = 0;

  for (let i = 0; i <= ul.length - 1; i++) {
    txtValue = ul[i].textContent || ul[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      flagLabel[i] = 1;
      if (flagType[i] == 1 && flagSkin[i] == 1) {
        $(`#containerItem li:nth-child(${i + 1})`).show();
        numberLength++;
      }
    }
    else {
      flagLabel[i] = 0;
    }
  }
  document.getElementById('numberResult').innerHTML = numberLength + " kết quả";

}

