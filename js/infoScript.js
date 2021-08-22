var one = Number($('#one').text());
var two = Number($('#two').text());
var three = Number($('#three').text());
var four = Number($('#four').text());
var five = Number($('#five').text());
var total = one + two + three + four + five;
var avg = one / total + 2 * two / total + 3 * three / total + 4 * four / total + 5 * five / total;
$(document).ready(function () {
  $('#total').html(total);
  $('.rating-num').html(avg.toFixed(1));
  $('.bar span').hide();
  $('#bar-five').animate({
    width: five / total * 100 + '%'
  }, 1000);
  $('#bar-four').animate({
    width: four / total * 100 + '%'
  }, 1000);
  $('#bar-three').animate({
    width: three / total * 100 + '%'
  }, 1000);
  $('#bar-two').animate({
    width: two / total * 100 + '%'
  }, 1000);
  $('#bar-one').animate({
    width: (one / total * 100) + '%'
  }, 1000);

  setTimeout(function () {
    $('.bar span').fadeIn('slow');
  }, 1000);

});
for(var i = 0; i < Math.round(avg); i++){
  console.log(i);
  $('#star-' + (i+1)).addClass('active');
}
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
$(".nav .nav-link").on("click", function () {
  $(".nav").find(".active").removeClass("active");
  $(this).addClass("active");
});

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x < 0 || y < 0 || x > img.width - lens.offsetWidth || y > img.height - lens.offsetHeight) {
      result.style.visibility = 'hidden';
      result.style.opacity = '0';
      lens.style.visibility = 'hidden';
    }
    else {
      result.style.visibility = 'visible';
      result.style.opacity = '1';
      lens.style.visibility = 'visible';
    }
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}


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
$('.img-zoom-result').css({ "width": $('#imgProduct').width(), 'height': $('#imgProduct').height(), });
$('.img-zoom-result').css({ 'left': $('#imgProduct').width() + '10px' });
$('#imgProduct').on('widthChanged', function () {
  // console.log($(window).width())
  if ($(window).width() <= 768){
    $('.img-zoom-result').css({ "width": '0', "height": '0'});
  }
   
  else {
    $('.img-zoom-result').css({ "width": $(this).width(), "height": $(this).width() });
    $('.img-zoom-result').css({ 'left': $(this).width() + '10px' });
  }
});
imageZoom("myimage", "myresult");