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
      console.log($(this).width());
      $('.horizontal-scroll-wrapper').css({ "maxHeight": $(this).width() });
      console.log($('.horizontal-scroll-wrapper').height());
    });

    // function openNav() {
    //   document.getElementById("mySidebar").style.width = "252px";
    //   document.getElementById("main").style.marginLeft = "240px";
    //   $('.sidebar a span').css({ "display": "inline-block" });
    //   $('.sidebar h2').css({ "display": "block" });
    //   $('.media').css({'display':'block'});
    // }

    // function closeNav() {
    //   document.getElementById("mySidebar").style.width = "92px";
    //   document.getElementById("main").style.marginLeft = "80px";
    //   $('.sidebar a span').css({ "display": "none" });
    //   $('.media').css({'display':'none'});
    //   $('.sidebar h2').css({ "display": "none" });
    // }
    document.getElementById('action').onclick = function (e) {
      if (this.checked) {
        document.getElementById("mySidebar").style.width = "252px";
        $('#main, footer').css({ "marginLeft": "240px" });
        $('.sidebar a span').css({ "display": "inline-block" });
        $('.sidebar h2').css({ "display": "block" });
        $('.media').css({ 'display': 'block' });
      }
      else {
        document.getElementById("mySidebar").style.width = "92px";
        $('#main, footer').css({ "marginLeft": "80px" });
        $('.sidebar a span').css({ "display": "none" });
        $('.media').css({ 'display': 'none' });
        $('.sidebar h2').css({ "display": "none" });
      }
    };