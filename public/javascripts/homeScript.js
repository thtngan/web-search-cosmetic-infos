var listmenu = document.getElementById('list');
listmenu.onscroll = function () { scrollFunction() };
function scrollFunction() {
  console.log(listmenu.scrollTop);
  if (listmenu.scrollTop > 10) {
    document.getElementById('preBtn').style.display = "block";
  } else {
    document.getElementById('preBtn').style.display = "none";
  }
}
document.getElementById('preBtn').addEventListener("click", function () {
  listmenu.scrollTop -= 100;
});
document.getElementById('nextBtn').addEventListener("click", function () {
  listmenu.scrollTop += 100;
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
$('#myDiv').on('widthChanged', function () {
  // console.log($(this).width());
  $('.horizontal-scroll-wrapper').css({ "maxHeight": $(this).width() });
  // console.log($('.horizontal-scroll-wrapper').height());
});

