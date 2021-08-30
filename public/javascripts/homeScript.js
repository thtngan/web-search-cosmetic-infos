function scrollFunction(list, preBtn) {
  // console.log(list.scrollTop);
  if (list.scrollTop > 10) {
    // console.log("true")
    document.getElementById(preBtn).style.display = "block";
  } else {
    document.getElementById(preBtn).style.display = "none";
  }
}
var listmenu = document.getElementById('list');
listmenu.onscroll = function () { scrollFunction(listmenu, "preBtn") };

document.getElementById('preBtn').addEventListener("click", function () {
  listmenu.scrollTop -= 100;
});
document.getElementById('nextBtn').addEventListener("click", function () {
  listmenu.scrollTop += 100;
});

var list_distributeur = document.getElementById('list_distributeur');
list_distributeur.onscroll = function () { scrollFunction(list_distributeur, 'preBtn_distributeur') };
document.getElementById('preBtn_distributeur').addEventListener("click", function () {
  list_distributeur.scrollTop -= 100;
});
document.getElementById('nextBtn_distributeur').addEventListener("click", function () {
  list_distributeur.scrollTop += 100;
});

$.event.special.widthChanged = {
  remove: function () {
    $(this).children('iframe.width-changed').remove();
  },
  add: function () {
    var elm = $(this);
    var iframe = elm.children('iframe.width-changed');
    if (!iframe.length) {
      iframe = $('<iframe/>').addClass('width-changed').prependTo(this);
    }
    var oldWidth = elm.width();
    function elmResized() {
      var width = elm.width();
      if (oldWidth != width) {
        elm.trigger('widthChanged', [width, oldWidth]);
        oldWidth = width;
      }
    }

    var timer = 0;
    var ielm = iframe[0];
    (ielm.contentWindow || ielm).onresize = function () {
      clearTimeout(timer);
      timer = setTimeout(elmResized, 20);
    };
  }
}

$('.horizontal-scroll-wrapper').css({ "maxHeight": $('#myDiv').width() });
$('.horizontal-scroll-wrapper-1').css({ "maxHeight": $('#myDiv').width() });
$('#myDiv').on('widthChanged', function () {
  // console.log($(this).width());
  $('.horizontal-scroll-wrapper').css({ "maxHeight": $(this).width() });
  // console.log($('.horizontal-scroll-wrapper').height());
});
$('#myDiv').on('widthChanged', function () {
  // console.log($(this).width());
  $('.horizontal-scroll-wrapper-1').css({ "maxHeight": $(this).width() });
  // console.log($('.horizontal-scroll-wrapper').height());
});

//enter input
// $('#searchbar').keypress(function (event) {
//   var keycode = (event.keyCode ? event.keyCode : event.which);
//   if (keycode == '13') {
//     alert('You pressed a "enter" key in textbox');

//   }
// });

//Search script
$('#searchbar').autocomplete({
  // autoFocus: true,
  source: function (req, res) {
    $.ajax({
      url: "autocompleteIndex",
      dataType: "json",
      type: "GET",
      data: req,
      success: function (data) {
        // console.log(data);

        res(data);
        // res($.map(data, function(item) {
        //   return {
        //     value: item.Name,
        //     avatar: item.picture
        //   };
        // }))
      },
      err: function (err) {
        console.log(err.status);
      }
    });
  },
  // The minimum number of characters a user must type before a search is performed.
  minLength: 1,
  focus: function (event, ui) {
    this.value = ui.item.label,
      event.preventDefault();
  },
  select: function (event, ui) {
    //window.location.href = 'Search.aspx?q=' + ui.item.value;;
    window.location.href = 'info/' + ui.item.value;
  }

}).data("ui-autocomplete")._renderItem = function (ul, item) {
  var inner_html = '<div class="list_item_container"><div class="imageSearch"><img src=\"data:image/"' + item.pictureType + ";base64," + "xxxx" + ' alt="product images"></div><div class="labelSearch"><h4><b>' + item.label + '</b></h4></div></div>';
  console.log(inner_html);
  if (item.pictureType == null) {
    var inner_html = '<h4><b>' + item.label + '</b></h4>';
  }
  else {
    var inner_html = '<div class="list_item_container"><div class="imageSearch"><img src="data:image/"' + item.pictureType + ";base64," + item.pictureData + '" alt="product images"></div><div class="labelSearch"><h4><b>' + item.label + '</b></h4></div></div>';
  }
  return $("<li></li>")
    .data("item.autocomplete", item)
    .append(inner_html)
    .appendTo(ul);
};

