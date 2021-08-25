$('#myDiv').on('widthChanged', function () {
  // console.log($(this).width());
  $('.horizontal-scroll-wrapper').css({ "maxHeight": $(this).width() });
  // console.log($('.horizontal-scroll-wrapper').height());
});



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

}).data("ui-autocomplete")._renderItem = function (ul, item) {
  if (item.picture == null) {
    var inner_html = '<h4><b>' + item.label + '</b></h4>';

  }
  else {
    var inner_html = '<div class="list_item_container"><a href="/info/' + item.label + '"><div class="imageSearch"><img src="' + item.picture + '" ></div><div class="labelSearch"><h4><b>' + item.label + '</b></h4></div></a></div>';
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

