 function openNav() {
      document.getElementById("mySidebar").style.width = "100%";
      $('.sidebar a span').css({ "display": "inline-block" });
      $('.sidebar h2').css({ "display": "block" });
      $('#action').prop('checked', true);
      $('.sticky-top').css({"display": "none"});
    }

    // function closeNav() {
    //   document.getElementById("mySidebar").style.width = "92px";
    //   document.getElementById("main").style.marginLeft = "80px";
    //   $('.sidebar a span').css({ "display": "none" });
    //   $('.media').css({'display':'none'});
    //   $('.sidebar h2').css({ "display": "none" });
    // }
    // $(document).ready(function(){
      
    // });
    document.getElementById('action').onclick = function (e) {
      var windowWidth = $(window).width();
    if (this.checked) {
      document.getElementById("mySidebar").style.width = "252px";
      $('#main, footer').css({ "marginLeft": "240px" });
      $('.sidebar a span').css({ "display": "inline-block" });
      $('.sidebar h2').css({ "display": "block" });

    }
    else {
      $('.sidebar a span').css({ "display": "none" });
      $('.sidebar h2').css({ "display": "none" });
      if(windowWidth <= 600){
        document.getElementById("mySidebar").style.width = "0";
        $('#main, footer').css({ "marginLeft": "0" });
        $('.sticky-top').css({"display": "block"});
      }
      else{
      document.getElementById("mySidebar").style.width = "92px";
      $('#main, footer').css({ "marginLeft": "80px" });
      }
    }
  };

    $(window).resize(function(){
      var windowWidth = $(window).width();
      var imgSrc = $('#image');
      if($('#action').is(':checked')){
        if(windowWidth > 600){
          document.getElementById("mySidebar").style.width = "252px";
          $('#main, footer').css({ "marginLeft": "240px" });
         
        }else{
          $('.sticky-top').css({"display": "none"});
          document.getElementById("mySidebar").style.width = "100%";          
        }
      }
      else{
        if(windowWidth <= 600){
          document.getElementById("mySidebar").style.width = "0";
          $('#main, footer').css({ "marginLeft": "0" });
        }
        else{
          document.getElementById("mySidebar").style.width = "92px";
          $('#main, footer').css({ "marginLeft": "80px" });
        }
      }
      });

      $("#subcribeForm").submit(function(e) {
        e.preventDefault();
        var fdata = {
          email: $("#mail").val()
        };
        console.log(fdata);
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "/subscribe",
          data: JSON.stringify(fdata),
          success: function (result) {
            alert(result.msg),
            $('#mail').val('');
          },
          error: function (e) {
            console.log(e.status);
          }
        });
    });