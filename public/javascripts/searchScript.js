

//Auto fill input search
var parameter = location.search.split("=");
var text = parameter[1];
console.log(text);
if (text !== undefined) {
  $("#searchbar").val(text);
  // $('#searchbar').autocomplete("search");
}

//Search script
$('#searchbar').autocomplete({
  source: function (req, res) {
    $.ajax({
      url: "/search/autocompleteSearch",
      dataType: "json",
      type: "GET",
      data: req,
      success: function (data) {
        console.log(data);

        res(data);
        if (data[0].label == "Không tìm thấy sản phẩm")
          document.getElementById('numberResult').innerHTML = 0 + " kết quả";
        else
          document.getElementById('numberResult').innerHTML = data.length + " kết quả";

      },
      err: function (err) {
        console.log(err.status);
      }
    });
  },
  minLength: 0

}).data("ui-autocomplete")._renderItem = function (ul, item) {
  if (item.pictureType == null) {
    var inner_html = '<h4><b>' + item.label + '</b></h4>';

  }
  else {
    var buffer = item.pictureData.toString('base64')

    var inner_html = '<div class="list_item_container"><a class="linkSearch" href="/info/'
      + item.label + '"><div class="imageSearch"><img src="data:image/png;base64,'
      + buffer + '" alt="product images"></div><div class="skinSearch">'
      + item.skin + '</div><div class="labelSearch"><h4><b>'
      + item.label + '</b></h4></div></a></div>';
  }
  return $("<li></li>")
    .data("item.autocomplete", item)
    .append(inner_html)
    .appendTo(ul);
};

$('#ui-id-1').bind('DOMSubtreeModified', function () {
  $('#containerItem').html($('#ui-id-1').html());
});


//Filter script
$('input[type=radio][name=btnradio]').on('change', function () {
  switch ($(this).val()) {
    case 'btnradio0':
      //alert("Mọi loại da");
      $("#containerItem li").show();
      const ul0 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");

      document.getElementById('numberResult').innerHTML = ul0.length + " kết quả";
      break;
    case 'btnradio1':
      //alert("Da dầu");
      $("#containerItem li").hide();
      const ul1 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength1 = 0;
      for (let i = 0; i <= ul1.length - 1; i++) {
        //console.log(ul[i].textContent);
        if (ul1[i].textContent == "Da dầu") {
          $(`#containerItem li:nth-child(${i + 1})`).show();
          numberLength1++;
          // console.log(`#containerItem li:nth-child(${i})`);
        }
      }
      // console.log(numberLength);
      document.getElementById('numberResult').innerHTML = numberLength1 + " kết quả";
      break;
    case 'btnradio2':
      //alert("Da khô");
      $("#containerItem li").hide();
      const ul2 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength2 = 0;
      for (let i = 0; i <= ul2.length - 1; i++) {
        if (ul2[i].textContent == "Da khô") {
          $(`#containerItem li:nth-child(${i + 1})`).show();
          numberLength2++;
        }
      }
      document.getElementById('numberResult').innerHTML = numberLength2 + " kết quả";
      break;
    case 'btnradio3':
      //alert("Da mụn");
      $("#containerItem li").hide();
      const ul3 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength3 = 0;
      for (let i = 0; i <= ul3.length - 1; i++) {
        if (ul3[i].textContent == "Da mụn") {
          $(`#containerItem li:nth-child(${i + 1})`).show();
          numberLength3++
        }
      }
      document.getElementById('numberResult').innerHTML = numberLength3 + " kết quả";
      break;
    case 'btnradio4':
      //alert("Da nhạy cảm");
      $("#containerItem li").hide();
      const ul4 = document.querySelectorAll("#containerItem li .linkSearch .skinSearch");
      var numberLength4 = 0;
      for (let i = 0; i <= ul4.length - 1; i++) {
        if (ul4[i].textContent == "Da nhạy cảm") {
          $(`#containerItem li:nth-child(${i + 1})`).show();
          numberLength4++;
        }
      }
      document.getElementById('numberResult').innerHTML = numberLength4 + " kết quả";
      break;
  }
});

